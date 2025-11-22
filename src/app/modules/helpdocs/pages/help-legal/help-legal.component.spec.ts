import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpLegalComponent } from './help-legal.component';

describe('HelpLegalComponent', () => {
  let component: HelpLegalComponent;
  let fixture: ComponentFixture<HelpLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpLegalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
