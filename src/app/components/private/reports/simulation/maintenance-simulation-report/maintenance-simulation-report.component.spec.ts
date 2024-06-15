import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceSimulationReportComponent } from './maintenance-simulation-report.component';

describe('MaintenanceSimulationReportComponent', () => {
  let component: MaintenanceSimulationReportComponent;
  let fixture: ComponentFixture<MaintenanceSimulationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaintenanceSimulationReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaintenanceSimulationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
