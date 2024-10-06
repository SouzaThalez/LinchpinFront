import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewManitanceReportDialogComponent } from './preview-manitance-report-dialog.component';

describe('PreviewManitanceReportDialogComponent', () => {
  let component: PreviewManitanceReportDialogComponent;
  let fixture: ComponentFixture<PreviewManitanceReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreviewManitanceReportDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewManitanceReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
