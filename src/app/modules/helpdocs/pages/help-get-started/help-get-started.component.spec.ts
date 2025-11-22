import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpGetStartedComponent } from './help-get-started.component';

describe('HelpGetStartedComponent', () => {
  let component: HelpGetStartedComponent;
  let fixture: ComponentFixture<HelpGetStartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpGetStartedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpGetStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
