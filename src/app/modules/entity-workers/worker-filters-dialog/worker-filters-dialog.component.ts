import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CLOSE_ICON, SEARCH_ICON } from '../../../shared/constants/IconNamesConstants';
import { SkillDTO } from '../../../shared/models/DTOs/Incoming/SkillDTO';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ShiftDTO } from '../../../shared/models/DTOs/Incoming/ShiftDTO';
import { MemberListFilterDTO } from '../../../shared/models/DTOs/Outgoing/MemberListFilterDTO';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-worker-filters-dialog',
  templateUrl: './worker-filters-dialog.component.html',
  styleUrl: './worker-filters-dialog.component.css'
})
export class WorkerFiltersDialogComponent {

  // Constants
  CLOSE_ICON : string = CLOSE_ICON;
  SEARCH_ICON : string = SEARCH_ICON;

  // Properties
  skillSelections: SkillDTO[] = [];

  shiftSelections: ShiftDTO[] = [];

  nameFilter: string = '';

  selectedSkills: SkillDTO[] = [];

  selectedShifts: ShiftDTO[] = [];

  partOfRotation: boolean = false;

  worksWeekDays: boolean = false;

  worksWeekEnds: boolean = false;

  applyMemberTypeFilter: boolean = false;

  isBot: boolean = false;

  // Events
  @Output() onFiltersClose: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.skillSelections = data.entityUsedSkills;
    this.shiftSelections = data.entityShifts;

    const filters: MemberListFilterDTO = data.activeFilters;
    if (filters) {
      this.nameFilter = filters.nameFilter ?? '';
      this.selectedSkills = filters.selectedSkills ?? [];
      this.selectedShifts = filters.selectedShifts ?? [];
      this.partOfRotation = filters.partOfRotation ?? false;
      this.worksWeekDays = filters.worksWeekDays ?? false;
      this.worksWeekEnds = filters.worksWeekEnds ?? false;
      this.applyMemberTypeFilter = filters.applyMemberTypeFilter ?? false;
      this.isBot = filters.isBot ?? false;
    }
  }

  onRotationChange($event: MatCheckboxChange) {
    if($event.checked){
      this.worksWeekDays = false;
      this.worksWeekEnds = false;
    }
  }


  onClose(): void {

    this.onFiltersClose.emit(null);
  }

  onSearch() {

    let filterMembersDTO: MemberListFilterDTO = {
      nameFilter: this.nameFilter,
      applyMemberTypeFilter: this.applyMemberTypeFilter,
      isBot: this.applyMemberTypeFilter ? this.isBot : false,
      selectedSkills: this.selectedSkills,
      selectedShifts: this.selectedShifts,
      partOfRotation: this.partOfRotation,
      worksWeekDays: this.worksWeekDays,
      worksWeekEnds: this.worksWeekEnds
    };

    this.onFiltersClose.emit(filterMembersDTO);
  }

  compareSkills = (s1: SkillDTO, s2: SkillDTO) => s1 && s2 ? s1.skillId === s2.skillId : s1 === s2;

  compareShifts = (sh1: ShiftDTO, sh2: ShiftDTO) => sh1 && sh2 ? sh1.shiftId === sh2.shiftId : sh1 === sh2;

}
