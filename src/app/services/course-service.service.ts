import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, map, first } from 'rxjs/operators';
import { Course } from 'src/model/course';
import { Observable } from 'rxjs';

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
                      .pipe(map(snaps => {
                        return snaps.map(snap => {
                          return <Course> {
                            id: snap.payload.doc.id,
                            ...snap.payload.doc.data() as {}                    
                          }
                        })
                      }), first()); //First will get Observable connection only once.
  }
}
