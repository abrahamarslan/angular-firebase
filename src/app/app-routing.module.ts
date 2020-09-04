import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CourseComponent } from './course/course.component';
import {SingleComponent} from './single/single.component';
import {CourseResolver} from '../resolvers/course.resolve';
import {BatchUpdateComponent} from './batch-update/batch-update.component';
import {TransactionComponent} from './transaction/transaction.component';
import {DocReferencesComponent} from './doc-references/doc-references.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'courses', component: CourseComponent },
  { path: 'login', component: LoginComponent },
  { path: 'batch-update', component: BatchUpdateComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'doc-reference', component: DocReferencesComponent },
  { path: 'course/:url', component: SingleComponent, resolve: { course: CourseResolver } },
  { path: '**', redirectTo: '/about' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
