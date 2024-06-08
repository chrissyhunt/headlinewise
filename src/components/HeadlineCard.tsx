import { isUserAdmin } from '@/lib/supabase/is-user-admin'

interface HeadlineCardProps {
  title: string
  date: string
  needsReview: boolean
}

export default async function HeadlineCard({
  title,
  date,
  needsReview,
}: HeadlineCardProps) {
  const isAdmin = await isUserAdmin()
  return (
    <div
      className="h-full border-b-4 border-b-transparent p-8 pb-16 text-left text-2xl hover:border-b-4 hover:border-b-fuchsia-400 hover:bg-fuchsia-50 hover:shadow-sm"
      data-test="headline-card"
    >
      <span className="font-serif" data-test="headline-card-title">
        {title}
      </span>
      <div className="align-center mt-3 flex font-sans text-sm">
        {new Date(date).toDateString()}
        {isAdmin && needsReview && (
          <span className="ml-2">
            🤖{' '}
            <span className="sr-only" data-test="review-status">
              Needs Review
            </span>
          </span>
        )}
      </div>
    </div>
  )
}
