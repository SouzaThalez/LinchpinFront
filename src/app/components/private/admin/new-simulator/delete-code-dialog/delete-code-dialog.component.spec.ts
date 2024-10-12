import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCodeDialogComponent } from './delete-code-dialog.component';

describe('DeleteCodeDialogComponent', () => {
  let component: DeleteCodeDialogComponent;
  let fixture: ComponentFixture<DeleteCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteCodeDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
