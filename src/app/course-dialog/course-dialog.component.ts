import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from '../../model/course';
import {CourseServiceService} from '../services/course-service.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {concatMap, last} from 'rxjs/operators';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  form: FormGroup;
  description: string;
  course: Course;
  uploadPercentage: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<CourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) course: Course,
              private db: CourseServiceService,
              private storage: AngularFireStorage
  ) {
    this.course = course;
    const titles = course.titles;
    this.form = fb.group({
      description: [titles.description, Validators.required],
      longDescription: [titles.longDescription, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    const updates = this.form.value;
    this.db.saveCourse(this.course.id, {titles: updates})
      .subscribe(
        () => this.dialogRef.close(this.form.value)
      );
  }

  uploadFile(event): void {
    const file: File = event.target.files[0];
    const filePath = `courses/${this.course.id}/${file.name}`;
    const task = this.storage.upload(filePath, file);
    //task.snapshotChanges().subscribe();
    this.uploadPercentage = task.percentageChanges();
    this.downloadURL = task.snapshotChanges()
      .pipe(last(), concatMap(() => this.storage.ref(filePath).getDownloadURL()));
    //Save the URL in the database
    const saveURL = this.downloadURL.pipe(concatMap(url => this.db.saveCourse(this.course.id, {uploadedImageUrl: url})));
    saveURL.subscribe(downloadURL => console.log(downloadURL));
  }
}
