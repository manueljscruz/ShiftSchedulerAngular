import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftBreakDialogFormComponent } from './shift-break-dialog-form.component';

describe('ShiftBreakDialogFormComponent', () => {
  let component: ShiftBreakDialogFormComponent;
  let fixture: ComponentFixture<ShiftBreakDialogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftBreakDialogFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShiftBreakDialogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
