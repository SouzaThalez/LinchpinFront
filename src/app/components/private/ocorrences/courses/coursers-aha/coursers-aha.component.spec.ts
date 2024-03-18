import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursersAhaComponent } from './coursers-aha.component';

describe('CoursersAhaComponent', () => {
  let component: CoursersAhaComponent;
  let fixture: ComponentFixture<CoursersAhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoursersAhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursersAhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
