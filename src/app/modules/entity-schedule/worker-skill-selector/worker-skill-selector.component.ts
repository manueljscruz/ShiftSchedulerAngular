import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { SkillDTO } from '../../../shared/models/DTOs/Incoming/SkillDTO';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { ADD_ICON, CANCEL_ICON } from '../../../shared/constants/IconNamesConstants';

@Component({
  selector: 'worker-skill-selector',
  templateUrl: './worker-skill-selector.component.html',
  styleUrl: './worker-skill-selector.component.css'
})
export class WorkerSkillSelectorComponent {

  ADD_ICON = ADD_ICON;
  CANCEL_ICON = CANCEL_ICON;

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
