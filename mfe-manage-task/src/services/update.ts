import { Task } from "../types/Task";
import { parseValueToBoolean } from "../utils/parser";
import { supabase } from "../utils/supabase";

export async function updateTask(formData: FormData) {
  const taskId = formData.get("id")?.toString();

  if (!taskId) {
    console.warn("You don't have an ID");
    return;
  }

  const fieldsToUpdate: Partial<Task> = {};

  for (const [key, value] of formData.entries()) {
    if (key === "completed") {
      fieldsToUpdate.completed = parseValueToBoolean(String(value)) as boolean;
    } else if (key === "due_date") {
      fieldsToUpdate.due_date = new Date(String(value)).toISOString();
    } else if (key !== "id") {
      (fieldsToUpdate as Record<string, string>)[key] = String(value);
    }
  }

  if (Object.keys(fieldsToUpdate).length === 0) {
    console.warn("No fields to update");
    return;
  }

  const { error } = await supabase
    .from("tasks")
    .update(fieldsToUpdate)
    .eq("id", taskId);

  if (error) {
    console.error("Failed to update the task:", error.message);
    throw new Error(error.message);
  }
}
