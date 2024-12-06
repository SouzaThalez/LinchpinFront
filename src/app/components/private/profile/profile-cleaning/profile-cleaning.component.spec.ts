import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCleaningComponent } from './profile-cleaning.component';

describe('ProfileCleaningComponent', () => {
  let component: ProfileCleaningComponent;
  let fixture: ComponentFixture<ProfileCleaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileCleaningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileCleaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
