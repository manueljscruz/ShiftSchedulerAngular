import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { EntityWorkerMemberDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';
import { ShiftDTO } from '../../../shared/models/DTOs/Incoming/ShiftDTO';
import { EntityRuleDTO } from '../../../shared/models/DTOs/Incoming/EntityRuleDTO';
import { CreateEntityScheduleDTO } from '../../../shared/models/DTOs/Outgoing/CreateEntityScheduleDTO';

@Component({
  selector: 'schedule-creator-menu',
  templateUrl: './schedule-creator-menu.component.html',
  styleUrl: './schedule-creator-menu.component.css'
})

export class ScheduleCreatorMenuComponent {


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

  selectedTabIndex: number = 0;

  @Output() createScheduleOp = new EventEmitter<BaseResponseModel>();
  
  //#endregion

  //#region Constructor

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.startDate = new Date(data.startDate);
    this.endDate = new Date(data.endDate);
    this.entityWorkerMembers = data.entityWorkerMembers;
    this.entityShifts = data.entityShifts;
    this.entityRules = data.entityRules;
  }

  //#endregion

  //#region Methods

  //#region On Create

  onCreate() {

    let createParameters : CreateEntityScheduleDTO = new CreateEntityScheduleDTO(
      '',
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
  }

  //#endregion

  //#region On Close

  onClose() {
    this.createScheduleOp.emit(new BaseResponseModel(false, "Canceled", null));
  }

  //#endregion

  toggleSelection(_t34: any) {
  throw new Error('Method not implemented.');
  }
  isSomeSelected(): unknown {
  throw new Error('Method not implemented.');
  }
  isAllSelected(): unknown {
  throw new Error('Method not implemented.');
  }
  masterToggle() {
  throw new Error('Method not implemented.');
  }

  //#endregion

}


