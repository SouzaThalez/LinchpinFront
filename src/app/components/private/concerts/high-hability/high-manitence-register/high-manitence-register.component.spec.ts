import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighManitenceRegisterComponent } from './high-manitence-register.component';

describe('HighManitenceRegisterComponent', () => {
  let component: HighManitenceRegisterComponent;
  let fixture: ComponentFixture<HighManitenceRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighManitenceRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighManitenceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
