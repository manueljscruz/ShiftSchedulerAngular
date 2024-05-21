import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityShiftsComponent } from './entity-shifts.component';

describe('EntityShiftsComponent', () => {
  let component: EntityShiftsComponent;
  let fixture: ComponentFixture<EntityShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityShiftsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
