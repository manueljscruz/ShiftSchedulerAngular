import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTabViewComponent } from './dashboard-tab-view.component';

describe('DashboardTabViewComponent', () => {
  let component: DashboardTabViewComponent;
  let fixture: ComponentFixture<DashboardTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardTabViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
