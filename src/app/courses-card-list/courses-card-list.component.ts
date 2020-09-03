import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Course } from 'src/model/course';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

  @Output()
  courseEdited = new EventEmitter();
  @Input()
  courses: Course[];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editCourse(course: Course): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = course;
    this.dialog.open(CourseDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(value => {
        if(value) {
          this.courseEdited.emit();
        }
      });
  }

}
