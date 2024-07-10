import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLessonCardsComponent } from './training-lesson-cards.component';

describe('TrainingLessonCardsComponent', () => {
  let component: TrainingLessonCardsComponent;
  let fixture: ComponentFixture<TrainingLessonCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrainingLessonCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingLessonCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
