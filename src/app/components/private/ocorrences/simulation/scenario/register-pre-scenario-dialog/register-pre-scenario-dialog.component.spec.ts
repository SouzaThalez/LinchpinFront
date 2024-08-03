import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPreScenarioDialogComponent } from './register-pre-scenario-dialog.component';

describe('RegisterPreScenarioDialogComponent', () => {
  let component: RegisterPreScenarioDialogComponent;
  let fixture: ComponentFixture<RegisterPreScenarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPreScenarioDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPreScenarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
