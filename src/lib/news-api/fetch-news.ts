import { NewsAPIItem } from '../shared.types'

const getDaysAgoISOString = (daysAgo: number) => {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - daysAgo)
  return yesterday.toISOString()
}

export const limitSamplePerSource = (
  results: NewsAPIItem[],
  limitPerSource: number
) => {
  const sources = new Map()
  const sample = []

  for (const item of results) {
    // filter out 'removed' results with null source ids returned by API
    if (!item.source.id) {
      continue
    }

    const currentCount = sources.get(item.source.id) ?? 0
    if (currentCount < limitPerSource) {
      sample.push(item)
      sources.set(item.source.id, currentCount + 1)
    }
  }

  return sample
}

export async function fetchNews(query: string, sources: string[]) {
  const twoDaysAgo = getDaysAgoISOString(2)
  const yesterday = getDaysAgoISOString(1)
  const newsApiUrl = new URL('https://newsapi.org/v2/everything')
  newsApiUrl.searchParams.set('pageSize', '20') // max 100, limited by API
  newsApiUrl.searchParams.set('language', 'en')
  newsApiUrl.searchParams.set('sortBy', 'relevancy')
  newsApiUrl.searchParams.set('from', twoDaysAgo)
  newsApiUrl.searchParams.set('to', yesterday)
  newsApiUrl.searchParams.set('q', query!)
  newsApiUrl.searchParams.set('sources', sources.join(','))

  const res = await fetch(newsApiUrl, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEWS_API_KEY!}`,
    },
    cache: 'no-store',
  })

  const data = await res.json()
  return data
}
