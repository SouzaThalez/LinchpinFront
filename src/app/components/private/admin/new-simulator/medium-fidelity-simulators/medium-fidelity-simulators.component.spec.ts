import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumFidelitySimulatorsComponent } from './medium-fidelity-simulators.component';

describe('MediumFidelitySimulatorsComponent', () => {
  let component: MediumFidelitySimulatorsComponent;
  let fixture: ComponentFixture<MediumFidelitySimulatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediumFidelitySimulatorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediumFidelitySimulatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
