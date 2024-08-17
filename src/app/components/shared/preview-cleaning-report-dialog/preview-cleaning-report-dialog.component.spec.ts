import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCleaningReportDialogComponent } from './preview-cleaning-report-dialog.component';

describe('PreviewCleaningReportDialogComponent', () => {
  let component: PreviewCleaningReportDialogComponent;
  let fixture: ComponentFixture<PreviewCleaningReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewCleaningReportDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewCleaningReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
