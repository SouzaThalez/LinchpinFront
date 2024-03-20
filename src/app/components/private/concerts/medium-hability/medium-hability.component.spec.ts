import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumHabilityComponent } from './medium-hability.component';

describe('MediumHabilityComponent', () => {
  let component: MediumHabilityComponent;
  let fixture: ComponentFixture<MediumHabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediumHabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediumHabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
