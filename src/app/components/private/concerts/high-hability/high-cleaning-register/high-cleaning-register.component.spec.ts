import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighCleaningRegisterComponent } from './high-cleaning-register.component';

describe('HighCleaningRegisterComponent', () => {
  let component: HighCleaningRegisterComponent;
  let fixture: ComponentFixture<HighCleaningRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighCleaningRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighCleaningRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
