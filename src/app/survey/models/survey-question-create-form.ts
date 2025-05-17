import { SurveyResponseCreateForm } from "./survey-response-create-form";

export interface SurveyQuestionCreateForm {
    text: string;
    id?: number;
    surveyId?: number;
    surveyResponses: SurveyResponseCreateForm[]
}