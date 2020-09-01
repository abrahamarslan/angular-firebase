import { Component } from '@angular/core';
import {COURSES, findLessonsForCourse} from '../../db-data';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-firebase';
  config = {
    apiKey: "AIzaSyBRszr4VWi7Z8nmRU0kTM-Z-AHqaSOqTg4",
    authDomain: "fb-course-6dc7d.firebaseapp.com",
    databaseURL: "https://fb-course-6dc7d.firebaseio.com",
    projectId: "fb-course-6dc7d",
    storageBucket: "fb-course-6dc7d.appspot.com",
    messagingSenderId: "333066672997",
    appId: "1:333066672997:web:473e0544878111c8771f8c",
    measurementId: "G-QJ815DQ2CP"
};
app:any;
db:any;

constructor() {
this.app = firebase.initializeApp(this.config);
this.db = firebase.firestore();
this.main();
}

async uploadData() {
  const courses = await this.db.collection('courses');
  for (let course of Object.values(COURSES)) {
    const newCourse = this.removeId(course);
    const courseRef = await courses.add(newCourse);
    const lessons = await courseRef.collection('lessons');
    const courseLessons = findLessonsForCourse(course['id']);
    console.log(`Uploading course ${course['titles']["description"]}`);
    for (const lesson of courseLessons) {
      const newLesson = this.removeId(lesson);
      await lessons.add(newLesson);
    }
  }
}

 removeId(data: any) {
  const newData: any = {...data};
  delete newData.id;
  return newData;
}

async main(){
  try {
    console.log('Start main...\n\n');
    await this.uploadData();
    await this.app.delete();
    console.log('\n\nClosing Application...');
  }catch (e) {
    console.log('Data upload failed, reason:', e, '\n\n');
  }
}

}
