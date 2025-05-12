import { UpdateSurveyQuestionDto } from "./update-survey-question-dto";

export interface UpdateSurveyDto {
    name: string;
    id?: number;
    creator?: string;
    surveyQuestions: UpdateSurveyQuestionDto[]
}
