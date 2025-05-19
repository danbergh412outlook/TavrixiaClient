import { inject, Injectable } from '@angular/core';
import { UserSurveyDto } from '../dtos/user-survey-dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateUserSurveyDto } from '../dtos/create-user-survey-dto';

@Injectable({
  providedIn: 'root'
})
export class UserSurveyApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  loadUserSurvey(
    surveyUrlName: string,
    errorNotFound: boolean,
    currentUser: boolean,
    userUrlName?: string
  ): Observable<UserSurveyDto | null> {

    const params: any = {
      errorNotFound: errorNotFound.toString(),
      currentUser: currentUser.toString()
    };

    // Only include userSurveyUrlName if not using current user mode
    if (!currentUser && userUrlName) {
      params.userUrlName = userUrlName;
    }

    return this.http.get<UserSurveyDto | null>(
      `${this.baseUrl}/usersurveys/${surveyUrlName}`,
      {
        params
      }
    );
  }
  addUserSurvey(userSurvey: CreateUserSurveyDto): Observable<UserSurveyDto> {
    return this.http.post<UserSurveyDto>(`${this.baseUrl}/usersurveys`, userSurvey);
  }
}
