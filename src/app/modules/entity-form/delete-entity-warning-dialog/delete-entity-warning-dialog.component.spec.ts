import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteEntityWarningDialogComponent } from './delete-entity-warning-dialog.component';

describe('DeleteEntityWarningDialogComponent', () => {
  let component: DeleteEntityWarningDialogComponent;
  let fixture: ComponentFixture<DeleteEntityWarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteEntityWarningDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteEntityWarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
