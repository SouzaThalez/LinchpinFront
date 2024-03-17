import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowOcorranceComponent } from './low-ocorrance.component';

describe('LowOcorranceComponent', () => {
  let component: LowOcorranceComponent;
  let fixture: ComponentFixture<LowOcorranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LowOcorranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LowOcorranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
