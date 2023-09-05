import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalSessionInformationComponent } from './additional-session-information.component';

describe('AdditionalSessionInformationComponent', () => {
  let component: AdditionalSessionInformationComponent;
  let fixture: ComponentFixture<AdditionalSessionInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalSessionInformationComponent]
    });
    fixture = TestBed.createComponent(AdditionalSessionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
