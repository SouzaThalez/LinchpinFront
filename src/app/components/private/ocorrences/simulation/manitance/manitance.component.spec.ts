import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManitanceComponent } from './manitance.component';

describe('ManitanceComponent', () => {
  let component: ManitanceComponent;
  let fixture: ComponentFixture<ManitanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManitanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManitanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
