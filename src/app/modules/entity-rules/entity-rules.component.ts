import { Component, ViewChild } from '@angular/core';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { EntityRuleViewModel } from '../../shared/models/VM/EntityRuleViewModel';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RuleService } from '../../core/services/api/RuleService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { BaseViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { DELETE_RULE_CONTENT, DELETE_RULE_SPEC_CONTENT, DELETE_RULE_SPEC_TITLE, DELETE_RULE_TITLE, NA } from '../../shared/constants/UITextConstants';
import { GenericDeleteWarningDialogComponent } from '../../shared/components/generic-delete-warning-dialog/generic-delete-warning-dialog.component';
import { EntityRuleDTO } from '../../shared/models/DTOs/Incoming/EntityRuleDTO';
import { EntityRuleSpecificationDTO } from '../../shared/models/DTOs/Incoming/EntityRuleSpecificationDTO';
import { RuleTypeLocalizedDTO } from '../../shared/models/DTOs/Incoming/RuleTypeLocalizedDTO';
import { Entity } from '../../shared/models/database/entity';
import { BusinessAspectLocalizedDTO } from '../../shared/models/DTOs/Incoming/BusinessAspectLocalizedDTO';
import { ShiftDTO } from '../../shared/models/DTOs/Incoming/ShiftDTO';
import { SkillDTO } from '../../shared/models/DTOs/Incoming/SkillDTO';
import { EntityService } from '../../core/services/api/EntityService';
import { ShiftService } from '../../core/services/api/ShiftService';
import { MatSelectChange } from '@angular/material/select';
import { BUSINESS_ASPECT_SHIFTS_ID, BUSINESS_ASPECT_SKILLS_ID } from '../../shared/constants/DataConstants';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { MatTab } from '@angular/material/tabs';
import { MatTable } from '@angular/material/table';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { AddEntityRuleDTO } from '../../shared/models/DTOs/Outgoing/AddEntityRuleDTO';
import { AddEntityRuleSpecificationDTO } from '../../shared/models/DTOs/Outgoing/AddEntityRuleSpecificationDTO';
import e from 'express';
import { RuleValidatorService } from '../../core/services/rule-validator.service';
import { SingleIdentifierDTO } from '../../shared/models/DTOs/Outgoing/SingleIdentifierDTO';

@Component({
  selector: 'entity-rules',
  templateUrl: './entity-rules.component.html',
  styleUrl: './entity-rules.component.css'
})
export class EntityRulesComponent {
  DELETE_RULE_TITLE = DELETE_RULE_TITLE;
  DELETE_RULE_CONTENT = DELETE_RULE_CONTENT;
  DELETE_RULE_SPEC_TITLE = DELETE_RULE_SPEC_TITLE;
  DELETE_RULE_SPEC_CONTENT = DELETE_RULE_SPEC_CONTENT;

  /// <summary>
  /// Logged user object
  /// </summary>
  public loggedUser: UserDTO = new UserDTO();
  
  /// <summary>
  /// Current entity id
  /// </summary>
  private currentEntityId: string = '';

  /// <summary>
  /// Flag to determine if the current user is the owner of the entity
  /// </summary>
  isCurrentUserEntityOwner : boolean = false;

  /// <summary>
  /// Flag to determine if the form is active
  /// </summary>
  isFormActive : boolean = false;

  /// <summary>
  /// Signaling if the user is editing the rule
  /// </summary>
  public isEditingRule: boolean = false;

  /// <summary>
  /// View model for the entity rules
  /// </summary>
  rulesViewModel: EntityRuleViewModel = new EntityRuleViewModel([], false, [], []);

  /// <summary>
  /// Selected rule object
  /// </summary>
  selectedRule: EntityRuleDTO = EntityRuleDTO.newEntityRuleDTO();

  /// <summary>
  /// Selected rule specification object
  /// </summary>
  selectedRuleSpecs: EntityRuleSpecificationDTO[] = [];

  /// <summary>
  /// Selected rule type object
  /// </summary>
  selectedRuleType?: RuleTypeLocalizedDTO;

  /// <summary>
  /// Stores the previous rule type object
  previousSelectedRuleType?: RuleTypeLocalizedDTO;

  /// <summary>
  /// List of entity shifts
  /// </summary>
  entityShifts : ShiftDTO[] = [];

  /// <summary>
  /// Selected shift object
  /// </summary>
  selectedShift?: ShiftDTO;

  /// <summary>
  /// List of entity skills
  /// </summary>
  entitySkills : SkillDTO[] = [];

  /// <summary>
  /// Selected skill object
  /// </summary>
  selectedSkill?: SkillDTO;

  /// <summary>
  /// Rule specification value
  /// </summary>
  specificationValue: number = 0;

  /// <summary>
  /// Rule specification boolean value 
  /// </summary>
  boolSpecValue: boolean = false;

  /// <summary>
  /// Flag that shows the rule spec value input
  /// </summary>
  visibleSpecValueInput : boolean = false;

  /// <summary>
  /// Flag that shows the skill select
  /// </summary>
  visibleSkillSelect : boolean = false;

  /// <summary>
  /// Flag that shows the shift select
  /// </summary>
  visibleShiftSelect : boolean = false;

  /// <summary>
  /// Flag that shows the rule spec form
  /// </summary>
  isRuleSpecFormVisible: boolean = false;

  /// <summary>
  /// Flag that says that rule spec is being edited
  /// </summary>
  isRuleSpecEditing: boolean = false;

  /// <summary>
  /// Selected rule spec object for editing
  /// </summary>
  selectedRuleSpec? : EntityRuleSpecificationDTO;

  /// <summary>
  /// Rule Table reference
  /// </summary>
  @ViewChild(MatTable) ruleTable!: MatTable<EntityRuleDTO>;

  /// <summary>
  /// Rule Specification Table reference
  /// </summary>
  @ViewChild(MatTable) ruleSpecTable!: MatTable<EntityRuleSpecificationDTO>;

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private ruleService: RuleService,
    private entityService: EntityService,
    private shiftService: ShiftService,
    private ruleValidatorService: RuleValidatorService
  ) {
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
  }

  //#region Methods

  //#region On Init

  async ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

    // Turn on the loading spinner
    this.loadingScreenService.changeLoadingState(true);

    let entityRuleViewModelRequestDTO = new BaseViewModelRequestDTO(this.currentEntityId, this.loggedUser.userId, '');
    this.rulesViewModel = await this.ruleService.getRuleViewModel(entityRuleViewModelRequestDTO);
    this.isCurrentUserEntityOwner = this.rulesViewModel.allowEdit;

    let singleIdentifierDto = new SingleIdentifierDTO(this.currentEntityId);
    this.entityShifts = await this.shiftService.getEntityShifts(singleIdentifierDto);
    let baseVMRequest = new BaseViewModelRequestDTO(this.currentEntityId, this.loggedUser.userId, '');
    this.entitySkills = await this.entityService.getEntitySkills(baseVMRequest);

    // Turn off the loading spinner
    this.loadingScreenService.changeLoadingState(false);
  }

  //#endregion

  //#region Toggle Form

  toggleForm(newValue : boolean) {
    this.isFormActive = newValue;

    if(this.isFormActive === false){
      this.selectedRule = EntityRuleDTO.newEntityRuleDTO();
      this.selectedRuleSpecs = [];
      this.selectedRuleType = undefined;
      this.previousSelectedRuleType = undefined;
      this.isEditingRule = false;
      this.isRuleSpecEditing = false;
      this.clearSpecForm();
      this.toggleSpecUIElements(0);
    }

    if(this.isEditingRule === false){
      this.isRuleSpecFormVisible = true;
    }
  }

  //#endregion

  //#region Edit Rule

  editRule(rule: EntityRuleDTO) {
    this.toggleForm(true);
    this.isEditingRule = true;

    this.selectedRule = rule;
    
    if(this.rulesViewModel.ruleTypeLocalizeds.length > 0) {
      this.selectedRuleType = this.rulesViewModel.ruleTypeLocalizeds.find(x => x.ruleTypeId === rule.ruleTypeId);
      this.previousSelectedRuleType = this.selectedRuleType;
    }

    this.selectedRuleSpecs = rule.entityRuleSpecificationDTOs;

    if(this.selectedRuleType?.multipleSpecification === false && this.selectedRuleSpecs.length > 0) {
      this.isRuleSpecFormVisible = false;
    }
    else {
      this.isRuleSpecFormVisible = true;
      this.toggleSpecUIElements(this.selectedRuleType?.ruleTypeId || 0);
    }
  }

  //#endregion

  //#region On Rule Type Change

  /// <summary>
  /// Method that handles the change of the rule type
  /// Hides or Shows UI Elements based on the selected rule type
  /// </summary>
  onRuleTypeChange($event: MatSelectChange) {
    console.log($event);
    if(this.previousSelectedRuleType === undefined)
      this.previousSelectedRuleType = this.selectedRuleType;

    // Check if the previous selected rule type is different from the current one
    if(this.previousSelectedRuleType !== undefined && this.previousSelectedRuleType.ruleTypeId !== $event.value.ruleTypeId && this.selectedRuleSpecs.length > 0){
      let enterAnimationDuration = '5000';
      let exitAnimationDuration = '5000';

      const dialogRef = this.dialog.open(GenericDeleteWarningDialogComponent, {
        width: '500px',
        data: { enterAnimationDuration, exitAnimationDuration, deleteWarningTitle: 'Warning', deleteWarningMessage: 'Changing the rule type will delete all the rule specifications. Are you sure you want to proceed?'}
      });

      dialogRef.afterClosed().subscribe(async result =>{
        if(result){
          if(this.selectedRule.entityRuleId != ''){
            this.loadingScreenService.changeLoadingState(true);

            let apiResponse = await this.ruleService.deleteRuleSpecifications(this.selectedRule.entityRuleId);

            this.loadingScreenService.changeLoadingState(false);

            if(apiResponse.success){
              this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));
              this.selectedRuleSpecs = [];
              this.ruleSpecTable.renderRows();
              this.toggleSpecUIElements($event.value.ruleTypeId);
            }
            else{
              this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
            }
          }
          else{
            this.selectedRuleSpecs = [];
            this.ruleSpecTable.renderRows();
            this.toggleSpecUIElements($event.value.ruleTypeId);
          }
        }
        else{
          this.selectedRuleType = this.previousSelectedRuleType;
        }
      });
    }
    else{
      this.toggleSpecUIElements($event.value.ruleTypeId);
    }
  }

  //#endregion

  //#region Open Delete Dialog

  /// <summary>
  /// Method that opens a dialog to confirm the deletion of a rule or rule spec
  /// </summary>
  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, title : string, content : string, objectToDelete: any, type: string) {
    const dialogRef = this.dialog.open(GenericDeleteWarningDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, deleteWarningTitle: title, deleteWarningMessage: content}
    });

    dialogRef.afterClosed().subscribe(async result =>{
      if(result){
        if(type === 'RuleDTO'){
          await this.deleteRule(objectToDelete);
        }
        
        else if(type === 'RuleSpecDTO'){
          await this.deleteRuleSpec(objectToDelete);
        }
      };
    });
  }

  //#endregion

  //#region Save Rule

  async saveRule() {

    // Validate the rule submission
    let validationResponse = this.validateRule();

    // If not successful, show a fail snackbar and return
    if(!validationResponse.success){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResponse.message));
      return;
    }

    if(this.isEditingRule){
      let ruleIndex = this.rulesViewModel.entityRules.indexOf(this.selectedRule);

      this.selectedRule.entityRuleSpecificationDTOs = this.selectedRuleSpecs;

      this.selectedRule.entityRuleSpecificationDTOs.forEach((specification : EntityRuleSpecificationDTO) => {
        specification.referenceName = specification.referenceName || '';
        specification.referenceName2 = specification.referenceName2 || '';
        specification.aspectReferenceId = specification.aspectReferenceId || '';
        specification.aspectReferenceId2 = specification.aspectReferenceId2 || '';
        specification.businessAspectId = specification.businessAspectId || 0;
        specification.businessAspectId2 = specification.businessAspectId2 || 0;
      });

      this.loadingScreenService.changeLoadingState(true);

      let response : BaseResponseModel = await this.ruleService.updateEntityRule(this.selectedRule);

      this.loadingScreenService.changeLoadingState(false);

      if(response.success){
        //response.result.ruleTypeDisplayValue = this.rulesViewModel.ruleTypeLocalizeds.find(x => x.ruleTypeId === response.result.ruleTypeId)?.ruleTypeLocalizedName || '';
        // this.selectedRule = response.result;
        // this.rulesViewModel.entityRules[ruleIndex] = response.result;
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, response.message));
        this.isFormActive = false;
        this.clearSpecForm();
        this.ruleTable.renderRows();
      }
      else{
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
      }
    }
    // if the user is adding a new rule
    else{
      // Foreach selected rule specification, create a new AddEntityRuleSpecificationDTO object
      let newRuleSpecs : AddEntityRuleSpecificationDTO[] = []; 
      this.selectedRuleSpecs.forEach(ruleSpec => {
        let newRuleSpec = new AddEntityRuleSpecificationDTO('', 0, ruleSpec.ruleSpecificationValue, ruleSpec.aspectReferenceId, ruleSpec.referenceName, ruleSpec.businessAspectId, ruleSpec.aspectReferenceId2, ruleSpec.referenceName2, ruleSpec.businessAspectId2, '');
        newRuleSpecs.push(newRuleSpec);
      });

      // Create a new AddEntityRuleDTO object with specification rules
      let newEntityRule = new AddEntityRuleDTO(this.selectedRuleType?.ruleTypeId || 0, this.selectedRule.ruleTypeDescription, this.currentEntityId, newRuleSpecs);

      this.loadingScreenService.changeLoadingState(true);

      let response : BaseResponseModel = await this.ruleService.addRule(newEntityRule);

      this.loadingScreenService.changeLoadingState(false);

      // If the response is successful, add the rule to the entity rules array and render the table rows
      if(response.success){
        response.result.ruleTypeDisplayValue = this.rulesViewModel.ruleTypeLocalizeds.find(x => x.ruleTypeId === response.result.ruleTypeId)?.ruleTypeLocalizedName || '';
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, response.message));
        this.isFormActive = false;
        this.rulesViewModel.entityRules.push(response.result);
        this.ruleTable.renderRows();
      }
      else{
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
      }
    }
  }

  //#endregion

  //#region Validate Rule

  /// <summary>
  /// Method that validates the rule submission
  /// </summary>
  validateRule() : BaseResponseModel {
    let response = new BaseResponseModel(false, '', null);
  
    if(this.selectedRuleType === undefined) {
      response.message = 'Rule type is required';
      return response;
    }
  
    else if(this.selectedRuleSpecs.length === 0) {
      response.message = 'Rule specification is required';
      return response;
    }

    else if(this.selectedRuleType.multipleSpecification === false && this.selectedRuleSpecs.length > 1) {
      response.message = 'This rule type only allows one specification';
      return response;
    }
  
    // if selected rule type is Max Hour per Shift
    else if(this.selectedRuleType.ruleTypeId === 1) {

      // Check if the Max Hour per Day rule already exists
      let checkMaxHourRuleExistenceResponse = this.ruleValidatorService.validateMaxHourPerDay(this.rulesViewModel.entityRules, this.selectedRule, this.isEditingRule)
    
      if(checkMaxHourRuleExistenceResponse.success === false) 
        return checkMaxHourRuleExistenceResponse; 
    }

    response.success = true;
  
    return response;
  }

  //#endregion

  //#region Validate Rule Spec

  validateRuleSpec(ruleSpecs : EntityRuleSpecificationDTO[], ruleSpecInstance : EntityRuleSpecificationDTO, isEditOp : boolean) : BaseResponseModel {
    let response = new BaseResponseModel(false, '', null);

    switch(this.selectedRuleType?.ruleTypeId) {
      case 5:
        response = this.ruleValidatorService.validateSkillPerShift(ruleSpecs, ruleSpecInstance, isEditOp);
        break;

      case 6:
      case 10:
      case 11:
        response = this.ruleValidatorService.validateSkillQuantityPerShift(ruleSpecs, ruleSpecInstance, isEditOp);
        break;

      default:
        response.success = true;
        break;
    }

    return response;
  }

  //#endregion

  //#region Delete Rule

  async deleteRule(objectToDelete: EntityRuleDTO) {
    if(objectToDelete.entityRuleId != ''){

      this.loadingScreenService.changeLoadingState(true);

      let apiResponse = await this.ruleService.deleteRule(this.currentEntityId, objectToDelete.entityRuleId);

      this.loadingScreenService.changeLoadingState(false);

      if(apiResponse.success){
        await this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));
        let index = this.rulesViewModel.entityRules.indexOf(objectToDelete);
        this.rulesViewModel.entityRules.splice(index, 1);
        this.ruleTable.renderRows();
      }
      else{
        await this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }
    }
    else{
      await this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'This rule is cannot be deleted without the required data'));
    }
  }

  //#endregion

  //#region Add Rule Specification

  async addRuleSpec() {
    let ruleSpecDTO = new EntityRuleSpecificationDTO('', 0, 0, '', '', 0, '', '', '', 0, '', '');

    // Apply different logic based on the selected rule type
    switch(this.selectedRuleType?.ruleTypeId) {
      case 1:
      case 2:
        ruleSpecDTO.ruleSpecificationValue = this.specificationValue;
        ruleSpecDTO.referenceName = NA;
        ruleSpecDTO.referenceName2 = NA;
        break;

      case 3:
      case 4:
      case 8:
        if(this.selectedRuleType.isSpecValuesBoolean)
          ruleSpecDTO.ruleSpecificationValue = this.boolSpecValue ? 1 : 0;
        else
          ruleSpecDTO.ruleSpecificationValue = this.specificationValue;
        ruleSpecDTO.aspectReferenceId = this.selectedShift?.shiftId || '';
        ruleSpecDTO.referenceName = this.selectedShift?.shiftName || '';
        ruleSpecDTO.businessAspectDisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SHIFTS_ID)?.businessAspectLocalizedName || '';
        ruleSpecDTO.referenceName2 = NA;
        break;
      
      case 5:
        ruleSpecDTO.aspectReferenceId = this.selectedSkill?.skillId.toString() || '';
        ruleSpecDTO.referenceName = this.selectedSkill?.skillLocalizedName || '';
        ruleSpecDTO.businessAspectId = BUSINESS_ASPECT_SKILLS_ID;
        ruleSpecDTO.businessAspectDisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SKILLS_ID)?.businessAspectLocalizedName || '';
        ruleSpecDTO.aspectReferenceId2 = this.selectedShift?.shiftId || '';
        ruleSpecDTO.referenceName2 = this.selectedShift?.shiftName || '';
        ruleSpecDTO.businessAspectId2 = BUSINESS_ASPECT_SHIFTS_ID;
        ruleSpecDTO.businessAspect2DisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SHIFTS_ID)?.businessAspectLocalizedName || '';
        break;

      case 6:
      case 10:
      case 11:
        ruleSpecDTO.aspectReferenceId = this.selectedSkill?.skillId.toString() || '';
        ruleSpecDTO.referenceName = this.selectedSkill?.skillLocalizedName || '';
        ruleSpecDTO.businessAspectId = BUSINESS_ASPECT_SKILLS_ID;
        ruleSpecDTO.businessAspectDisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SKILLS_ID)?.businessAspectLocalizedName || '';
        ruleSpecDTO.aspectReferenceId2 = this.selectedShift?.shiftId || '';
        ruleSpecDTO.referenceName2 = this.selectedShift?.shiftName || '';
        ruleSpecDTO.businessAspectId2 = BUSINESS_ASPECT_SHIFTS_ID;
        ruleSpecDTO.businessAspect2DisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SHIFTS_ID)?.businessAspectLocalizedName || '';
        ruleSpecDTO.ruleSpecificationValue = this.specificationValue;
        break;

      case 7:
      case 9:
        ruleSpecDTO.aspectReferenceId = this.selectedShift?.shiftId || '';
        ruleSpecDTO.referenceName = this.selectedShift?.shiftName || '';
        ruleSpecDTO.businessAspectId = BUSINESS_ASPECT_SHIFTS_ID;
        ruleSpecDTO.businessAspectDisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SHIFTS_ID)?.businessAspectLocalizedName || '';
        ruleSpecDTO.ruleSpecificationValue = this.specificationValue;
        ruleSpecDTO.referenceName2 = NA;
        break;

      default:
        return;
    }

    let validationResponse = this.validateRuleSpec(this.selectedRuleSpecs, ruleSpecDTO, this.isRuleSpecEditing);

    if(validationResponse.success === false){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResponse.message));
      return;
    }

    // If this rule already exists in the database, add the entityRuleId to the ruleSpecDTO
    if(this.selectedRule.entityRuleId != ''){
      ruleSpecDTO.entityRuleId = this.selectedRule.entityRuleId;

      this.loadingScreenService.changeLoadingState(true);

      // Add the rule specification to the database
      let response : BaseResponseModel = await this.ruleService.addRuleSpecification(ruleSpecDTO);

      this.loadingScreenService.changeLoadingState(false);

      // If the response is successful, add the rule spec to the selectedRuleSpec array and render the table rows
      if(response.success){
        this.selectedRuleSpecs.push(response.result);
        this.ruleSpecTable.renderRows();
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, response.message));
        this.clearSpecForm();
      }
      else{
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
      }
    }
    // If the rule is not in the database, add it to the selectedRuleSpec array
    else{
      this.selectedRuleSpecs.push(ruleSpecDTO);
      this.ruleSpecTable.renderRows();
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'The rule specification has been added successfully'));
      this.clearSpecForm();
    }
  }

  //#endregion

  //#region Clear Spec Form

  clearSpecForm() {
    this.specificationValue = 0;
    this.selectedShift = undefined;
    this.selectedSkill = undefined;
    
    if(this.selectedRuleType?.multipleSpecification === false && this.selectedRuleSpecs.length > 0) {
      this.isRuleSpecFormVisible = false;
    }
    else {
      this.isRuleSpecFormVisible = true;
    }
  }

  //#endregion

  //#region Edit Rule Specification

  editRuleSpec(ruleSpec: EntityRuleSpecificationDTO) {
    this.selectedRuleSpec = ruleSpec;
    this.isRuleSpecEditing = true;
    this.specificationValue = ruleSpec.ruleSpecificationValue;
    this.isRuleSpecFormVisible = true;

    this.toggleSpecUIElements(this.selectedRuleType?.ruleTypeId || 0);

    switch(this.selectedRuleType?.ruleTypeId) {
      case 1:
      case 2:
        this.specificationValue = ruleSpec.ruleSpecificationValue;
        break;

      case 3:
      case 4:
      case 8:
        if(this.selectedRuleType.isSpecValuesBoolean)
          this.boolSpecValue = this.selectedRuleSpec.ruleSpecificationValue == 1 ? true : false;
        else
          this.selectedRuleSpec.ruleSpecificationValue = this.specificationValue;
        this.selectedShift = this.entityShifts.find(x => x.shiftId === ruleSpec.aspectReferenceId);
        break;

      case 5:
      case 6:
      case 10:
      case 11:
        this.selectedSkill = this.entitySkills.find(x => x.skillId.toString() === ruleSpec.aspectReferenceId);
        this.selectedShift = this.entityShifts.find(x => x.shiftId === ruleSpec.aspectReferenceId2);
        break;

      case 7:
      case 9:
        this.selectedShift = this.entityShifts.find(x => x.shiftId === ruleSpec.aspectReferenceId);
        break;

      default:
        break;
    }
  }

  //#endregion

  //#region Save Rule Specification

  async saveRuleSpec() {
    let index = this.selectedRuleSpecs.indexOf(this.selectedRuleSpec? this.selectedRuleSpec : new EntityRuleSpecificationDTO('', 0, 0, '', '', 0, '', '', '', 0, '', ''));

    if(this.selectedRuleSpec != undefined){
      // Apply different logic based on the selected rule type
      switch(this.selectedRuleType?.ruleTypeId) {
        case 1:
        case 2:
          this.selectedRuleSpec.ruleSpecificationValue = this.specificationValue;
          this.selectedRuleSpec.referenceName = NA;
          this.selectedRuleSpec.referenceName2 = NA;
          break;

        case 3:
        case 4:
        case 8:
          if(this.selectedRuleType.isSpecValuesBoolean)
            this.selectedRuleSpec.ruleSpecificationValue = this.boolSpecValue ? 1 : 0;
          else
            this.selectedRuleSpec.ruleSpecificationValue = this.specificationValue;
          this.selectedRuleSpec.aspectReferenceId = this.selectedShift?.shiftId || '';
          this.selectedRuleSpec.referenceName = this.selectedShift?.shiftName || '';
          this.selectedRuleSpec.businessAspectDisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SHIFTS_ID)?.businessAspectLocalizedName || '';
          this.selectedRuleSpec.referenceName2 = NA;
          break;
        
        case 5:
          this.selectedRuleSpec.aspectReferenceId = this.selectedSkill?.skillId.toString() || '';
          this.selectedRuleSpec.referenceName = this.selectedSkill?.skillLocalizedName || '';
          this.selectedRuleSpec.businessAspectId = BUSINESS_ASPECT_SKILLS_ID;
          this.selectedRuleSpec.businessAspectDisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SKILLS_ID)?.businessAspectLocalizedName || '';
          this.selectedRuleSpec.aspectReferenceId2 = this.selectedShift?.shiftId || '';
          this.selectedRuleSpec.referenceName2 = this.selectedShift?.shiftName || '';
          this.selectedRuleSpec.businessAspectId2 = BUSINESS_ASPECT_SHIFTS_ID;
          this.selectedRuleSpec.businessAspect2DisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SHIFTS_ID)?.businessAspectLocalizedName || '';
          break;

        case 6:
        case 10:
        case 11:
          this.selectedRuleSpec.aspectReferenceId = this.selectedSkill?.skillId.toString() || '';
          this.selectedRuleSpec.referenceName = this.selectedSkill?.skillLocalizedName || '';
          this.selectedRuleSpec.businessAspectId = BUSINESS_ASPECT_SKILLS_ID;
          this.selectedRuleSpec.businessAspectDisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SKILLS_ID)?.businessAspectLocalizedName || '';
          this.selectedRuleSpec.aspectReferenceId2 = this.selectedShift?.shiftId || '';
          this.selectedRuleSpec.referenceName2 = this.selectedShift?.shiftName || '';
          this.selectedRuleSpec.businessAspectId2 = BUSINESS_ASPECT_SHIFTS_ID;
          this.selectedRuleSpec.businessAspect2DisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SHIFTS_ID)?.businessAspectLocalizedName || '';
          this.selectedRuleSpec.ruleSpecificationValue = this.specificationValue;
          break;

        case 7:
        case 9:
          this.selectedRuleSpec.aspectReferenceId = this.selectedShift?.shiftId || '';
          this.selectedRuleSpec.referenceName = this.selectedShift?.shiftName || '';
          this.selectedRuleSpec.businessAspectId = BUSINESS_ASPECT_SHIFTS_ID;
          this.selectedRuleSpec.businessAspectDisplayValue = this.rulesViewModel.businessAspectsLocalizeds.find(x => x.businessAspectId === BUSINESS_ASPECT_SHIFTS_ID)?.businessAspectLocalizedName || '';
          this.selectedRuleSpec.ruleSpecificationValue = this.specificationValue;
          this.selectedRuleSpec.referenceName2 = NA;
          break;

        default:
          return;
      }

      let validationResponse = this.validateRuleSpec(this.selectedRuleSpecs, this.selectedRuleSpec, this.isRuleSpecEditing);

      if(validationResponse.success === false){
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResponse.message));
        return;
      }

      // If this rule already exists in the database, add the entityRuleId to the ruleSpecDTO
      if(this.selectedRuleSpec.entityRuleId != ''){
        this.loadingScreenService.changeLoadingState(true);

        // Add the rule specification to the database
        let response : BaseResponseModel = await this.ruleService.updateRuleSpecification(this.selectedRuleSpec);

        this.loadingScreenService.changeLoadingState(false);

        // If the response is successful, add the rule spec to the selectedRuleSpec array and render the table rows
        if(response.success){
          this.ruleSpecTable.renderRows();
          this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, response.message));
          this.clearSpecForm();
          this.isRuleSpecEditing = false;
        }
        else{
          this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
        }
      }
      // If the rule is not in the database, add it to the selectedRuleSpec array
      else{
        this.selectedRuleSpecs[index] = this.selectedRuleSpec;
        this.ruleSpecTable.renderRows();
        this.isRuleSpecEditing = false;
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'The rule specification has been updated successfully'));
        this.clearSpecForm();
      }
    }
  }    

  //#endregion

  //#region Delete Rule Specification

  async deleteRuleSpec(objectToDelete: EntityRuleSpecificationDTO) {
    if(this.isRuleSpecEditing == true){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'You cannot delete a rule specification while editing it'));
      return;
    }
    if(objectToDelete.entityRuleId === ''){
      let index = this.selectedRuleSpecs.indexOf(objectToDelete);
      this.selectedRuleSpecs.splice(index, 1);
      this.ruleSpecTable.renderRows();
      this.clearSpecForm();
    }
    else{
      // Turn on the loading spinner
      this.loadingScreenService.changeLoadingState(true);

      let apiResponse = await this.ruleService.deleteRuleSpecification(objectToDelete.entityRuleId, objectToDelete.specificationId.toString());

      this.loadingScreenService.changeLoadingState(false);
      if(apiResponse.success){
        let index = this.selectedRuleSpecs.indexOf(objectToDelete);
        this.selectedRuleSpecs.splice(index, 1);
        this.ruleSpecTable.renderRows();
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));
        this.clearSpecForm();
        this.toggleSpecUIElements(this.selectedRuleType?.ruleTypeId || 0);
      }
      else
      {
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }
    }
  }

  //#endregion

  //#region Toggle Spec UI Elements

  /// <summary>
  /// Method that toggles the visibility of the UI elements based on the selected rule type
  /// </summary>
  toggleSpecUIElements(ruleTypeID : number) {
    switch(ruleTypeID) {
      case 1:
      case 2:
        this.visibleSkillSelect = false;
        this.visibleShiftSelect = false;
        this.visibleSpecValueInput = true;
        break;

      case 3:
      case 4:
      case 8:
        this.visibleSkillSelect = false;
        this.visibleShiftSelect = true;
        this.visibleSpecValueInput = true;
        break;

      case 5:
        this.visibleSkillSelect = true;
        this.visibleShiftSelect = true;
        this.visibleSpecValueInput = false;
        break;

      case 6:
      case 10:
      case 11:
        this.visibleSkillSelect = true;
        this.visibleShiftSelect = true;
        this.visibleSpecValueInput = true;
        break;

      case 7:
      case 9:
        this.visibleSkillSelect = false;
        this.visibleShiftSelect = true;
        this.visibleSpecValueInput = true;
        break;

      default:
        this.visibleSkillSelect = false;
        this.visibleShiftSelect = false;
        this.visibleSpecValueInput = false;
        break;
    }
  }

  //#endregion
}
