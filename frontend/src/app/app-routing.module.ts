import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { ProjectDashboardComponent } from './projects/project-dashboard/project-dashboard.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'projects', component: ProjectListComponent },
  { path: 'dashboard', component: ProjectDashboardComponent },
  { path: 'detail/:id', component: ProjectDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
