import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumCleaningDialogComponent } from './medium-cleaning-dialog.component';

describe('MediumCleaningDialogComponent', () => {
  let component: MediumCleaningDialogComponent;
  let fixture: ComponentFixture<MediumCleaningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediumCleaningDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediumCleaningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
