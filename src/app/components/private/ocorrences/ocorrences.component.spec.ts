import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrencesComponent } from './ocorrences.component';

describe('OcorrencesComponent', () => {
  let component: OcorrencesComponent;
  let fixture: ComponentFixture<OcorrencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcorrencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcorrencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
