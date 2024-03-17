import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumFidelityComponent } from './medium-fidelity.component';

describe('MediumFidelityComponent', () => {
  let component: MediumFidelityComponent;
  let fixture: ComponentFixture<MediumFidelityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediumFidelityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediumFidelityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
