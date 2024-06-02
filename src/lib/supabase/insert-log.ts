import { createServiceClient } from '@/lib/supabase/server'
import { RequestLog } from '../shared.types'

export const insertLog = async (details: RequestLog) => {
  const supabase = createServiceClient()
  const { data, error } = await supabase
    .from('logs')
    .insert({ details: JSON.stringify(details) })
  if (error) throw new Error('Error saving log', { cause: error })
  return data
}
