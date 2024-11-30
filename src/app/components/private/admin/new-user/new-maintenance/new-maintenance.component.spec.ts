import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMaintenanceComponent } from './new-maintenance.component';

describe('NewMaintenanceComponent', () => {
  let component: NewMaintenanceComponent;
  let fixture: ComponentFixture<NewMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewMaintenanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
