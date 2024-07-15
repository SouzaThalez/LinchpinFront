import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowFidelityCleaningDialogComponent } from './low-fidelity-cleaning-dialog.component';

describe('LowFidelityCleaningDialogComponent', () => {
  let component: LowFidelityCleaningDialogComponent;
  let fixture: ComponentFixture<LowFidelityCleaningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LowFidelityCleaningDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LowFidelityCleaningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
