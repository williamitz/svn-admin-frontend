import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsViewComponent } from './earnings-view.component';

describe('EarningsViewComponent', () => {
  let component: EarningsViewComponent;
  let fixture: ComponentFixture<EarningsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EarningsViewComponent]
    });
    fixture = TestBed.createComponent(EarningsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
