import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveSimulatorDialogComponent } from './remove-simulator-dialog.component';

describe('RemoveSimulatorDialogComponent', () => {
  let component: RemoveSimulatorDialogComponent;
  let fixture: ComponentFixture<RemoveSimulatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveSimulatorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveSimulatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
