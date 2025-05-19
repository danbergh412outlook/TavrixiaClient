import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SurveyDto } from '../dtos/survey-dto';
import { Observable } from 'rxjs';
import { UpdateSurveyDto } from '../dtos/update-survey-dto';

@Injectable({
  providedIn: 'root'
})
export class SurveyApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  constructor() {
    
  }
  loadSurveys(): Observable<SurveyDto[]> {
    return this.http.get<SurveyDto[]>(`${this.baseUrl}/surveys`);
  }
  loadSurvey(urlName: string): Observable<SurveyDto> {
    return this.http.get<SurveyDto>(`${this.baseUrl}/surveys/${urlName}`);
  }
  addSurvey(survey: UpdateSurveyDto): Observable<SurveyDto> {
    return this.http.post<SurveyDto>(`${this.baseUrl}/surveys`, survey);
  }
  updateSurvey(survey: UpdateSurveyDto, oldSurvey: SurveyDto): Observable<SurveyDto> {
    return this.http.put<SurveyDto>(`${this.baseUrl}/surveys/${oldSurvey.urlName}`, survey);
  }
  deleteSurvey(urlName: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/surveys/${urlName}`);
  }
}
