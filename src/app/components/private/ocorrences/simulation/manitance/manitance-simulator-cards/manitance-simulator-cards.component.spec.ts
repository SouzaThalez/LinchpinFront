import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManitanceSimulatorCardsComponent } from './manitance-simulator-cards.component';

describe('ManitanceSimulatorCardsComponent', () => {
  let component: ManitanceSimulatorCardsComponent;
  let fixture: ComponentFixture<ManitanceSimulatorCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManitanceSimulatorCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManitanceSimulatorCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
