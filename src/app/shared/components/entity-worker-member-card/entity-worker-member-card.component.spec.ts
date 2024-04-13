import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityWorkerMemberCardComponent } from './entity-worker-member-card.component';

describe('EntityWorkerMemberCardComponent', () => {
  let component: EntityWorkerMemberCardComponent;
  let fixture: ComponentFixture<EntityWorkerMemberCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntityWorkerMemberCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityWorkerMemberCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
