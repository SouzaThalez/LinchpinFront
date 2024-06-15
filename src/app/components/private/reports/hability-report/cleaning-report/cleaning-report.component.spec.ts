import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningReportComponent } from './cleaning-report.component';

describe('CleaningReportComponent', () => {
  let component: CleaningReportComponent;
  let fixture: ComponentFixture<CleaningReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CleaningReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CleaningReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
