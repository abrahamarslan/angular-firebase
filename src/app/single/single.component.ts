import { Component, OnInit } from '@angular/core';
import {Course} from '../../model/course';
import {ActivatedRoute} from '@angular/router';
import {Lesson} from '../../model/lesson';
import {CourseServiceService} from '../services/course-service.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  course: Course;
  displayedColumns = ['seqNo', 'description', 'duration'];
  dataSource: any;
  loading = false;
  lastPageLoaded = 0;
  lessons: Lesson[];
  constructor(private route: ActivatedRoute, private db: CourseServiceService) { }

  ngOnInit(): void {
    this.loading = true;
    this.course = this.route.snapshot.data['course'];
    this.db.findLessons(this.course.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe(lessons => this.lessons = lessons);
  }
  // tslint:disable-next-line:typedef
  loadMore() {
    this.loading = true;
    this.lastPageLoaded++;
    this.db.findLessons(this.course.id, 'asc', this.lastPageLoaded)
      .pipe(finalize(() => this.loading = false))
      .subscribe(lessons => this.lessons = this.lessons.concat(lessons));
  }

}
