import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SurveyDto } from '../dtos/survey-dto';
import { Observable } from 'rxjs';
import { UpdateSurveyDto } from '../dtos/update-survey-dto';
import { GoogleTokenService } from '../../shared/services/google-token.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  constructor(private googleTokenService: GoogleTokenService) {
    
  }
  loadSurveys(): Observable<SurveyDto[]> {
    let token = this.googleTokenService.getToken();
    return this.http.get<SurveyDto[]>(`${this.baseUrl}/surveys`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  loadSurvey(urlName: string): Observable<SurveyDto> {
    let token = this.googleTokenService.getToken();
    return this.http.get<SurveyDto>(`${this.baseUrl}/surveys/${urlName}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  addSurvey(survey: UpdateSurveyDto): Observable<SurveyDto> {
    let token = this.googleTokenService.getToken();
    return this.http.post<SurveyDto>(`${this.baseUrl}/surveys`, survey, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  updateSurvey(survey: UpdateSurveyDto, oldSurvey: SurveyDto): Observable<SurveyDto> {
    let token = this.googleTokenService.getToken();
    return this.http.put<SurveyDto>(`${this.baseUrl}/surveys/${oldSurvey.urlName}`, survey, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  deleteSurvey(urlName: string): Observable<void> {
    const token = this.googleTokenService.getToken();
    return this.http.delete<void>(`${this.baseUrl}/surveys/${urlName}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
