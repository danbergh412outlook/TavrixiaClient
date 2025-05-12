import { SurveyResponseDto } from "./survey-response-dto";

export interface SurveyQuestionDto {
    text: string,
    id: number,
    surveyId: number;
    surveyResponses: SurveyResponseDto[]
}