import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClassSimulatorDialogComponent } from './new-class-simulator-dialog.component';

describe('NewClassSimulatorDialogComponent', () => {
  let component: NewClassSimulatorDialogComponent;
  let fixture: ComponentFixture<NewClassSimulatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewClassSimulatorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewClassSimulatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
