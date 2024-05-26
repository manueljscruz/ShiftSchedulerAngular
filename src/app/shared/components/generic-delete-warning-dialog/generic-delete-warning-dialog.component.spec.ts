import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDeleteWarningDialogComponent } from './generic-delete-warning-dialog.component';

describe('GenericDeleteWarningDialogComponent', () => {
  let component: GenericDeleteWarningDialogComponent;
  let fixture: ComponentFixture<GenericDeleteWarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericDeleteWarningDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericDeleteWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
