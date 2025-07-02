import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { SkillDTO } from '../../../shared/models/DTOs/Incoming/SkillDTO';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';

@Component({
  selector: 'worker-skill-selector',
  templateUrl: './worker-skill-selector.component.html',
  styleUrl: './worker-skill-selector.component.css'
})
export class WorkerSkillSelectorComponent {

  selectedSkill? : SkillDTO;

  workerSkills: SkillDTO[] = [];
  
  @Output() onSkillSelectedOp = new EventEmitter<BaseResponseModel>();
  
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.workerSkills = data.workerSkills;
  }

  onSkillSelected(skill: SkillDTO) {
    this.selectedSkill = skill;
  }

  onCancel() {
    this.onSkillSelectedOp.emit(new BaseResponseModel(false, 'Operation cancelled', null));
  }
  
  onAddSkill() {
    if(this.selectedSkill) {
      this.onSkillSelectedOp.emit(new BaseResponseModel(true, '', this.selectedSkill));
    }
  }
}
