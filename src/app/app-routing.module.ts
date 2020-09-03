import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import {SingleComponent} from './single/single.component';
import {CourseResolver} from '../resolvers/course.resolve';

const routes: Routes = [
  { path: '**', redirectTo: '/about' },
  { path: 'about', component: AboutComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'course/:url', component: SingleComponent, resolve: { course: CourseResolver } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
