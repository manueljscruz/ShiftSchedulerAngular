import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityRulesComponent } from './entity-rules.component';

describe('EntityRulesComponent', () => {
  let component: EntityRulesComponent;
  let fixture: ComponentFixture<EntityRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
