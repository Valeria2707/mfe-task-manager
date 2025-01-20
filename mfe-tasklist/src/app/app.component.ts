import { Component } from '@angular/core';
import { TaskPageComponent } from './pages/task-page/task-page.component';
import { RouterModule } from '@angular/router';
import { SupabaseService as GetService } from './services/get-tasks.service';
import { SupabaseService as UpdateService } from './services/update-task.service';
import { SupabaseService as DeleteService } from './services/delete-task.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule, TaskPageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [GetService, UpdateService, DeleteService],
})
export class AppComponent {
  title = 'my-angular-app';
}
