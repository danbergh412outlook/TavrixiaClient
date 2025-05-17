import { TestBed } from '@angular/core/testing';

import { AppUserApiService } from './app-user-api.service';

describe('AppUserApiService', () => {
  let service: AppUserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
