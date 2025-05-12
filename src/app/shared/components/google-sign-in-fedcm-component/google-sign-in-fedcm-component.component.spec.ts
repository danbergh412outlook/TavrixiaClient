import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleSignInFedcmComponent } from './google-sign-in-fedcm-component.component';

describe('GoogleSignInFedcmComponentComponent', () => {
  let component: GoogleSignInFedcmComponent;
  let fixture: ComponentFixture<GoogleSignInFedcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleSignInFedcmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleSignInFedcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
