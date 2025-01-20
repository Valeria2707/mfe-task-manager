import { supabase } from "../utils/supabase";

export default async function getUserSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}
