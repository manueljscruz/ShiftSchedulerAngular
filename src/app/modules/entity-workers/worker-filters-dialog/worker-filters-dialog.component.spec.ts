import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerFiltersDialogComponent } from './worker-filters-dialog.component';

describe('WorkerFiltersDialogComponent', () => {
  let component: WorkerFiltersDialogComponent;
  let fixture: ComponentFixture<WorkerFiltersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerFiltersDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerFiltersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
