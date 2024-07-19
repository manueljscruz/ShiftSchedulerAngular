import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityAbsencesViewComponent } from './entity-absences-view.component';

describe('EntityAbsencesViewComponent', () => {
  let component: EntityAbsencesViewComponent;
  let fixture: ComponentFixture<EntityAbsencesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityAbsencesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityAbsencesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
