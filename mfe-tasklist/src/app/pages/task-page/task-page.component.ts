import { Component } from '@angular/core';
import { TaskFilterComponent } from '../../components/task-filter/task-filter.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';

@Component({
  standalone: true,
  selector: 'app-task-page',
  imports: [TaskFilterComponent, TaskListComponent],
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss'],
})
export class TaskPageComponent {
  navigateToCreateTask(): void {
    const event = new CustomEvent('angularNavigate', {
      detail: '/create',
    });
    window.dispatchEvent(event);
  }
}
