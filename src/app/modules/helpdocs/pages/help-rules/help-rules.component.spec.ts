import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpRulesComponent } from './help-rules.component';

describe('HelpRulesComponent', () => {
  let component: HelpRulesComponent;
  let fixture: ComponentFixture<HelpRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
