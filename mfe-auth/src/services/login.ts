import { supabase } from "../utils/supabase";

export async function login(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
