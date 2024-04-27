import chunk from 'lodash.chunk';
import { createServiceClient } from "@/utils/supabase/server";

// limit set by News Api
const MAX_SOURCES_PER_REQUEST = 20;

export const makeSourceBatches = async () => {
  const supabase = await createServiceClient();
  const results = await supabase.from('sources').select().eq('active', 'true');
  const sources = results.data?.map(s => s.id);
  return chunk(sources, MAX_SOURCES_PER_REQUEST);
}