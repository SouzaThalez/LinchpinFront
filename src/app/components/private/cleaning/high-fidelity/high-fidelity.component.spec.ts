import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighFidelityComponent } from './high-fidelity.component';

describe('HighFidelityComponent', () => {
  let component: HighFidelityComponent;
  let fixture: ComponentFixture<HighFidelityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighFidelityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighFidelityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
