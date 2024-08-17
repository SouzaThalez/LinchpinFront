import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewLessonReportDialogComponent } from './preview-lesson-report-dialog.component';

describe('PreviewLessonReportDialogComponent', () => {
  let component: PreviewLessonReportDialogComponent;
  let fixture: ComponentFixture<PreviewLessonReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewLessonReportDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewLessonReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
