import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'courses', component: CourseComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
