import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpdocsComponent } from './helpdocs.component';

describe('HelpdocsComponent', () => {
  let component: HelpdocsComponent;
  let fixture: ComponentFixture<HelpdocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HelpdocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpdocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
