import { Component, Input } from '@angular/core';
import { Task } from '../../types/task';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/delete-task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TaskDetailsComponent {
  @Input() task!: Task;
  isOpen = false;

  constructor(private supabaseService: SupabaseService) {}

  async deleteTask(): Promise<void> {
    try {
      await this.supabaseService.deleteTask(this.task.id);
      const event = new CustomEvent('taskDeleted', {
        detail: this.task.id,
      });
      window.dispatchEvent(event);
    } catch (error) {
      console.error(`Error deleting task ID: ${this.task.id}`, error);
    }
  }

  toggleDialog(): void {
    this.isOpen = !this.isOpen;
  }

  navigateToEdit(): void {
    const path = `/edit/${this.task.id}`;
    const event = new CustomEvent('angularNavigate', {
      detail: path,
    });
    window.dispatchEvent(event);
  }
}
