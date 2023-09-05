import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterLiteComponent } from './date-filter-lite.component';

describe('DateFilterLiteComponent', () => {
  let component: DateFilterLiteComponent;
  let fixture: ComponentFixture<DateFilterLiteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DateFilterLiteComponent]
    });
    fixture = TestBed.createComponent(DateFilterLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
