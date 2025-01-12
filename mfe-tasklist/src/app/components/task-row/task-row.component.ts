import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../types/task';
import { PRIORITY } from '../../constants/task';
import { SupabaseService } from '../../services/update-task.service';

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class TaskRowComponent {
  @Input() task!: Task;
  @Output() toggleDetails = new EventEmitter<void>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.form = this.fb.group({
      completed: [false],
    });
  }

  ngOnInit(): void {
    this.form.patchValue({
      completed: this.task.completed ?? false,
    });
  }

  async onCheckboxChange(): Promise<void> {
    const isCompleted = this.form.get('completed')?.value;

    const formData = new FormData();
    formData.append('id', this.task.id);
    formData.append('completed', isCompleted.toString());

    try {
      await this.supabaseService.updateTask(formData);
    } catch (error) {
      console.error(`Error updating Task ID: ${this.task.id}`, error);
    }
  }

  onToggleDetails(): void {
    this.toggleDetails.emit();
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case PRIORITY.P1:
        return 'priority-high';
      case PRIORITY.P2:
        return 'priority-medium';
      default:
        return 'priority-low';
    }
  }
}
