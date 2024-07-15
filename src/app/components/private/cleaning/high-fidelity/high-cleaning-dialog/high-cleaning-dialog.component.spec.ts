import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighCleaningDialogComponent } from './high-cleaning-dialog.component';

describe('HighCleaningDialogComponent', () => {
  let component: HighCleaningDialogComponent;
  let fixture: ComponentFixture<HighCleaningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighCleaningDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighCleaningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
