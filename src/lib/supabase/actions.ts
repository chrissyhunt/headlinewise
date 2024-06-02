'use server'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateAnalysisApproval(
  data: {
    id: string
    approved: boolean
  },
  pathToRevalidate: string
) {
  const supabase = createClient()

  const { data: analysis, error } = await supabase
    .from('analysis')
    .update({ approved: data.approved })
    .eq('id', data.id)

  if (error) {
    throw new Error('Error updating approval status', { cause: error })
  } else {
    revalidatePath(pathToRevalidate)
  }
  return analysis
}
