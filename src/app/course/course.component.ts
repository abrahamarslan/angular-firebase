import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/model/course';
import { AngularFirestore } from '@angular/fire/firestore';
import { filter, map } from 'rxjs/operators';
import {CourseServiceService} from '../services/course-service.service'

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: Observable<Course[]>;
  beginner: Observable<Course[]>;
  advanced: Observable<Course[]>;
  constructor(private courseService: CourseServiceService) { 
  }

  ngOnInit(): void {
      this.courses = this.courseService.getCourses();
      console.log(this.courses);
      this.beginner = this.courses.pipe(map(courses => courses.filter(course => course.categories.includes("BEGINNER"))));
      this.advanced = this.courses.pipe(map(courses => {
        return courses.filter(course => course.categories.includes("ADVANCED"));
      })) 
      //.subscribe(snaps => {        
        // const courses: Course[] = snaps.map(snap => {
        //   return <Course> {
        //     id: snap.payload.doc.id,
        //     ...snap.payload.doc.data() as {}
        //   }
        // })
      //});
  }
}
