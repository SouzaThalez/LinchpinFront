import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumOcorranceComponent } from './medium-ocorrance.component';

describe('MediumOcorranceComponent', () => {
  let component: MediumOcorranceComponent;
  let fixture: ComponentFixture<MediumOcorranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediumOcorranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediumOcorranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
