import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpTutorialsComponent } from './help-tutorials.component';

describe('HelpTutorialsComponent', () => {
  let component: HelpTutorialsComponent;
  let fixture: ComponentFixture<HelpTutorialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpTutorialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpTutorialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
