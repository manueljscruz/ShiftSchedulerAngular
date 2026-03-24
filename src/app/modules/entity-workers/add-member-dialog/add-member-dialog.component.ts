import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { ADD_ICON, ADD_MEMBER_ICON, ADD_NPC_MEMBER_ICON, EMAIL_ICON } from '../../../shared/constants/IconNamesConstants';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SkillDTO } from '../../../shared/models/DTOs/Incoming/SkillDTO';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import { AddNewMemberDTO } from '../../../shared/models/DTOs/Outgoing/AddNewMemberDTO';
import { LanguageServiceService } from '../../../core/services/language-service.service';
import { EntityService } from '../../../core/services/api/EntityService';
import { ShiftDTO } from '../../../shared/models/DTOs/Incoming/ShiftDTO';
import { EntityPermissionRoleDTO } from '../../../shared/models/DTOs/Incoming/EntityPermissionRoleDTO';

@Component({
  selector: 'add-member-dialog',
  templateUrl: './add-member-dialog.component.html',
  styleUrl: './add-member-dialog.component.css'
})
export class AddMemberDialogComponent {

  /// Constants
  ADD_MEMBER_ICON: string = ADD_MEMBER_ICON;
  ADD_NPC_MEMBER_ICON: string = ADD_NPC_MEMBER_ICON;
  ADD_ICON: string = ADD_ICON;
  EMAIL_ICON: string = EMAIL_ICON;

  /// <summary>
  /// The index of the selected tab.
  /// 0 - Send email invite
  /// 1 - Create Bot member
  /// </summary>
  selectedTabIndex: number = 0;

  /// <summary>
  /// Whether the user has specified skills for the member.
  /// </summary>
  specifySkills: boolean = false;

  /// <summary>
  /// The list of all skills available to the user.
  /// </summary>
  localizedSkills: SkillDTO[] = [];

  /// <summary>
  /// The list of shifts to be displayed in the dropdown
  /// </summary
  entityShifts: ShiftDTO[] = [];

  /// <summary>
  /// The list of skills that the user has selected.
  /// </summary>
  selectedSkills: SkillDTO[] = [];

  /// <summary>
  /// The text to display on the execute action button.
  /// </summary>
  executeActionText: string = 'Send';

  /// <summary>
  /// The icon to display on the execute action button.
  /// </summary>
  executeActionIcon: string = EMAIL_ICON;

  /// <summary>
  /// The email input used for the invite
  /// </summary>
  emailInput: string = '';

  /// <summary>
  /// The member name input used for creating a new member.
  /// </summary>
  memberNameInput: string = '';

  /// <summary>
  /// The current entity id.
  /// </summary>
  currentEntityId: string = '';

  /// <summary>
  /// Whether the user is part of the shift rotation.
  /// </summary>
  partOfRotation: boolean = false;

  worksWeekDays: boolean = false;

  worksWeekends: boolean = false;

  multipleShifts: boolean = false;

  /// <summary>
  /// The list of selected shifts
  /// </summary>
  selectedShifts: ShiftDTO[] = [];

  /// <summary>
  /// Role for the invited human member (invite tab only)
  /// </summary>
  entityPermissionRoleId: number = 3; // Default: Viewer

  roleOptions: EntityPermissionRoleDTO[] = [];

  /// <summary>
  /// Event emitter for when a member is added or invited.
  /// </summary>
  @Output() onMemberAdded: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private entityService: EntityService,
  private snackbarManagerService: SnackbarManagerService,
  private loadingScreenService: LoadingSpinnerManagerService,
  private languageService: LanguageServiceService) {
    this.localizedSkills = data.skillList;
    this.currentEntityId = data.currentEntityId;
    this.entityShifts = data.shiftList;
    this.roleOptions = data.rolesList ?? [];
  }

  ngOnInit() {
  }

  /// <summary>
  /// Handles when a tab is changed.
  /// </summary>
  tabChanged($event: MatTabChangeEvent) {
    this.selectedTabIndex = $event.index;

    this.selectedTabIndex === 0 ? this.executeActionText = 'Send' : this.executeActionText = 'Create';
    this.selectedTabIndex === 0 ? this.executeActionIcon = EMAIL_ICON : this.executeActionIcon = ADD_ICON;
  }

  /// <summary>
  /// Toggles the specify skills flag.
  /// </summary>
  toggleSpecifySkills($event: MatCheckboxChange) {
    this.specifySkills = $event.checked;
  }

  compareSkills(skill1: SkillDTO, skill2: SkillDTO): boolean {
    return skill1 && skill2 ? skill1.skillId === skill2.skillId : skill1 === skill2;
  }

  //#region Compare Shifts

  compareShifts(shift1: ShiftDTO, shift2: ShiftDTO): boolean {
    return shift1 && shift2 ? shift1.shiftId === shift2.shiftId : shift1 === shift2;
  }

  //#endregion

  //#region Execute Action

  /// <summary>
  /// Creates or send an invite to a new member.
  /// </summary>
  async executeAction() {
    let validationResult = this.validateSubmissions();
    if(!validationResult.success){
      this.snackbarManagerService.showFailSnackbar( new SnackbarUIModel(5, validationResult.message));
      return;
    }
    else{
      
      this.loadingScreenService.changeLoadingState(true);
      // Send the new member to the server
      if(this.selectedSkills.length === 0){
        this.selectedSkills.push(this.localizedSkills[0]);
      }


      let newMember : AddNewMemberDTO = this.selectedTabIndex === 1
        ? new AddNewMemberDTO(true, this.currentEntityId, this.memberNameInput, '', this.selectedSkills, this.worksWeekDays, this.worksWeekends, this.multipleShifts, this.selectedShifts, this.partOfRotation)
        : new AddNewMemberDTO(false, this.currentEntityId, '', this.emailInput, this.selectedSkills, this.worksWeekDays, this.worksWeekends, this.multipleShifts, this.selectedShifts, this.partOfRotation, this.entityPermissionRoleId);

      let apiResponse = await this.entityService.addNewEntityMember(newMember);

      if(apiResponse.success){
        this.onMemberAdded.emit(apiResponse);
      }
      else{
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }


      this.loadingScreenService.changeLoadingState(false);
    }
  }

  //#endregion

  //#region On Rotation Change

  onRotationChange($event: MatCheckboxChange) {
    if($event.checked){
      this.worksWeekDays = false;
      this.worksWeekends = false;
    }
  }

  //#endregion

  //#region Validate Submissions

  /// <summary>
  /// Validates the submissions for the dialog.
  /// </summary>
  validateSubmissions() : BaseResponseModel {
    let emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    let response = new BaseResponseModel(false, '', null);

    // Send Email Invite Tab
    if (this.selectedTabIndex === 0) {
      if (this.emailInput === '') {
        response.message = 'Please enter an email address.';
        return response;
      }

      else if(!emailRegex.test(this.emailInput)){
        response.message = 'Invalid Email address';
        return response;
      }
    } 

    // Create Bot Member Tab
    else {
      if(this.memberNameInput.trim().length === 0){
        response.message = `Name is required`;
        return response;
      }
    }

    // Check if the user has specified skills assigned
    if(this.specifySkills && this.selectedSkills.length === 0) {
      response.message = 'Please select at least one skill.';
      return response;
    }

    // Check if the user has specified shifts assigned
    if(!this.partOfRotation && this.selectedShifts.length === 0) {
      response.message = 'Please select at least one shift.';
      return response;
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
}
