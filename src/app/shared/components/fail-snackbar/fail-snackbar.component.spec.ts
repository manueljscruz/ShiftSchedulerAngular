import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailSnackbarComponent } from './fail-snackbar.component';

describe('FailSnackbarComponent', () => {
  let component: FailSnackbarComponent;
  let fixture: ComponentFixture<FailSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailSnackbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FailSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
