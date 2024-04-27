const getDaysAgoISOString = (daysAgo: number) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - daysAgo);
  return yesterday.toISOString();
};

export async function fetchNews(query: string, sources: string[]) {
  const twoDaysAgo = getDaysAgoISOString(2);
  const yesterday = getDaysAgoISOString(1);
  const newsApiUrl = new URL("https://newsapi.org/v2/everything");
  newsApiUrl.searchParams.set("pageSize", "100");
  newsApiUrl.searchParams.set("language", "en");
  newsApiUrl.searchParams.set("sortBy", "relevancy");
  newsApiUrl.searchParams.set("from", twoDaysAgo);
  newsApiUrl.searchParams.set("to", yesterday);
  newsApiUrl.searchParams.set("q", query!);
  newsApiUrl.searchParams.set("sources", sources.join(","));

  const res = await fetch(newsApiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEWS_API_KEY!}`,
    },
  });

  const data = await res.json();
  return data;
}
