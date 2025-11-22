import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpMembersComponent } from './help-members.component';

describe('HelpMembersComponent', () => {
  let component: HelpMembersComponent;
  let fixture: ComponentFixture<HelpMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
