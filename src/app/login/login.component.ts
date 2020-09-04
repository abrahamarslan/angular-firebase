import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import {AngularFireAuth} from '@angular/fire/auth';
import {environment} from '../../environments/environment';
import {FirebaseApp} from '@angular/fire';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  ui: firebaseui.auth.AuthUI;
  constructor(private angularFireAuthService: AngularFireAuth, private router: Router, private zone: NgZone) {

  }

  ngOnInit(): void {
    const uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks: {
          signInSuccessWithAuthResult: this.signInSuccessWithAuthResult.bind(this)
      }
    };

    //firebase.initializeApp(environment.firebase); //Seems like an error in Angular
    this.ui = new firebaseui.auth.AuthUI(firebase.auth());
    this.ui.start('#firebaseui-auth-container', uiConfig);
  }

  signInSuccessWithAuthResult(result) {
    console.log('Firebase UI Result: ', result);
    this.zone.run(() => this.router.navigateByUrl('/courses'));
  }

  ngOnDestroy() {
    //This is important or next time same user tries to login, they'll get an error.
    this.ui.delete();
  }

}
