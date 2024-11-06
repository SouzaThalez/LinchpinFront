import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveLessonDialogComponent } from './remove-lesson-dialog.component';

describe('RemoveLessonDialogComponent', () => {
  let component: RemoveLessonDialogComponent;
  let fixture: ComponentFixture<RemoveLessonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveLessonDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveLessonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
