import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecializedTypesComponent } from './especialized-types.component';

describe('EspecializedTypesComponent', () => {
  let component: EspecializedTypesComponent;
  let fixture: ComponentFixture<EspecializedTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspecializedTypesComponent]
    });
    fixture = TestBed.createComponent(EspecializedTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
