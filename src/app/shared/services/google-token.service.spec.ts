import { TestBed } from '@angular/core/testing';

import { GoogleTokenService } from './google-token.service';

describe('GoogleTokenService', () => {
  let service: GoogleTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
