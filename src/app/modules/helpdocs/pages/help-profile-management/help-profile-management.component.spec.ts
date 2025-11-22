import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpProfileManagementComponent } from './help-profile-management.component';

describe('HelpProfileManagementComponent', () => {
  let component: HelpProfileManagementComponent;
  let fixture: ComponentFixture<HelpProfileManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpProfileManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpProfileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
