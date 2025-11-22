import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpPrivacyComponent } from './help-privacy.component';

describe('HelpPrivacyComponent', () => {
  let component: HelpPrivacyComponent;
  let fixture: ComponentFixture<HelpPrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpPrivacyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
