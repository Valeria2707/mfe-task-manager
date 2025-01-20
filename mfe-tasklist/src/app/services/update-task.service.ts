import { Injectable } from '@angular/core';
import { Task } from '../types/task';
import { supabase } from '../../supabase';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  async updateTask(formData: FormData): Promise<void> {
    const taskId = formData.get('id')?.toString();

    if (!taskId) {
      console.warn("You don't have an ID");
      return;
    }

    const fieldsToUpdate: Partial<Task> = {};

    for (const [key, value] of formData.entries()) {
      if (key === 'completed') {
        fieldsToUpdate.completed = value === 'true';
      } else if (key === 'due_date') {
        fieldsToUpdate.due_date = new Date(String(value)).toISOString();
      } else if (key !== 'id') {
        (fieldsToUpdate as Record<string, string>)[key] = String(value);
      }
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      console.warn('No fields to update');
      return;
    }

    const { error } = await supabase
      .from('tasks')
      .update(fieldsToUpdate)
      .eq('id', taskId);

    if (error) {
      console.error('Failed to update the task:', error.message);
      throw new Error(error.message);
    }
  }
}
