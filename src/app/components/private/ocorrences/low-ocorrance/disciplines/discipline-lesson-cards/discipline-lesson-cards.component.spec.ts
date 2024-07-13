import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplineLessonCardsComponent } from './discipline-lesson-cards.component';

describe('DisciplineLessonCardsComponent', () => {
  let component: DisciplineLessonCardsComponent;
  let fixture: ComponentFixture<DisciplineLessonCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisciplineLessonCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisciplineLessonCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
