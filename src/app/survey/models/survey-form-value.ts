import { SurveyQuestionFormValue } from "./survey-question-form-value";

export interface SurveyFormValue {
  name: string;
  id?: number;
  surveyQuestions: SurveyQuestionFormValue[]
}