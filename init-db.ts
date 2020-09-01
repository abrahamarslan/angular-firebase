
import {COURSES, findLessonsForCourse} from './db-data';
import { environment } from './src/environments/environment';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyBRszr4VWi7Z8nmRU0kTM-Z-AHqaSOqTg4",
    authDomain: "fb-course-6dc7d.firebaseapp.com",
    databaseURL: "https://fb-course-6dc7d.firebaseio.com",
    projectId: "fb-course-6dc7d",
    storageBucket: "fb-course-6dc7d.appspot.com",
    messagingSenderId: "333066672997",
    appId: "1:333066672997:web:473e0544878111c8771f8c",
    measurementId: "G-QJ815DQ2CP"
};

console.log("Uploading data to the database with the following config:\n");

console.log(JSON.stringify(config));

console.log("\n\n\n\nMake sure that this is your own database, so that you have write access to it.\n\n\n");

const app = firebase.initializeApp(config);
const db = firebase.firestore();

main().then(r => console.log('Done.'));

async function uploadData() {
  const courses = await db.collection('courses');
  for (let course of Object.values(COURSES)) {
    const newCourse = removeId(course);
    const courseRef = await courses.add(newCourse);
    const lessons = await courseRef.collection('lessons');
    const courseLessons = findLessonsForCourse(course['id']);
    console.log(`Uploading course ${course['titles']["description"]}`);
    for (const lesson of courseLessons) {
      const newLesson = removeId(lesson);
      await lessons.add(newLesson);
    }
  }
}

function removeId(data: any) {
  const newData: any = {...data};
  delete newData.id;
  return newData;
}

async function main(){
  try {
    console.log('Start main...\n\n');
    await uploadData();
    console.log('\n\nClosing Application...');
    await app.delete();
  }catch (e) {
    console.log('Data upload failed, reason:', e, '\n\n');
  }
}
