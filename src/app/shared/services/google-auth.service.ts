import { Router } from '@angular/router';
import { Injectable, NgZone, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private ngZone = inject(NgZone);
  private router = inject(Router);

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
    const token = this.getToken();
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
    const token = this.getToken();
    if (!token) return '';
  
    try {
      const decoded: any = jwtDecode(token);
      return decoded.name || decoded.given_name || decoded.preferred_username || '';
    } catch (e) {
      console.error('Failed to decode token:', e);
      return '';
    }
  }
  logout(): void {
    // 1. Clear the saved token
    localStorage.removeItem('google_id_token');

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
    let token: string = this.getToken();
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
  getToken(): string {
    return localStorage.getItem('google_id_token') || "";
  }

  handleCredentialResponse(response: any): void {
    console.log('Google Sign-In Response:', response);
    const token = response.credential;
    const decodedToken: any = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);
    localStorage.setItem('google_id_token', token);

    // After saving token, redirect user
    this.ngZone.run(() => {
      const redirectUrl = localStorage.getItem('redirectAfterLogin') || '/';
      localStorage.removeItem('redirectAfterLogin'); // Clean up
      window.location.href = redirectUrl; // or use router if inside Angular
    });
  }
}
