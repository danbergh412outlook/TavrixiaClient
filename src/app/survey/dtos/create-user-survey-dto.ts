import { CreateUserResponseDto } from "./create-user-response-dto";

export interface CreateUserSurveyDto {
    surveyUrlName: string;
    userResponses: CreateUserResponseDto[];
}
