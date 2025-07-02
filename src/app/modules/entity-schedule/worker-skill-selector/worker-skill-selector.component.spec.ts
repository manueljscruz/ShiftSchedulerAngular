import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerSkillSelectorComponent } from './worker-skill-selector.component';

describe('WorkerSkillSelectorComponent', () => {
  let component: WorkerSkillSelectorComponent;
  let fixture: ComponentFixture<WorkerSkillSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkerSkillSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerSkillSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
