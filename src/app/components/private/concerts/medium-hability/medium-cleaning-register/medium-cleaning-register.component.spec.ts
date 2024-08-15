import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumCleaningRegisterComponent } from './medium-cleaning-register.component';

describe('MediumCleaningRegisterComponent', () => {
  let component: MediumCleaningRegisterComponent;
  let fixture: ComponentFixture<MediumCleaningRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediumCleaningRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediumCleaningRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
