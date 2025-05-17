import { UserSurveyResponseDto } from "./user-survey-response-dto";

export interface UserSurveyDto {
    userUrlName: string;
    surveyName: string;
    surveyUrlName: string;
    responses: UserSurveyResponseDto[]
}
