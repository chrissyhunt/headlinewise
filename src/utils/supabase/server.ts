import { createClient } from '@supabase/supabase-js';

// only for server-side use to retrieve content
// TODO: replace with recommended Supabase client code
// once auth is introduced - see https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
export function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
}