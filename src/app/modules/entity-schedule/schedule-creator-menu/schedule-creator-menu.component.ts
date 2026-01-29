import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { EntityWorkerMemberDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';
import { ShiftDTO } from '../../../shared/models/DTOs/Incoming/ShiftDTO';
import { EntityRuleDTO } from '../../../shared/models/DTOs/Incoming/EntityRuleDTO';
import { CreateEntityScheduleDTO } from '../../../shared/models/DTOs/Outgoing/CreateEntityScheduleDTO';
import { CLOSE_ICON } from '../../../shared/constants/IconNamesConstants';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CREATE_SCHEDULE_ALL_MEMBERS, CREATE_SCHEDULE_ALL_RULES, CREATE_SCHEDULE_ALL_SHIFTS, CREATE_SCHEDULE_CLEAR_EXISTING, CREATE_SCHEDULE_FILTERED_MEMBERS, CREATE_SCHEDULE_FILTERED_RULES, CREATE_SCHEDULE_FILTERED_SHIFTS, CREATE_SCHEDULE_MERGE_EXISTING, CREATE_SCHEDULE_MULTIPLE_RESPONSIBILITIES, CREATE_SCHEDULE_SINGLE_RESPONSIBILITY, CREATE_SCHEDULE_TITLE, CREATE_SCHEDULE_WARNING_TEMPLATE } from '../../../shared/constants/UITextConstants';
import { GenericWarningDialogComponent } from '../../../shared/components/generic-warning-dialog/generic-warning-dialog.component';

export enum FilterType{
    Members = 'Members',
    Shifts = 'Shifts',
    Rules = 'Rules'
};

@Component({
  selector: 'schedule-creator-menu',
  templateUrl: './schedule-creator-menu.component.html',
  styleUrl: './schedule-creator-menu.component.css'
})


export class ScheduleCreatorMenuComponent {

  //#region Constants

  MEMBER_FILTER_TYPE: FilterType = FilterType.Members;
  SHIFT_FILTER_TYPE: FilterType = FilterType.Shifts;
  RULE_FILTER_TYPE: FilterType = FilterType.Rules;
  CLOSE_ICON : string = CLOSE_ICON;
  CREATE_SCHEDULE_ICON : string = 'playlist_add_check';

  CREATE_SCHEDULE_TITLE: string = CREATE_SCHEDULE_TITLE;
  CREATE_SCHEDULE_WARNING_TEMPLATE: string = CREATE_SCHEDULE_WARNING_TEMPLATE;

  //#endregion

  //#region Properties

  /// <summary>
  /// Flag that indicates that roles assigned to the workers can only have one responsibility.
  /// </summary>
  singleRoleResponsibility : boolean = false;

  /// <summary>
  /// Flag that indicates that the schedule should be created with the existing schedule or should be created from scratch.
  /// </summary>
  clearExistingSchedule : boolean = false;

  /// <summary>
  /// Flag that indicates that the schedule should be created with the filtered options
  /// </summary>
  isFilterable: boolean = false;

  /// <summary>
  /// Flag that indicates that the schedule should be created with the filtered options
  /// </summary>
  applyFilter: boolean = false;

  /// <summary>
  /// Field that indicates the start date of the schedule.
  /// </summary>
  startDate : Date = new Date();

  /// <summary>
  /// Field that indicates the end date of the schedule.
  /// </summary>
  endDate : Date = new Date();

  /// <summary>
  /// List of entity worker members
  /// </summary>
  entityWorkerMembers: EntityWorkerMemberDTO[];
  
  /// <summary>
  /// List of entity shifts
  /// </summary>
  entityShifts: ShiftDTO[];
    
  /// <summary>
  /// List of entity rules
  /// </summary>
  entityRules: EntityRuleDTO[];

  /// <summary>
  /// List of selected entity worker members
  /// </summary>
  selectedEntityWorkerMembers: string[] = [];

  /// <summary>
  /// List of selected entity shifts
  /// </summary>
  selectedEntityShifts: string[] = [];

  /// <summary>
  /// List of selected entity rules
  /// </summary>
  selectedEntityRules: string[] = [];

  /// <summary>
  /// Flag that indicates that all entity worker members are selected
  /// </summary>
  isMembersAllSelected: boolean = false;

  /// <summary>
  /// Flag that indicates that all entity shifts are selected
  /// </summary>
  isShiftsAllSelected: boolean = false;

  /// <summary>
  /// Flag that indicates that all entity rules are selected
  /// </summary>
  isRulesAllSelected: boolean = false;

  /// <summary>
  /// Index of the selected tab
  /// </summary>
  selectedTabIndex: number = 0;

  /// <summary>
  /// Output event that is emitted when the schedule is created
  /// </summary>
  @Output() createScheduleOp = new EventEmitter<BaseResponseModel>();
  
  //#endregion

  //#region Constructor

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog ) {
    this.startDate = data.startDate;
    this.endDate = data.endDate;
    this.entityWorkerMembers = data.entityWorkerMembers;
    this.entityShifts = data.entityShifts;
    this.entityRules = data.entityRules;
  }

  //#endregion

  //#region Methods

  //#region On Create

  onCreate() {

    if(!this.isFilterable){
      this.clearSelections();
    }

    let enterAnimationDuration = '5000';
    let exitAnimationDuration = '5000';

    let template = this.CREATE_SCHEDULE_WARNING_TEMPLATE;

    let membersWarning = this.selectedEntityWorkerMembers.length === 0 
      ? CREATE_SCHEDULE_ALL_MEMBERS : this.formatMessage(CREATE_SCHEDULE_FILTERED_MEMBERS, {
      0: this.selectedEntityWorkerMembers.length.toString()
    });

    let shiftsWarning = this.selectedEntityShifts.length === 0
      ? CREATE_SCHEDULE_ALL_SHIFTS
      : this.formatMessage(CREATE_SCHEDULE_FILTERED_SHIFTS, {
        0: this.selectedEntityShifts.length.toString()
      });

    let rulesWarning = this.selectedEntityRules.length === 0
      ? CREATE_SCHEDULE_ALL_RULES
      : this.formatMessage(CREATE_SCHEDULE_FILTERED_RULES, {
        0: this.selectedEntityRules.length.toString()
      });

    let content = this.formatMessage(template, {
      0: this.startDate.toLocaleDateString("en-GB").replace(/-/g, "/"),
      1: this.endDate.toLocaleDateString("en-GB").replace(/-/g, "/"),
      2: this.singleRoleResponsibility ? CREATE_SCHEDULE_SINGLE_RESPONSIBILITY : CREATE_SCHEDULE_MULTIPLE_RESPONSIBILITIES,
      3: this.clearExistingSchedule ? CREATE_SCHEDULE_CLEAR_EXISTING : CREATE_SCHEDULE_MERGE_EXISTING,
      4: membersWarning,
      5: shiftsWarning,
      6: rulesWarning
    });


    let dialogRef = this.dialog.open(GenericWarningDialogComponent, {
        width: '500px',
        data: { enterAnimationDuration, exitAnimationDuration, warningTitle: this.CREATE_SCHEDULE_TITLE, warningMessage: content, isDeleteWarning: false }
    });

    dialogRef.afterClosed().subscribe(async result =>{
      if(result){
        let createParameters : CreateEntityScheduleDTO = new CreateEntityScheduleDTO(
          '',
          '',
          this.startDate,
          this.endDate,
          this.singleRoleResponsibility,
          this.clearExistingSchedule,
          this.selectedEntityWorkerMembers,
          this.selectedEntityShifts,
          this.selectedEntityRules
        );

        this.createScheduleOp.emit(new BaseResponseModel(true, "Created", createParameters));
        this.clearSelections();
      }
    });
  }

  //#endregion

  /*
  async openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, title : string, content : string, objectToDelete: any, type: string){
      const dialogRef = this.dialog.open(GenericDeleteWarningDialogComponent, {
        width: '500px',
        data: { enterAnimationDuration, exitAnimationDuration, deleteWarningTitle: title, deleteWarningMessage: content}
      });
  */

  //#region On Close

  onClose() {
    this.clearSelections();
    this.createScheduleOp.emit(new BaseResponseModel(false, "Canceled", null));
  }

  //#endregion

  //#region Clear Selections

  clearSelections(){
    this.selectedEntityWorkerMembers = [];
    this.selectedEntityShifts = [];
    this.selectedEntityRules = []; 

    this.entityWorkerMembers.forEach(element => {
      element.isSelected = false;
    });

    this.entityShifts.forEach(element => {
      element.isSelected = false;
    });

    this.entityRules.forEach(element => {
      element.isSelected = false;
    });
  }

  //#endregion

  //#region Toggle Selection

  toggleSelection(MEMBER_FILTER_TYPE: FilterType, element: any) {
    element.isSelected = !element.isSelected;

    if (MEMBER_FILTER_TYPE === this.MEMBER_FILTER_TYPE) {
      
      if (element.isSelected) {
        this.selectedEntityWorkerMembers.push(element.workerId);
      }
      else{
        const index = this.selectedEntityWorkerMembers.indexOf(element.workerId);
        if (index > -1) {
          this.selectedEntityWorkerMembers.splice(index, 1);
        }
      }
    }
  
    else if (MEMBER_FILTER_TYPE === this.SHIFT_FILTER_TYPE) {
      
      if (element.isSelected) {
        this.selectedEntityShifts.push(element.shiftId);
      }
      else{
        const index = this.selectedEntityShifts.indexOf(element.shiftId);
        if (index > -1) {
          this.selectedEntityShifts.splice(index, 1);
        }
      }
    }

    else if (MEMBER_FILTER_TYPE === this.RULE_FILTER_TYPE) {
      if (element.isSelected) {
        this.selectedEntityRules.push(element.entityRuleId);
      }
      else{
        const index = this.selectedEntityRules.indexOf(element.entityRuleId);
        if (index > -1) {
          this.selectedEntityRules.splice(index, 1);
        }
      }
    }
  }

  //#endregion

  //#region Master Toggle

  masterToggle(MEMBER_FILTER_TYPE: FilterType) {

    if (MEMBER_FILTER_TYPE === this.MEMBER_FILTER_TYPE) {
      this.isMembersAllSelected = !this.isMembersAllSelected;
      this.entityWorkerMembers.forEach((item: EntityWorkerMemberDTO) => {
        item.isSelected = this.isMembersAllSelected;
      });
      this.selectedEntityWorkerMembers = this.isMembersAllSelected ? this.entityWorkerMembers.map(item => item.workerId) : [];
    }

    else if (MEMBER_FILTER_TYPE === this.SHIFT_FILTER_TYPE) {
      this.isShiftsAllSelected = !this.isShiftsAllSelected;
      this.entityShifts.forEach((item: ShiftDTO) => {
        item.isSelected = this.isShiftsAllSelected;
      });
      this.selectedEntityShifts = this.isShiftsAllSelected ? this.entityShifts.map(item => item.shiftId) : [];
    }

    else if (MEMBER_FILTER_TYPE === this.RULE_FILTER_TYPE) {
      this.isRulesAllSelected = !this.isRulesAllSelected;
      this.entityRules.forEach((item: EntityRuleDTO) => {
        item.isSelected = this.isRulesAllSelected;
      });
      this.selectedEntityRules = this.isRulesAllSelected ? this.entityRules.map(item => item.entityRuleId) : [];
    }
  }

  //#endregion

  //#region On Start Date Change

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    let input = event.value;
    input = input ? new Date(Date.UTC(input.getFullYear(), input.getMonth(), input.getDate())) : new Date();
    this.startDate = input;
  }

  //#endregion

  //#region On End Date Change

  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    let input = event.value;
    input = input ? new Date(Date.UTC(input.getFullYear(), input.getMonth(), input.getDate())) : new Date();
    this.endDate = input;
  }

  //#endregion

  //#region AUX : Format Message

  private formatMessage(template: string, params: Record<string, any>): string {
    let message = template;
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        message = message.replace(`{${key}}`, params[key]);
      }
    }
    return message;
  }

  //#endregion

  //#endregion

}


