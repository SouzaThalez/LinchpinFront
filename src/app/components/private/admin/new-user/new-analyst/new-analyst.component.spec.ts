import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAnalystComponent } from './new-analyst.component';

describe('NewAnalystComponent', () => {
  let component: NewAnalystComponent;
  let fixture: ComponentFixture<NewAnalystComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewAnalystComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewAnalystComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
