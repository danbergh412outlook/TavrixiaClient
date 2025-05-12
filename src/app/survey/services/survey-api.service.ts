import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GoogleAuthService } from '../../shared/services/google-auth.service';
import { SurveyDto } from '../dtos/survey-dto';
import { Observable } from 'rxjs';
import { SurveyDetailsDto } from '../dtos/survey-details-dto';
import { UpdateSurveyDto } from '../dtos/update-survey-dto';

@Injectable({
  providedIn: 'root'
})
export class SurveyApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  constructor(private googleAuthService: GoogleAuthService) {
    
  }
  loadSurveys(): Observable<SurveyDto[]> {
    let token = this.googleAuthService.getToken();
    return this.http.get<SurveyDto[]>(this.baseUrl + '/surveys', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  loadSurvey(urlName: string): Observable<SurveyDetailsDto> {
    let token = this.googleAuthService.getToken();
    return this.http.get<SurveyDetailsDto>(this.baseUrl + '/surveys/' + urlName, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  addSurvey(survey: UpdateSurveyDto): Observable<SurveyDto> {
    let token = this.googleAuthService.getToken();
    return this.http.post<SurveyDto>(this.baseUrl + '/surveys', survey, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  updateSurvey(survey: UpdateSurveyDto, oldSurvey: SurveyDetailsDto): Observable<SurveyDto> {
    let token = this.googleAuthService.getToken();
    return this.http.put<SurveyDto>(this.baseUrl + '/surveys/' + oldSurvey.urlName, survey, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
