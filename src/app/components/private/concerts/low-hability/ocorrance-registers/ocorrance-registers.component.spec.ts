import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorranceRegistersComponent } from './ocorrance-registers.component';

describe('OcorranceRegistersComponent', () => {
  let component: OcorranceRegistersComponent;
  let fixture: ComponentFixture<OcorranceRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OcorranceRegistersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcorranceRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
