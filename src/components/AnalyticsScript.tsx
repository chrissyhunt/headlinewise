import Script from 'next/script'

export const AnalyticsScript = () => {
  if (process.env.DISABLE_ANALYTICS === 'true') return null
  return (
    <Script
      defer
      src="https://us.umami.is/script.js"
      data-website-id="685e82f6-d10a-4546-a40c-b7801031bf77"
    />
  )
}
