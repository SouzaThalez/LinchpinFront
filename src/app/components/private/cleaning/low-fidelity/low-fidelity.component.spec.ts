import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowFidelityComponent } from './low-fidelity.component';

describe('LowFidelityComponent', () => {
  let component: LowFidelityComponent;
  let fixture: ComponentFixture<LowFidelityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LowFidelityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LowFidelityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
