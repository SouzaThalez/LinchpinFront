import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorranceDialogComponent } from './ocorrance-dialog.component';

describe('OcorranceDialogComponent', () => {
  let component: OcorranceDialogComponent;
  let fixture: ComponentFixture<OcorranceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OcorranceDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcorranceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
