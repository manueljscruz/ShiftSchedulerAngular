import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddChildEntityDialogComponent } from './add-child-entity-dialog.component';

describe('AddChildEntityDialogComponent', () => {
  let component: AddChildEntityDialogComponent;
  let fixture: ComponentFixture<AddChildEntityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddChildEntityDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChildEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
