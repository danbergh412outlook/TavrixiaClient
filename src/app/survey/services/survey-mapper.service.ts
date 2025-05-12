import { Injectable } from '@angular/core';
import { SurveyFormValue } from '../models/survey-form-value';
import { GoogleAuthService } from '../../shared/services/google-auth.service';
import { SurveyResponseFormValue } from '../models/survey-response-form-value';
import { SurveyQuestionFormValue } from '../models/survey-question-form-value';
import { UpdateSurveyDto } from '../dtos/update-survey-dto';
import { UpdateSurveyResponseDto } from '../dtos/update-survey-response-dto';
import { UpdateSurveyQuestionDto } from '../dtos/update-survey-question-dto';
import { SurveyDetailsDto } from '../dtos/survey-details-dto';

@Injectable({ providedIn: 'root' })
export class SurveyMapperService {
  constructor(private auth: GoogleAuthService) {}

  mapUpdateSurveyDto(form: SurveyFormValue, oldSurvey: SurveyDetailsDto): UpdateSurveyDto {
    return {
      name: form.name,
      id: form.id,
      creator: oldSurvey?.creator ?? this.auth.getEmail(),
      surveyQuestions: form.surveyQuestions.map(q => this.mapUpdateSurveyQuestion(q))
    };
  }
  mapUpdateSurveyResponse(response: SurveyResponseFormValue): UpdateSurveyResponseDto {
    return { 
      text: response.text,
      id: response.id,
      surveyId: response.surveyId,
      surveyQuestionId: response.surveyQuestionId
    };
  }

  mapUpdateSurveyQuestion(question: SurveyQuestionFormValue): UpdateSurveyQuestionDto {
    return {
      text: question.text,
      id: question.id,
      surveyId: question.surveyId,
      surveyResponses: question.surveyResponses.map(r => this.mapUpdateSurveyResponse(r))
    };
  }
}