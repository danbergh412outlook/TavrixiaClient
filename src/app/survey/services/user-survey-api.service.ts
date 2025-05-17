import { inject, Injectable } from '@angular/core';
import { UserSurveyDto } from '../dtos/user-survey-dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GoogleTokenService } from '../../shared/services/google-token.service';
import { HttpClient } from '@angular/common/http';
import { CreateUserSurveyDto } from '../dtos/create-user-survey-dto';

@Injectable({
  providedIn: 'root'
})
export class UserSurveyApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  constructor(private googleTokenService: GoogleTokenService) {
      
  }
  loadUserSurvey(
    surveyUrlName: string,
    errorNotFound: boolean,
    currentUser: boolean,
    userUrlName?: string
  ): Observable<UserSurveyDto | null> {
    const token = this.googleTokenService.getToken();

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
        headers: {
          Authorization: `Bearer ${token}`
        },
        params
      }
    );
  }
  addUserSurvey(userSurvey: CreateUserSurveyDto): Observable<UserSurveyDto> {
    let token = this.googleTokenService.getToken();
    return this.http.post<UserSurveyDto>(`${this.baseUrl}/usersurveys`, userSurvey, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
