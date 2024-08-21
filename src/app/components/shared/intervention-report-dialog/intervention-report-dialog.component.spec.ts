import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionReportDialogComponent } from './intervention-report-dialog.component';

describe('InterventionReportDialogComponent', () => {
  let component: InterventionReportDialogComponent;
  let fixture: ComponentFixture<InterventionReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionReportDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterventionReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
