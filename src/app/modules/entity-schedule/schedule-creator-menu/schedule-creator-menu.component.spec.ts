import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCreatorMenuComponent } from './schedule-creator-menu.component';

describe('ScheduleCreatorMenuComponent', () => {
  let component: ScheduleCreatorMenuComponent;
  let fixture: ComponentFixture<ScheduleCreatorMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleCreatorMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduleCreatorMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
