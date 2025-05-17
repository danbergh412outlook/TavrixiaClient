import { SurveyQuestionDto } from "./survey-question-dto";

export interface SurveyDto {
    id: number;
    creatorEmail: string;
    creatorName: string;
    name: string;
    urlName: string;
    dateCreated: Date;
    surveyQuestions?: SurveyQuestionDto[]
}
