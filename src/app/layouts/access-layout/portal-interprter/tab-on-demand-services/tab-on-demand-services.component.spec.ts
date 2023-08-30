import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabOnDemandServicesComponent } from './tab-on-demand-services.component';

describe('TabOnDemandServicesComponent', () => {
  let component: TabOnDemandServicesComponent;
  let fixture: ComponentFixture<TabOnDemandServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabOnDemandServicesComponent]
    });
    fixture = TestBed.createComponent(TabOnDemandServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
