import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpShiftsComponent } from './help-shifts.component';

describe('HelpShiftsComponent', () => {
  let component: HelpShiftsComponent;
  let fixture: ComponentFixture<HelpShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpShiftsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
