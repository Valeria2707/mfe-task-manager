import { Injectable } from '@angular/core';
import { supabase } from '../../supabase';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  async deleteTask(taskId: string): Promise<void> {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);

    if (error) {
      console.error('Error deleting task:', error.message);
      throw new Error(error.message);
    }
  }
}
