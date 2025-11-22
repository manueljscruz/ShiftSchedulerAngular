import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpNotificationsComponent } from './help-notifications.component';

describe('HelpNotificationsComponent', () => {
  let component: HelpNotificationsComponent;
  let fixture: ComponentFixture<HelpNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpNotificationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
