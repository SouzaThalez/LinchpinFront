import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumOcorranceRegisterComponent } from './medium-ocorrance-register.component';

describe('MediumOcorranceRegisterComponent', () => {
  let component: MediumOcorranceRegisterComponent;
  let fixture: ComponentFixture<MediumOcorranceRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MediumOcorranceRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediumOcorranceRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
