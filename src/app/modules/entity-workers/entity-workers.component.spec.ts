import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityWorkersComponent } from './entity-workers.component';

describe('EntityWorkersComponent', () => {
  let component: EntityWorkersComponent;
  let fixture: ComponentFixture<EntityWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityWorkersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
