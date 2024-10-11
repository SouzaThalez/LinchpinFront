import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSimulatorComponent } from './new-simulator.component';

describe('NewSimulatorComponent', () => {
  let component: NewSimulatorComponent;
  let fixture: ComponentFixture<NewSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
