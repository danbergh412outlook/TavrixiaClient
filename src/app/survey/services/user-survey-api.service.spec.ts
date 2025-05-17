import { TestBed } from '@angular/core/testing';

import { UserSurveyApiService } from './user-survey-api.service';

describe('UserSurveyApiService', () => {
  let service: UserSurveyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSurveyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
