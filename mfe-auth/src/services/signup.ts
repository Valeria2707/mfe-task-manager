import { supabase } from "../utils/supabase";

export async function signUp(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
