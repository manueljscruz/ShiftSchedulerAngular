import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSchedulesComponent } from './help-schedules.component';

describe('HelpSchedulesComponent', () => {
  let component: HelpSchedulesComponent;
  let fixture: ComponentFixture<HelpSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpSchedulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
