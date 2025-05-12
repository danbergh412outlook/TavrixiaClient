import { Component } from '@angular/core';
import { GoogleSignInFedcmComponent } from '../../components/google-sign-in-fedcm-component/google-sign-in-fedcm-component.component';


@Component({
  selector: 'app-login',
  imports: [GoogleSignInFedcmComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
