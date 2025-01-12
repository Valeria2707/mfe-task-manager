import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskPageComponent } from './pages/task-page/task-page.component';

export const routes: Routes = [
  { path: 'task-page', component: TaskPageComponent },
  { path: '**', redirectTo: '/task-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
