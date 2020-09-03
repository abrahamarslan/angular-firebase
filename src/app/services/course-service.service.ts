import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, map, first } from 'rxjs/operators';
import { Course } from 'src/model/course';
import {from, Observable} from 'rxjs';
import {convertSnaps} from './db-utils';
import {Lesson} from '../../model/lesson';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {

  constructor(private db: AngularFirestore) { }

  getCourses(): Observable<Course[]> {
    return this.db.collection('courses'
                            //, ref =>
                            //ref.orderBy('seqNo')
                            //ref.where("seqNo",">",2)
                            //ref.orderBy("seqNo").startAt(0).endAt(5) //Pagination logic
                            //ref.where('categories', "array-contains", "BEGINNER")
                            //ref.where("seqNo","==", 5).where("lessonsCount", ">=", 5) //Create index
                            )
                      .snapshotChanges()
                      .pipe(map(snaps => convertSnaps(snaps)), first()); //First will get Observable connection only once.
  }

  getCourseByURL(courseURL: string): Observable<Course> {
    return this.db.collection('courses', ref => ref.where("url","==", courseURL))
      .snapshotChanges()
      .pipe(map(snaps => {
          const courses = convertSnaps(snaps);
          return courses.length === 1 ? courses[0] : undefined;
      }), first());
  }

  findLessons(courseID: string, sortOrder: OrderByDirection = 'asc', pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
    return this.db.collection(`courses/${courseID}/lessons`,
      ref => ref.orderBy('seqNo', sortOrder).limit(pageSize).startAfter(pageNumber * pageSize))
      .snapshotChanges()
      .pipe(
        map(snaps => convertSnaps(snaps)),
        first()
      );
  }

  saveCourse(id: string, updates: Partial<Course>): Observable<any> {
    return from(this.db.doc(`courses/${id}`).update(updates));
  }
}
