// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// components imports
import { AppComponent } from './app.component';
import { DashboardComponent } from "./domain/dashboard/dashboard.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { SignInFormComponent } from "./domain/sign-in-form/sign-in-form.component";
import { SignUpFormComponent } from "./domain/sign-up-form/sign-up-form.component";
import { TaskSearchComponent } from "./layout/navbar/task-search/task-search.component";
import { TasksComponent } from "./domain/tasks/tasks.component";
import { CoursesComponent } from "./domain/courses/courses.component";
import { MemoriesComponent } from "./domain/memories/memories.component";
import { HardwaresComponent } from "./domain/hardwares/hardwares.component";
import { ProcessorsComponent } from "./domain/processors/processors.component";
import { VideoCardsComponent } from "./domain/video_cards/video_cards.component";
import { DisciplinesComponent } from "./domain/disciplines/disciplines.component";
import { LaboratoriesComponent } from "./domain/laboratories/laboratories.component";
import { TaskDetailComponent } from "./domain/tasks/task-detail/task-detail.component";
import { CourseDetailComponent } from './domain/courses/course-detail/course-detail.component';
import { MemoryDetailComponent } from './domain/memories/memory-detail/memory-detail.component';
import { ProcessorDetailComponent } from "./domain/processors/processor-detail/processor-detail.component";
import { VideoCardDetailComponent } from './domain/video_cards/video_card-detail/video_card-detail.component';
import { DisciplineDetailComponent } from './domain/disciplines/discipline-detail/discipline-detail.component';
import { LaboratoryDetailComponent } from "./domain/laboratories/laboratory-detail/laboratory-detail.component";

// services imports
import { AuthService } from "./shared/auth.service";
import { TaskService } from "./domain/tasks/shared/task.service";
import { CourseService } from "./domain/courses/shared/course.service";
import { MemoryService } from "./domain/memories/shared/memory.service";
import { HardwareService } from "./domain/hardwares/shared/hardware.service";
import { ProcessorService } from "./domain/processors/shared/processor.service";
import { VideoCardService } from "./domain/video_cards/shared/video_card.service";
import { DisciplineService } from "./domain/disciplines/shared/discipline.service";
import { LaboratoryService } from "./domain/laboratories/shared/laboratory.service";
import { TokenService } from "./shared/token.service";

// guards imports
import { AuthGuard } from "./guards/auth.guard";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";

// modules imports
import { AppRoutingModule } from "./app-routing.module";

// jquery plugins
import * as $ from 'jquery';
import * as datetimepicker from 'eonasdan-bootstrap-datetimepicker';
window['datetimepicker'] = window['datetimepicker'] = datetimepicker;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    SignInFormComponent,
    SignUpFormComponent,
    TaskSearchComponent,
    TasksComponent,
    CoursesComponent,
    CourseDetailComponent,
    MemoriesComponent,
    MemoryDetailComponent,
    HardwaresComponent,
    TaskDetailComponent,
    ProcessorDetailComponent,
    VideoCardDetailComponent,
    ProcessorsComponent,
    VideoCardsComponent,
    DisciplinesComponent,
    DisciplineDetailComponent,
    LaboratoriesComponent,
    LaboratoryDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    NotAuthenticatedGuard,
    TaskService,
    CourseService,
    MemoryService,
    HardwareService,
    ProcessorService,
    VideoCardService,
    DisciplineService,
    LaboratoryService,
    TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
