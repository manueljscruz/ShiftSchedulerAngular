import { Component, ViewChild } from '@angular/core';
import { WorkerDTO } from '../../shared/models/DTOs/Incoming/WorkerDTO';
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
  public loggedUser: WorkerDTO = new WorkerDTO();
  
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
  public isEditing: boolean = false;

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
  selectedRuleSpec: EntityRuleSpecificationDTO[] = [];

  /// <summary>
  /// Selected rule type object
  /// </summary>
  selectedRuleType?: RuleTypeLocalizedDTO;

  selectedRelatedItem?: BusinessAspectLocalizedDTO;

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

  @ViewChild(MatTable) ruleSpecTable!: MatTable<EntityRuleSpecificationDTO>;

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private ruleService: RuleService,
    private entityService: EntityService,
    private shiftService: ShiftService,
  ) {
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
  }

  async ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.isCurrentUserEntityOwner = true;

    // Turn on the loading spinner
    this.loadingScreenService.changeLoadingState(true);

    let entityRuleViewModelRequestDTO = new BaseViewModelRequestDTO(this.currentEntityId, this.loggedUser.workerId, '');
    this.rulesViewModel = await this.ruleService.getRuleViewModel(entityRuleViewModelRequestDTO);

    this.entityShifts = await this.shiftService.getEntityShifts(this.currentEntityId);
    this.entitySkills = await this.entityService.getEntitySkills(this.currentEntityId);

    // Turn off the loading spinner
    this.loadingScreenService.changeLoadingState(false);
  }

  toggleForm(newValue : boolean) {
    this.isFormActive = newValue;
  }

  saveRule() {
    
  }

  editRule(rule: EntityRuleDTO) {
    this.toggleForm(true);
    this.isEditing = true;
    
    if(this.rulesViewModel.ruleTypeLocalizeds.length > 0) 
      this.selectedRuleType = this.rulesViewModel.ruleTypeLocalizeds.find(x => x.ruleTypeId === rule.ruleTypeId);

  }

  /// <summary>
  /// Method that handles the change of the rule type
  /// Hides or Shows UI Elements based on the selected rule type
  /// </summary>
  onRuleTypeChange($event: MatSelectChange) {
    console.log($event);

    switch($event.value.ruleTypeId) {
      case 1:
      case 2:
        this.visibleSkillSelect = false;
        this.visibleShiftSelect = false;
        this.visibleSpecValueInput = true;
        break;

      case 3:
      case 4:
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
        this.visibleSkillSelect = true;
        this.visibleShiftSelect = true;
        this.visibleSpecValueInput = true;
        break;

      case 7:
        this.visibleSkillSelect = false;
        this.visibleShiftSelect = true;
        this.visibleSpecValueInput = true;
        break;

      default:
        this.visibleSkillSelect = false;
        this.visibleShiftSelect = false;
        break;
    }
  }

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

  deleteRule(objectToDelete: any) {
    
  }

  addRuleSpec() {
    let ruleSpecDTO = new EntityRuleSpecificationDTO('', 0, 0, '', '', 0, '', '', 0);

    switch(this.selectedRuleType?.ruleTypeId) {
      case 1:
      case 2:
        ruleSpecDTO.ruleSpecificationValue = this.specificationValue;
        ruleSpecDTO.referenceName = NA;
        ruleSpecDTO.referenceName2 = NA;
        break;

      case 3:
      case 4:
        ruleSpecDTO.ruleSpecificationValue = this.specificationValue;
        ruleSpecDTO.aspectReferenceId = this.selectedShift?.shiftId || '';
        ruleSpecDTO.referenceName = this.selectedShift?.shiftName || '';
        ruleSpecDTO.referenceName2 = NA;
        break;
      
      case 5:
        ruleSpecDTO.aspectReferenceId = this.selectedSkill?.skillId.toString() || '';
        ruleSpecDTO.referenceName = this.selectedSkill?.skillLocalizedName || '';
        ruleSpecDTO.businessAspectId = BUSINESS_ASPECT_SKILLS_ID;
        ruleSpecDTO.aspectReferenceId2 = this.selectedShift?.shiftId || '';
        ruleSpecDTO.referenceName2 = this.selectedShift?.shiftName || '';
        ruleSpecDTO.businessAspectId2 = BUSINESS_ASPECT_SHIFTS_ID;
        break;

      case 6:
        ruleSpecDTO.aspectReferenceId = this.selectedSkill?.skillId.toString() || '';
        ruleSpecDTO.referenceName = this.selectedSkill?.skillLocalizedName || '';
        ruleSpecDTO.businessAspectId = BUSINESS_ASPECT_SKILLS_ID;
        ruleSpecDTO.aspectReferenceId2 = this.selectedShift?.shiftId || '';
        ruleSpecDTO.referenceName2 = this.selectedShift?.shiftName || '';
        ruleSpecDTO.businessAspectId2 = BUSINESS_ASPECT_SHIFTS_ID;
        ruleSpecDTO.ruleSpecificationValue = this.specificationValue;
        break;

      case 7:
        ruleSpecDTO.aspectReferenceId = this.selectedShift?.shiftId || '';
        ruleSpecDTO.referenceName = this.selectedShift?.shiftName || '';
        ruleSpecDTO.businessAspectId = BUSINESS_ASPECT_SHIFTS_ID;
        ruleSpecDTO.ruleSpecificationValue = this.specificationValue;
        ruleSpecDTO.referenceName2 = NA;
        break;

      default:
        return;
    }

    if(this.selectedRule.entityRuleId != ''){
      ruleSpecDTO.entityRuleId = this.selectedRule.entityRuleId;
    }
    else{
      this.selectedRuleSpec.push(ruleSpecDTO);
      this.ruleSpecTable.renderRows();
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'The rule specification has been added successfully'));
    }

  }

  editRuleSpec(_t139: any) {
    
  }

  deleteRuleSpec(objectToDelete: any) {
    
  }
}
