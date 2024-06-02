export interface AnalysisResult {
  language: string
  political_bias: string
  analysis: string
  model: string
}

export interface NewsAPIItem {
  title: string
  description: string
  author: string
  url: string
  urlToImage: string
  content: string
  publishedAt: string
  source: { id: string; name: string }
}

export interface RequestLog {
  type: 'success' | 'error'
  from: string
  message: string
}
