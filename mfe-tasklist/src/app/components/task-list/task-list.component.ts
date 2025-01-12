import { Component, OnInit } from '@angular/core';
import { Task } from '../../types/task';
import { SearchParams } from '../../types/params';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskRowComponent } from '../task-row/task-row.component';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { SupabaseService } from '../../services/get-tasks.service';
import 'zone.js';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [CommonModule, TaskRowComponent, TaskDetailsComponent],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  searchParams: SearchParams = {};

  taskStates: { [taskId: string]: boolean } = {};

  constructor(
    private supabaseService: SupabaseService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchParams = params as SearchParams;
      this.fetchTasks();
    });
  }

  toggleDetails(task: Task): void {
    const taskId = task.id;
    this.taskStates[taskId] = !this.taskStates[taskId];
  }
  isDetailsOpen(task: Task): boolean {
    return this.taskStates[task.id] || false;
  }

  async fetchTasks(): Promise<void> {
    try {
      this.tasks = await this.supabaseService.getTasks(this.searchParams);
      console.log('Fetched Tasks:', this.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }
}
