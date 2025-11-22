import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpReleaseNotesComponent } from './help-release-notes.component';

describe('HelpReleaseNotesComponent', () => {
  let component: HelpReleaseNotesComponent;
  let fixture: ComponentFixture<HelpReleaseNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpReleaseNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpReleaseNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
