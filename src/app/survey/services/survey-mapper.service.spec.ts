import { TestBed } from '@angular/core/testing';

import { SurveyMapperService } from './survey-mapper.service';

describe('SurveyMapperService', () => {
  let service: SurveyMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
