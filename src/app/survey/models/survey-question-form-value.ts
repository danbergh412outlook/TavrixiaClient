import { SurveyResponseFormValue } from "./survey-response-form-value";

export interface SurveyQuestionFormValue {
    text: string;
    id?: number;
    surveyId?: number;
    surveyResponses: SurveyResponseFormValue[]
}