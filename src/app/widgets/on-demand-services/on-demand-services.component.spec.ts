import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDemandServicesComponent } from './on-demand-services.component';

describe('OnDemandServicesComponent', () => {
  let component: OnDemandServicesComponent;
  let fixture: ComponentFixture<OnDemandServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnDemandServicesComponent]
    });
    fixture = TestBed.createComponent(OnDemandServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
