import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';
import {CourseServiceService} from '../app/services/course-service.service';


@Injectable({ providedIn: 'root' })
export class CourseResolver implements Resolve<Course> {
  constructor(private db: CourseServiceService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    const courseURL = route.paramMap.get('url');
    return this.db.getCourseByURL(courseURL);
    //return of(undefined);
    // this.service.getHero(route.paramMap.get('id'));
  }
}
