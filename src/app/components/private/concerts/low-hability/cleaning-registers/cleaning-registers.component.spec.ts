import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningRegistersComponent } from './cleaning-registers.component';

describe('CleaningRegistersComponent', () => {
  let component: CleaningRegistersComponent;
  let fixture: ComponentFixture<CleaningRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CleaningRegistersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CleaningRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
