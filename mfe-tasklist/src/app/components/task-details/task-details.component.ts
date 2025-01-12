import { Component, Input } from '@angular/core';
import { Task } from '../../types/task';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/delete-task.service';
import { Router } from '@angular/router';

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

  constructor(
    private supabaseService: SupabaseService,
    private router: Router
  ) {}

  async deleteTask(): Promise<void> {
    try {
      await this.supabaseService.deleteTask(this.task.id);
    } catch (error) {
      console.error(`Error deleting task ID: ${this.task.id}`, error);
    }
  }

  toggleDialog(): void {
    this.isOpen = !this.isOpen;
  }

  navigateToEdit(): void {
    this.router.navigate([`/edit/${this.task.id}`]);
  }
}
