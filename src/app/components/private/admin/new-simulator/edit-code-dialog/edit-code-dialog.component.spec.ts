import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCodeDialogComponent } from './edit-code-dialog.component';

describe('EditCodeDialogComponent', () => {
  let component: EditCodeDialogComponent;
  let fixture: ComponentFixture<EditCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCodeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
