import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEventViewComponent } from './schedule-event-view.component';

describe('ScheduleEventViewComponent', () => {
  let component: ScheduleEventViewComponent;
  let fixture: ComponentFixture<ScheduleEventViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleEventViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
