import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailClassSimulatorDialogComponent } from './detail-class-simulator-dialog.component';

describe('DetailClassSimulatorDialogComponent', () => {
  let component: DetailClassSimulatorDialogComponent;
  let fixture: ComponentFixture<DetailClassSimulatorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailClassSimulatorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailClassSimulatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
