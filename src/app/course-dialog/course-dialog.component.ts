import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Course} from '../../model/course';
import {CourseServiceService} from '../services/course-service.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  form: FormGroup;
  description: string;
  course: Course;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<CourseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) course: Course,
              private db: CourseServiceService
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
}
