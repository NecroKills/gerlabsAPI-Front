import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { DashboardComponent } from "./domain/dashboard/dashboard.component";
import { SignInFormComponent } from "./domain/sign-in-form/sign-in-form.component"
import { SignUpFormComponent } from "./domain/sign-up-form/sign-up-form.component"
import { TasksComponent } from "./domain/tasks/tasks.component";
import { CoursesComponent } from "./domain/courses/courses.component";
import { CourseDetailComponent } from "./domain/courses/course-detail/course-detail.component";
import { MemoriesComponent } from "./domain/memories/memories.component";
import { MemoryDetailComponent } from "./domain/memories/memory-detail/memory-detail.component";
import { HardwaresComponent } from "./domain/hardwares/hardwares.component";
import { ProcessorsComponent } from "./domain/processors/processors.component";
import { ProcessorDetailComponent } from "./domain/processors/processor-detail/processor-detail.component";
import { VideoCardsComponent } from "./domain/video_cards/video_cards.component";
import { VideoCardDetailComponent } from "./domain/video_cards/video_card-detail/video_card-detail.component";
import { DisciplinesComponent } from "./domain/disciplines/disciplines.component";
import { DisciplineDetailComponent } from "./domain/disciplines/discipline-detail/discipline-detail.component";
import { LaboratoriesComponent } from "./domain/laboratories/laboratories.component";
import { TaskDetailComponent } from "./domain/tasks/task-detail/task-detail.component";
import { LaboratoryDetailComponent } from "./domain/laboratories/laboratory-detail/laboratory-detail.component";

import { AuthGuard } from "./guards/auth.guard";
import { NotAuthenticatedGuard } from "./guards/not-authenticated.guard";

const ROUTES = RouterModule.forRoot([
  { path: 'sign-in', component: SignInFormComponent, canActivate: [NotAuthenticatedGuard] },
  { path: 'sign-up', component: SignUpFormComponent, canActivate: [NotAuthenticatedGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id', component: CourseDetailComponent, canActivate: [AuthGuard] },
  { path: 'memories', component: MemoriesComponent, canActivate: [AuthGuard] },
  { path: 'memories/:id', component: MemoryDetailComponent, canActivate: [AuthGuard] },
  { path: 'hardwares', component: HardwaresComponent, canActivate: [AuthGuard] },
  { path: 'processors', component: ProcessorsComponent, canActivate: [AuthGuard] },
  { path: 'processors/:id', component: ProcessorDetailComponent, canActivate: [AuthGuard] },
  { path: 'video_cards', component: VideoCardsComponent, canActivate: [AuthGuard] },
  { path: 'video_cards/:id', component: VideoCardDetailComponent, canActivate: [AuthGuard] },
  { path: 'disciplines', component: DisciplinesComponent, canActivate: [AuthGuard] },
  { path: 'disciplines/:id', component: DisciplineDetailComponent, canActivate: [AuthGuard] },
  { path: 'laboratories', component: LaboratoriesComponent, canActivate: [AuthGuard] },
  { path: 'laboratories/:id', component: LaboratoryDetailComponent, canActivate: [AuthGuard] },
  { path: 'laboratories/new', component: LaboratoryDetailComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
])


@NgModule({
  imports: [ROUTES],
  exports: [RouterModule]
})

export class AppRoutingModule {

}