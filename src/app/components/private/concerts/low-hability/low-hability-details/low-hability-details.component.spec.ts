import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowHabilityDetailsComponent } from './low-hability-details.component';

describe('LowHabilityDetailsComponent', () => {
  let component: LowHabilityDetailsComponent;
  let fixture: ComponentFixture<LowHabilityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LowHabilityDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LowHabilityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
