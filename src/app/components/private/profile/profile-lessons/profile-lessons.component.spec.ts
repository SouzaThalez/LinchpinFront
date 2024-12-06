import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLessonsComponent } from './profile-lessons.component';

describe('ProfileLessonsComponent', () => {
  let component: ProfileLessonsComponent;
  let fixture: ComponentFixture<ProfileLessonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileLessonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileLessonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
