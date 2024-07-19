import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAbsencesFormComponent } from './entity-absences-form.component';

describe('EntityAbsencesFormComponent', () => {
  let component: EntityAbsencesFormComponent;
  let fixture: ComponentFixture<EntityAbsencesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityAbsencesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityAbsencesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
