import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityScheduleComponent } from './entity-schedule.component';

describe('EntityScheduleComponent', () => {
  let component: EntityScheduleComponent;
  let fixture: ComponentFixture<EntityScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityScheduleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
