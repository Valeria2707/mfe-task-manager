import { createClient } from "@supabase/supabase-js";
// @ts-expect-error
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// @ts-expect-error
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing Supabase environment variables. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);
