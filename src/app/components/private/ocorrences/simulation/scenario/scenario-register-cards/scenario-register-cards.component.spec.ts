import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenarioRegisterCardsComponent } from './scenario-register-cards.component';

describe('ScenarioRegisterCardsComponent', () => {
  let component: ScenarioRegisterCardsComponent;
  let fixture: ComponentFixture<ScenarioRegisterCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScenarioRegisterCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScenarioRegisterCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
