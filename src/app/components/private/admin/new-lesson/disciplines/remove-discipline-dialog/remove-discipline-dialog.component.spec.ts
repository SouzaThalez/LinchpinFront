import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveDisciplineDialogComponent } from './remove-discipline-dialog.component';

describe('RemoveDisciplineDialogComponent', () => {
  let component: RemoveDisciplineDialogComponent;
  let fixture: ComponentFixture<RemoveDisciplineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveDisciplineDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveDisciplineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
