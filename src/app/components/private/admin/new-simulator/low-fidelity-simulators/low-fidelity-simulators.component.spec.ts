import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowFidelitySimulatorsComponent } from './low-fidelity-simulators.component';

describe('LowFidelitySimulatorsComponent', () => {
  let component: LowFidelitySimulatorsComponent;
  let fixture: ComponentFixture<LowFidelitySimulatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LowFidelitySimulatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LowFidelitySimulatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
