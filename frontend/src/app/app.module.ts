import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectDashboardComponent } from './projects/project-dashboard/project-dashboard.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { ProjectService } from './projects/project-service/project.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ProjectDashboardComponent,
    ProjectListComponent,
    ProjectDashboardComponent,
    ProjectDetailComponent
  ],
  providers: [
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
