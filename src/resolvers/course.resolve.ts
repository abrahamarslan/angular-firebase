import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Course} from '../model/course';
import {Observable, of} from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CourseResolver implements Resolve<Course> {
  constructor() {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return of(undefined);
    // this.service.getHero(route.paramMap.get('id'));
  }
}
