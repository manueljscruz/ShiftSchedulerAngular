import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAbsencesComponent } from './entity-absences.component';

describe('EntityAbsencesComponent', () => {
  let component: EntityAbsencesComponent;
  let fixture: ComponentFixture<EntityAbsencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityAbsencesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityAbsencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
