import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSimulatorDialogComponent } from './detail-simulator-dialog.component';

describe('DetailSimulatorDialogComponent', () => {
  let component: DetailSimulatorDialogComponent;
  let fixture: ComponentFixture<DetailSimulatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailSimulatorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailSimulatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
