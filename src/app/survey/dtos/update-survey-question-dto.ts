import { UpdateSurveyResponseDto } from "./update-survey-response-dto";

export interface UpdateSurveyQuestionDto {
    text: string;
    id?: number;
    surveyId?: number;
    surveyResponses: UpdateSurveyResponseDto[]
}
