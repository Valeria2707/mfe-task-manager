import { PRIORITY } from "../constants/Task";
import { supabase } from "../utils/supabase";

export async function addTask(formData: FormData) {
  const taskData = {
    title: formData.get("title")?.toString() || "",
    description: formData.get("description")?.toString() || "",
    due_date: formData.get("due_date")
      ? new Date(formData.get("due_date")!.toString()).toISOString()
      : null,
    priority: formData.get("priority")?.toString() || PRIORITY.P4,
    completed:
      formData.get("completed") === "true" ||
      formData.get("completed") === "on",
  };

  const { error } = await supabase.from("tasks").insert([taskData]);

  if (error) {
    throw new Error(error.message);
  }

  return taskData;
}
