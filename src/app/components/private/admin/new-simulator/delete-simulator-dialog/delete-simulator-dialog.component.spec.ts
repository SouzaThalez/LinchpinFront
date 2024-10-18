import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSimulatorDialogComponent } from './delete-simulator-dialog.component';

describe('DeleteSimulatorDialogComponent', () => {
  let component: DeleteSimulatorDialogComponent;
  let fixture: ComponentFixture<DeleteSimulatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSimulatorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteSimulatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
