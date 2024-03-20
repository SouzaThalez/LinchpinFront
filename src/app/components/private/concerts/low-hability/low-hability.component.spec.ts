import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowHabilityComponent } from './low-hability.component';

describe('LowHabilityComponent', () => {
  let component: LowHabilityComponent;
  let fixture: ComponentFixture<LowHabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LowHabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LowHabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
