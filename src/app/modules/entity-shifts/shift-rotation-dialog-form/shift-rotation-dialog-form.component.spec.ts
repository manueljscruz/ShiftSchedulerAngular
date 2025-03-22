import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftRotationDialogFormComponent } from './shift-rotation-dialog-form.component';

describe('ShiftRotationDialogFormComponent', () => {
  let component: ShiftRotationDialogFormComponent;
  let fixture: ComponentFixture<ShiftRotationDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftRotationDialogFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftRotationDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
