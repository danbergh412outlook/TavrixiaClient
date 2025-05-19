import { Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode
import { AppUserApiService } from './app-user-api.service';
import { GoogleTokenService } from './google-token.service';
import { LoadingService } from './loading.service';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private router = inject(Router);
  private appUsersService = inject(AppUserApiService);
  private googleTokenService: GoogleTokenService = inject(GoogleTokenService);
  initialize(): void {
    google.accounts.id.initialize({
      client_id: '557879449612-ovo7s6nlvrqaackqu2l4jm64nkurhg0m.apps.googleusercontent.com', // Replace with your Client ID
      callback: (response: any) => this.handleCredentialResponse(response),
      //use_fedcm_for_prompt: true, // Explicitly enable FedCM for One Tap
      scope: 'openid profile email', // Ensure 'openid' is included
      ux_mode: 'popup'
    });
  }
  getEmail(): string {
    const token = this.googleTokenService.getToken();
    if (!token) return '';
  
    try {
      const decoded: any = jwtDecode(token);
      return decoded.email || '';
    } catch (e) {
      console.error('Failed to decode token:', e);
      return '';
    }
  }
  getName(): string {
    const token = this.googleTokenService.getToken();
    if (!token) return '';

    try {
      const decoded: any = jwtDecode(token);
      return decoded.name || decoded.unique_name || ''; // fallback to unique_name if needed
    } catch (e) {
      console.error('Failed to decode token:', e);
      return '';
    }
  }
  logout(): void {
    // 1. Clear the saved token
    this.googleTokenService.removeToken();

    // 2. Optional: revoke the token at Google (recommended for full logout)
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      google.accounts.id.disableAutoSelect();
    }

    // 3. Redirect to login page
    this.router.navigate(['/login']);
  }
  googleButton(id: string): void {
    google.accounts.id.renderButton(
      document.getElementById(id),
      {
        theme: 'outline',
        size: 'large',
        use_fedcm_for_button: true, // Explicitly enable FedCM for the button flow
      }
    );
  }
  isTokenExpired(): boolean {
    let token: string = this.googleTokenService.getToken();
    if (token == ""){
      return true;
    }
    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp; // UNIX timestamp (in seconds)
      const now = Math.floor(Date.now() / 1000); // current time in seconds
  
      return exp < now;
    } catch (e) {
      console.error('Failed to decode token:', e);
      return true; // treat as expired if invalid
    }
  }

  handleCredentialResponse(response: any): void {
    console.log('Google Sign-In Response:', response);
    const token = response.credential;
    const decodedToken: any = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);
    this.googleTokenService.setToken(token);

    this.appUsersService.ensureUserExists()
    .subscribe(() => {
        const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
        localStorage.removeItem('redirectAfterLogin'); // Clean up
        window.location.href = redirectUrl; // or use router if inside Angular
      });
  }
}
