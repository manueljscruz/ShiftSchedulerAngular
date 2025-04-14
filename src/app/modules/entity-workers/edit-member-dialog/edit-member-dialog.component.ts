import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { EntityWorkerDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerDTO';
import { EntityWorkerMemberDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';
import { SkillDTO } from '../../../shared/models/DTOs/Incoming/SkillDTO';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SAVE_ICON } from '../../../shared/constants/IconNamesConstants';
import { FormControl, Validators } from '@angular/forms';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import { EditMemberDTO } from '../../../shared/models/DTOs/Outgoing/EditMemberDTO';
import { EntityService } from '../../../core/services/api/EntityService';
import { ShiftDTO } from '../../../shared/models/DTOs/Incoming/ShiftDTO';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-member-dialog',
  templateUrl: './edit-member-dialog.component.html',
  styleUrl: './edit-member-dialog.component.css'
})
export class EditMemberDialogComponent {

  //#region Properties

  /// <summary>
  /// The entity worker member to be edited
  /// </summary
  entityWorkerMember: EntityWorkerMemberDTO = new EntityWorkerMemberDTO('', '', false, false, false, [], false, false, false, []);

  /// <summary>
  /// The current entity identifier
  /// </summary
  currentEntityId: string = '';

  /// <summary>
  /// The name input of the worker
  /// </summary
  nameInput : string = '';

  /// <summary>
  /// Determines if the name field is readonly
  /// </summary
  nameReadonly: boolean = false;

  /// <summary>
  /// The list of skills to be displayed in the dropdown
  /// </summary
  localizedSkills : SkillDTO[] = [];

  /// <summary>
  /// The list of shifts to be displayed in the dropdown
  /// </summary
  entityShifts: ShiftDTO[] = [];

  /// <summary>
  /// The list of selected skills
  /// </summary
  selectedSkills: SkillDTO[] = [];

  /// <summary>
  /// The list of selected shifts
  
  selectedShifts: ShiftDTO[] = [];

  /// <summary>
  /// Flag to determine if the user/bot is part of the shift rotation
  /// </summary
  partOfRotation: boolean = false;

  worksWeekDays: boolean = false;

  worksWeekends: boolean = false;

  /// <summary>
  /// The text to display on the execute action button.
  /// </summary>
  executeActionText: string = 'Save';

  /// <summary>
  /// The icon to display on the execute action button.
  /// </summary>
  executeActionIcon: string = SAVE_ICON;

  skillSelector = new FormControl<SkillDTO[]>([], Validators.required);

  @Output() onMemberEdited: EventEmitter<any> = new EventEmitter<any>();

  //#endregion

  //#region Contructor

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private entityService: EntityService,
  private loadingScreenService: LoadingSpinnerManagerService,
  private snackbarManagerService: SnackbarManagerService) { }

  //#endregion

  //#region Methods

  //#region On Init

  ngOnInit(): void {
    
    this.entityWorkerMember = this.data.editWorker;
    this.localizedSkills = this.data.skillList;
    this.currentEntityId = this.data.currentEntityId;
    this.entityShifts = this.data.shiftsList;

    this.nameInput = this.entityWorkerMember.workerName;

    if(this.entityWorkerMember.isBot)
      this.nameReadonly = false;
    else
      this.nameReadonly = true;

    this.partOfRotation = this.entityWorkerMember.partOfRotation;
    this.worksWeekDays = this.entityWorkerMember.worksWeekDays;
    this.worksWeekends = this.entityWorkerMember.worksWeekends;

    this.selectedSkills = this.entityWorkerMember.skillSet != undefined ? [...this.entityWorkerMember.skillSet] : [];
    this.selectedShifts = this.entityWorkerMember.assignedShifts != undefined ? [...this.entityWorkerMember.assignedShifts] : [];
  }

  //#endregion

  //#region Compare Skills

  compareSkills(skill1: SkillDTO, skill2: SkillDTO): boolean {
    return skill1 && skill2 ? skill1.skillId === skill2.skillId : skill1 === skill2;
  }

  //#endregion

  //#region Compare Shifts

  compareShifts(shift1: ShiftDTO, shift2: ShiftDTO): boolean {
    return shift1 && shift2 ? shift1.shiftId === shift2.shiftId : shift1 === shift2;
  }

  //#endregion

  //#region Edit Member

  async editMember() {
    let validationResult = this.validateSubmissions();

    if(!validationResult.success){
      this.snackbarManagerService.showFailSnackbar( new SnackbarUIModel(5, validationResult.message));
      return;
    }
    else{
      this.loadingScreenService.changeLoadingState(true);

      let editWorkerDTO = new EditMemberDTO(this.entityWorkerMember.workerId, this.currentEntityId, this.entityWorkerMember.isBot, this.nameInput, this.selectedSkills, this.partOfRotation, this.worksWeekDays, this.worksWeekends, this.selectedShifts);
      
      let apiResponse = await this.entityService.updateEntityMember(editWorkerDTO);

      this.loadingScreenService.changeLoadingState(false);

      if(apiResponse.success){
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Member successfully updated.'));
        this.entityWorkerMember.workerName = this.nameInput;
        this.entityWorkerMember.skillSet = this.selectedSkills;
        this.entityWorkerMember.partOfRotation = this.partOfRotation;
        this.entityWorkerMember.assignedShifts = this.selectedShifts;
        this.onMemberEdited.emit(this.entityWorkerMember);
      }
      else{
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }
    }
  }

  //#endregion

  //#region On Rotation Change
  
    onRotationChange($event: MatCheckboxChange) {
      if($event.checked){
        this.worksWeekDays = false;
        this.worksWeekends = false;
        this.selectedShifts = [];
      }
    }
  
    //#endregion

  //#region Validate Submissions

  private validateSubmissions() : BaseResponseModel{
    let response = new BaseResponseModel(false, '', null);

    if(this.nameInput.trim().length === 0){
      response.message = `Name is required`;
      return response;
    }

    if(this.selectedSkills.length === 0){
      response.message = 'Please select at least one skill.';
      return response;
    }

    if(!this.partOfRotation && this.selectedShifts.length === 0){
      response.message = 'Please select at least one shift.';
    }

    // If not part of the rotation, check if the user has selected at least one of the two options
    if(!this.partOfRotation && !this.worksWeekDays && !this.worksWeekends) {
      response.message = 'Please select at least one of the two options.';
      return response;
    }

    response.success = true;
    return response;
  }


  //#endregion

  //#endregion

}
