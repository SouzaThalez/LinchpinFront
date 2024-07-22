import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterManitanceDialogComponent } from './register-manitance-dialog.component';

describe('RegisterManitanceDialogComponent', () => {
  let component: RegisterManitanceDialogComponent;
  let fixture: ComponentFixture<RegisterManitanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterManitanceDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterManitanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
