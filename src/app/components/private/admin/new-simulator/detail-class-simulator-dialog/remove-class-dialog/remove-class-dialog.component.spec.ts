import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveClassDialogComponent } from './remove-class-dialog.component';

describe('RemoveClassDialogComponent', () => {
  let component: RemoveClassDialogComponent;
  let fixture: ComponentFixture<RemoveClassDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveClassDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveClassDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
