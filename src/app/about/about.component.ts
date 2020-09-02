import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Course} from '../../model/course';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    //this.singleDocument('2VcjiMOjg4D1Eti0tAf9');
    this.getSnapshot();
  }

  singleDocument(documentID) {
    this.db.collection('courses').doc(documentID).get()
    .subscribe(doc => {
      console.log(doc.data());
    });
  }

  valueChanges() {
    this.db.collection('courses').valueChanges()
    .subscribe(val => console.log(val));
  }

  getSnapshot() {
    this.db.collection('courses').snapshotChanges()
      .subscribe(snaps => {
        const courses: Course[] =  snaps.map(snap => {
          return <Course> {
            id: snap.payload.doc.id,
            ...snap.payload.doc.data() as {}
          }
        });
        console.log('Courses');
        console.log(courses);
      })
  }

}
