import { supabase } from "../utils/supabase";

export async function getTaskById(taskId: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select()
    .eq("id", taskId)
    .single();

  if (error) {
    console.error("Error fetching task:", error.message);
    throw new Error("Failed to fetch the task.");
  }

  return data;
}
