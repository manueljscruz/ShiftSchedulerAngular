import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpBillingComponent } from './help-billing.component';

describe('HelpBillingComponent', () => {
  let component: HelpBillingComponent;
  let fixture: ComponentFixture<HelpBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpBillingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
