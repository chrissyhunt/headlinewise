import chunk from 'lodash.chunk';

const sources = [
  'wired',
  'vice-news',
  'usa-today',
  'time',
  'the-washington-times',
  'the-washington-post',
  'the-wall-street-journal',
  'the-verge',
  'the-lad-bible',
  'the-huffington-post',
  'the-hill',
  'the-american-conservative',
  'techradar',
  'techcrunch',
  'reuters',
  'reddit-r-all',
  'politico',
  'new-york-magazine',
  'newsweek',
  'nbc-news',
  'national-review',
  'msnbc',
  'independent',
  'google-news',
  'fox-news',
  'financial-post',
  'cnn',
  'cbs-news',
  'buzzfeed',
  'business-insider',
  'breitbart-news',
  'bloomberg',
  'bbc-news',
  'axios',
  'associated press',
  'al-jazeera-english',
  'abc-news'
];

// limit set by News Api
const MAX_SOURCES_PER_REQUEST = 20;

export const makeSourceBatches = () => chunk(sources, MAX_SOURCES_PER_REQUEST);