// survey-mapper.ts
import { UpdateSurveyDto } from '../dtos/update-survey-dto';
import { UpdateSurveyResponseDto } from '../dtos/update-survey-response-dto';
import { UpdateSurveyQuestionDto } from '../dtos/update-survey-question-dto';
import { SurveyCreateForm } from '../models/survey-create-form';
import { SurveyDto } from '../dtos/survey-dto';
import { SurveyResponseCreateForm } from '../models/survey-response-create-form';
import { SurveyQuestionCreateForm } from '../models/survey-question-create-form';
import { SurveyResponseForm } from '../models/survey-response-form';
import { CreateUserSurveyDto } from '../dtos/create-user-survey-dto';

export function mapUpdateSurveyDto(form: SurveyCreateForm, oldSurvey: SurveyDto): UpdateSurveyDto {
  return {
    name: form.name,
    id: form.id,
    urlName: oldSurvey?.urlName,
    surveyQuestions: form.surveyQuestions.map(q => mapUpdateSurveyQuestion(q))
  };
}

export function mapCreateUserSurveyDto(form: SurveyResponseForm, survey: SurveyDto): CreateUserSurveyDto {
  let createUserSurveyDto: CreateUserSurveyDto = {
    surveyUrlName: survey.urlName,
    userResponses: []
  };

  for (const strQuestionId in form) {
    if (form.hasOwnProperty(strQuestionId)) {
      const questionId = Number(strQuestionId);
      const responseId = form[questionId]!;
      createUserSurveyDto.userResponses.push({
        surveyQuestionId: questionId,
        surveyResponseId: responseId
      });
    }
  }

  return createUserSurveyDto;
}

export function mapUpdateSurveyResponse(response: SurveyResponseCreateForm): UpdateSurveyResponseDto {
  return { 
    text: response.text,
    id: response.id,
    surveyId: response.surveyId,
    surveyQuestionId: response.surveyQuestionId
  };
}

export function mapUpdateSurveyQuestion(question: SurveyQuestionCreateForm): UpdateSurveyQuestionDto {
  return {
    text: question.text,
    id: question.id,
    surveyId: question.surveyId,
    surveyResponses: question.surveyResponses.map(r => mapUpdateSurveyResponse(r))
  };
}