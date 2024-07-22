import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterScenarioDialogComponent } from './register-scenario-dialog.component';

describe('RegisterScenarioDialogComponent', () => {
  let component: RegisterScenarioDialogComponent;
  let fixture: ComponentFixture<RegisterScenarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterScenarioDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterScenarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
