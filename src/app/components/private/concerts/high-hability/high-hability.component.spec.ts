import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighHabilityComponent } from './high-hability.component';

describe('HighHabilityComponent', () => {
  let component: HighHabilityComponent;
  let fixture: ComponentFixture<HighHabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighHabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighHabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
