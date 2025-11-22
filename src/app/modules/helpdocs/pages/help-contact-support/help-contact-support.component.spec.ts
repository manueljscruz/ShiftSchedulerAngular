import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpContactSupportComponent } from './help-contact-support.component';

describe('HelpContactSupportComponent', () => {
  let component: HelpContactSupportComponent;
  let fixture: ComponentFixture<HelpContactSupportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpContactSupportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpContactSupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
