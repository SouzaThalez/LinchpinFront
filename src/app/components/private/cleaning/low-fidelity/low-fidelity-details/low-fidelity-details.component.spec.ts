import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowFidelityDetailsComponent } from './low-fidelity-details.component';

describe('LowFidelityDetailsComponent', () => {
  let component: LowFidelityDetailsComponent;
  let fixture: ComponentFixture<LowFidelityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LowFidelityDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LowFidelityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
