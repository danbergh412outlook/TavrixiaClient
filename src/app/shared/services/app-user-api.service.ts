import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GoogleAuthService } from './google-auth.service';
import { Observable } from 'rxjs';
import { GoogleTokenService } from './google-token.service';

@Injectable({
  providedIn: 'root'
})
export class AppUserApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  constructor(private googleTokenService: GoogleTokenService) {
    
  }
  ensureUserExists(): Observable<void> {
    let token = this.googleTokenService.getToken();
    return this.http.post<void>(`${this.baseUrl}/appusers`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
}
