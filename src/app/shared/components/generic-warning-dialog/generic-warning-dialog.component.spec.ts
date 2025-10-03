import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericWarningDialogComponent } from './generic-warning-dialog.component';

describe('GenericWarningDialogComponent', () => {
  let component: GenericWarningDialogComponent;
  let fixture: ComponentFixture<GenericWarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericWarningDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
