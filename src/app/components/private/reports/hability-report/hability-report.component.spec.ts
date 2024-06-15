import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilityReportComponent } from './hability-report.component';

describe('HabilityReportComponent', () => {
  let component: HabilityReportComponent;
  let fixture: ComponentFixture<HabilityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HabilityReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabilityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
