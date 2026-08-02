import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighCleaningDetailsComponent } from './high-cleaning-details.component';

describe('HighCleaningDetailsComponent', () => {
  let component: HighCleaningDetailsComponent;
  let fixture: ComponentFixture<HighCleaningDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighCleaningDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighCleaningDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
