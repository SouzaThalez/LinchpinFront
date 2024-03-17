import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighOcorranceComponent } from './high-ocorrance.component';

describe('HighOcorranceComponent', () => {
  let component: HighOcorranceComponent;
  let fixture: ComponentFixture<HighOcorranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighOcorranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HighOcorranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
