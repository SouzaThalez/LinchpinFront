import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSimulatorReportDialogComponent } from './preview-simulator-report-dialog.component';

describe('PreviewSimulatorReportDialogComponent', () => {
  let component: PreviewSimulatorReportDialogComponent;
  let fixture: ComponentFixture<PreviewSimulatorReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewSimulatorReportDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewSimulatorReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
