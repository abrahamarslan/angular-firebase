import {Component, OnInit} from '@angular/core';
import {COURSES, findLessonsForCourse} from '../../db-data';
import * as firebase from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-firebase';
  isLoggedInObservable: boolean;
  pictureURL: string;
  constructor(private angularFireAuthService: AngularFireAuth) {

  }

  async ngOnInit() {
    this.angularFireAuthService.authState.subscribe(user => {
      console.log(user);
    });
    //this.isLoggedInObservable = this.angularFireAuthService.authState.pipe(map(user => !!user));
    //console.log('isLoggedIn: ', this.isLoggedInObservable);
    const user = await this.isLoggedIn();
    this.isLoggedInObservable = !!user;
    //this.pictureURL = this.angularFireAuthService.authState.pipe(map(user => user ? user.photoURL : null));
    this.pictureURL = user.photoURL;
    console.log(this.isLoggedInObservable);
  }

  isLoggedIn() {
    return this.angularFireAuthService.authState.pipe(first()).toPromise();
  }
  logout(): void {
    this.angularFireAuthService.signOut();
  }
}
