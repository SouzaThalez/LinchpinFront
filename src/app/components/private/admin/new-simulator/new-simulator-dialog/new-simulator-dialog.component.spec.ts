import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSimulatorDialogComponent } from './new-simulator-dialog.component';

describe('NewSimulatorDialogComponent', () => {
  let component: NewSimulatorDialogComponent;
  let fixture: ComponentFixture<NewSimulatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSimulatorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSimulatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
