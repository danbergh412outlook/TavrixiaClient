import { SurveyQuestionDto } from "./survey-question-dto";

export interface SurveyDetailsDto {
    id: number;
    creator: string;
    name: string;
    urlName: string;
    dateCreated: Date;
    surveyQuestions: SurveyQuestionDto[]
}
