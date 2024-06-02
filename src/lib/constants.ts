import { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: {
    template: '%s | HeadlineWise',
    default: 'HeadlineWise',
  },
  description: 'A headline analysis tool built by Chrissy Hunt',
  applicationName: 'HeadlineWise',
  authors: {
    url: 'https://chrissyhunt.com',
    name: 'Chrissy Hunt',
  },
  keywords: ['media literacy', 'news', 'headlines', 'ai analysis', 'claude ai'],
  robots: {
    index: true,
    follow: false,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://www.headlinewise.com',
    title: 'HeadlineWise',
    description: 'A headline analysis tool built by Chrissy Hunt',
    siteName: 'HeadlineWise',
    images: {
      url: 'https://www.headlinewise.com/images/headlinewise-screenshot.png',
      alt: 'Screenshot of headlinewise.com',
      width: 1280,
      height: 800,
    },
  },
}
