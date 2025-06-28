import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleActionMenuComponent } from './schedule-action-menu.component';

describe('ScheduleActionMenuComponent', () => {
  let component: ScheduleActionMenuComponent;
  let fixture: ComponentFixture<ScheduleActionMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleActionMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
