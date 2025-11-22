import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAbsencesComponent } from './help-absences.component';

describe('HelpAbsencesComponent', () => {
  let component: HelpAbsencesComponent;
  let fixture: ComponentFixture<HelpAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpAbsencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
