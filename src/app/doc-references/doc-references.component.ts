import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-doc-references',
  templateUrl: './doc-references.component.html',
  styleUrls: ['./doc-references.component.css']
})
export class DocReferencesComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  //Get a references document from key refCourse column (like a foreign key)
  getReferences() {
    const courseReference = this.db.doc('/courses/irgt1srJ1YJTBQtMh9Xc')
      .snapshotChanges()
      .subscribe(snap => {
        const course: any = snap.payload.data();
        console.log('course.courseRef', course.refCourse);        // The referenced doc path is /courses/85GQOUKU7AbCAyERuSSV
      });

    //Just to confirm we got the right data we can get the referenced document individiually and log it to see that it's the exact document
    //we have received.
    const ref = this.db.doc('/courses/85GQOUKU7AbCAyERuSSV')
      .snapshotChanges()
      .subscribe(
        doc => console.log('Document: ', doc.payload.data())
      );
  }
}
