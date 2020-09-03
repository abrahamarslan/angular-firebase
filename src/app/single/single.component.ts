import { Component, OnInit } from '@angular/core';
import {Course} from '../../model/course';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  course: Course;
  displayedColumns = ['seqNo', 'description', 'duration'];
  dataSource:any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.course = this.route.snapshot.data['course'];
  }
  // tslint:disable-next-line:typedef
  loadMore() {

  }

}
