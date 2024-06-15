import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioSimulationReportComponent } from './scenario-simulation-report.component';

describe('ScenarioSimulationReportComponent', () => {
  let component: ScenarioSimulationReportComponent;
  let fixture: ComponentFixture<ScenarioSimulationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScenarioSimulationReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScenarioSimulationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
