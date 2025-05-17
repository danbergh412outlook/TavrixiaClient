import { UpdateSurveyQuestionDto } from "./update-survey-question-dto";

export interface UpdateSurveyDto {
    name: string;
    urlName?: string;
    id?: number;
    surveyQuestions: UpdateSurveyQuestionDto[]
}
