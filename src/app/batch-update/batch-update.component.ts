import { Component, OnInit } from '@angular/core';
import {CourseServiceService} from '../services/course-service.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {of} from 'rxjs';

@Component({
  selector: 'app-batch-update',
  templateUrl: './batch-update.component.html',
  styleUrls: ['./batch-update.component.css']
})
export class BatchUpdateComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  batchUpdate(): void {
    const firebaseCourseOneRef = this.db.doc('/courses/85GQOUKU7AbCAyERuSSV').ref;
    const firebaseCourseTwoRef = this.db.doc('/courses/irgt1srJ1YJTBQtMh9Xc').ref;
    //Start batch update
    const batch = this.db.firestore.batch();
    batch.update(firebaseCourseOneRef, {titles: {description: 'Angular PWA - Progressive Web Apps Course | Updated 2020'}});
    batch.update(firebaseCourseTwoRef, {titles: {description: 'Angular for Beginners | Updated 2020'}});
    const batchObservable = of(batch.commit());
    batchObservable.subscribe();
  }
}
