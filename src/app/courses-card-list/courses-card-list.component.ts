import { Component, OnInit, Input } from '@angular/core';
import { Course } from 'src/model/course';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {
  
  @Input()
  courses: Course[];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editCourse() {
    console.log('Edit course');
  }

}
