import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleEventViewHolderComponent } from './schedule-event-view-holder.component';

describe('ScheduleEventViewHolderComponent', () => {
  let component: ScheduleEventViewHolderComponent;
  let fixture: ComponentFixture<ScheduleEventViewHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleEventViewHolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleEventViewHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
