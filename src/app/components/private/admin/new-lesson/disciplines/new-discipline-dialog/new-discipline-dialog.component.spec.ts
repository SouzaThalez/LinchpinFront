import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDisciplineDialogComponent } from './new-discipline-dialog.component';

describe('NewDisciplineDialogComponent', () => {
  let component: NewDisciplineDialogComponent;
  let fixture: ComponentFixture<NewDisciplineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewDisciplineDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewDisciplineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
