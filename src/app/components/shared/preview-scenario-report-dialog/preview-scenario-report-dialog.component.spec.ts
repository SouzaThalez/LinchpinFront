import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewScenarioReportDialogComponent } from './preview-scenario-report-dialog.component';

describe('PreviewScenarioReportDialogComponent', () => {
  let component: PreviewScenarioReportDialogComponent;
  let fixture: ComponentFixture<PreviewScenarioReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewScenarioReportDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewScenarioReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
