import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Course} from '../../model/course';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  //A transaction function which updates the lessons counter in a course
  async runTransaction() {
    const newCounter = await this.db.firestore
      .runTransaction(
        async transaction => {
          console.log('Now running the transaction');
          const courseRef = this.db.doc('/courses/irgt1srJ1YJTBQtMh9Xc').ref;
          const snap = await transaction.get(courseRef);
          const course = <Course> snap.data();
          const lessonsCount = course.lessonsCount + 1;
          transaction.update(courseRef, {lessonsCount});
          return lessonsCount;
        }
      );
  }
}
