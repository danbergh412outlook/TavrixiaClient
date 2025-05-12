import { Component, OnInit } from '@angular/core';
import {GoogleAuthService} from "../../services/google-auth.service";


@Component({
  selector: 'app-google-sign-in-fedcm',
  template: '<div id="google-signin-button"></div>',
})
export class GoogleSignInFedcmComponent implements OnInit {
  constructor(private googleAuthService: GoogleAuthService) {}

  ngOnInit(): void {
    this.googleAuthService.initialize();
    this.googleAuthService.googleButton('google-signin-button');

  }
}