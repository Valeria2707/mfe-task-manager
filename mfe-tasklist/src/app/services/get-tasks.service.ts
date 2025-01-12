import { Injectable } from '@angular/core';
import { SearchParams } from '../types/params';
import { Task } from '../types/task';
import { supabase } from '../../supabase';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  async getTasks(searchParams: SearchParams): Promise<Task[]> {
    let query = supabase
      .from('tasks')
      .select()
      .order('completed', { ascending: true })
      .order(searchParams.sortBy || 'priority', { ascending: true });

    if (searchParams.priority) {
      query = query.eq('priority', searchParams.priority);
    }

    if (searchParams.due_date) {
      query = query.eq('due_date', searchParams.due_date);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching tasks:', error);
      throw new Error(error.message);
    }

    return data as Task[];
  }
}
