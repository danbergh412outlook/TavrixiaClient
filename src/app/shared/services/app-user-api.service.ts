import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppUserApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  ensureUserExists(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/appusers`, null);
  }
  
}
