import { SurveyQuestionCreateForm } from "./survey-question-create-form";

export interface SurveyCreateForm {
  name: string;
  id?: number;
  surveyQuestions: SurveyQuestionCreateForm[]
}