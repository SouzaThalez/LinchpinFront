import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningSimulationReportComponent } from './cleaning-simulation-report.component';

describe('CleaningSimulationReportComponent', () => {
  let component: CleaningSimulationReportComponent;
  let fixture: ComponentFixture<CleaningSimulationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CleaningSimulationReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CleaningSimulationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
