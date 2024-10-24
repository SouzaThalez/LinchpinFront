import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighFidelitySimulatorsComponent } from './high-fidelity-simulators.component';

describe('HighFidelitySimulatorsComponent', () => {
  let component: HighFidelitySimulatorsComponent;
  let fixture: ComponentFixture<HighFidelitySimulatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighFidelitySimulatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighFidelitySimulatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
