import { Component } from '@angular/core';
import { FILTER_ICON } from '../../shared/constants/IconNamesConstants';
import { EntityMembersViewModel } from '../../shared/models/VM/EntityMembersViewModel';
import { EntityService } from '../../core/services/api/EntityService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { ActivatedRoute } from '@angular/router';
import { SkillDTO } from '../../shared/models/DTOs/Incoming/SkillDTO';
import { WorkerDTO } from '../../shared/models/DTOs/Incoming/WorkerDTO';
import { LocalService } from '../../core/services/local.service';
import { EntityWorkerMemberDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { UI_DIALOG_ENTRANCE_DURATION, UI_DIALOG_EXIT_DURATION } from '../../shared/constants/UiContants';
import { EditMemberDialogComponent } from './edit-member-dialog/edit-member-dialog.component';


@Component({
  selector: 'app-entity-workers',
  templateUrl: './entity-workers.component.html',
  styleUrl: './entity-workers.component.css'
})
export class EntityWorkersComponent {

  UI_DIALOG_ENTRANCE_DURATION = UI_DIALOG_ENTRANCE_DURATION;
  UI_DIALOG_EXIT_DURATION = UI_DIALOG_EXIT_DURATION;

  /// <summary>
  /// Constant filter icon name
  /// </summary>
  public FILTER_ICON: string = FILTER_ICON;

  /// <summary>
  /// View model object for the entity workers page
  /// </summary>
  public entityMembersViewModel: EntityMembersViewModel;

  /// <summary>
  /// Selected skill filter object
  /// </summary>
  public selectedSkill? : SkillDTO;

  /// <summary>
  /// Logged user object
  /// </summary>
  public loggedUser: WorkerDTO = new WorkerDTO();

  /// <summary>
  /// Current entity id
  /// </summary>
  private currentEntityId: string = '';

  /// <summary>
  /// Filter active flag
  /// </summary>
  public isFilterActive: boolean = false;

  /// <summary>
  /// Name filter
  /// </summary>
  public nameFilter: string = '';

  /// <summary>
  /// Is current user entity owner flag
  /// </summary>
  public isCurrentUserEntityOwner: boolean = false;
  
  
  /// Constructor
  constructor(private entityService : EntityService,
    private localStore: LocalService,
    private snackManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.entityMembersViewModel = new EntityMembersViewModel("", [], []);
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
  }

  /// Methods
  async ngOnInit() {
    this.loadingScreenService.changeLoadingState(true);
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.entityMembersViewModel = await this.entityService.getEntityMembersViewModel(this.currentEntityId);

    this.isCurrentUserEntityOwner = this.entityMembersViewModel.entityOwnerId === this.loggedUser.workerId ? true : false;
    this.loadingScreenService.changeLoadingState(false);
  }

  /// <summary>
  /// Method that activates or deactivates the filter options
  /// </summary>
  toggleFilters() {
    this.isFilterActive = !this.isFilterActive;
  }

 
  /// <summary>
  /// Method that opens the add member dialog
  /// </summary>
  openAddMemberDialog(enterAnimationDuration: string, exitAnimationDuration: string, skillList: SkillDTO[]){
    let currentEntityId = this.currentEntityId;
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, skillList, currentEntityId }
    });

    dialogRef.componentInstance.onMemberAdded.subscribe((result: BaseResponseModel) => {
      dialogRef.close();

      if(result.success){
        this.snackManagerService.showSuccessSnackbar(new SnackbarUIModel(5, result.message));

        let newMemberResult = result.result;
        if(newMemberResult === true){
        }
        else{
          newMemberResult = newMemberResult as EntityWorkerMemberDTO;
          // newMemberResult.SkillSet = this.auxReconfigureSkills(newMemberResult);
          this.entityMembersViewModel.entityMembers.push(newMemberResult as EntityWorkerMemberDTO);
        }
      }
    });
  }

  onEditMember(editWorker: EntityWorkerMemberDTO) {
    let skillList = this.entityMembersViewModel.skills;
    let currentEntityId = this.currentEntityId;
    
    const dialogRef = this.dialog.open(EditMemberDialogComponent, {
      width: '500px',
      data: { UI_DIALOG_ENTRANCE_DURATION, UI_DIALOG_EXIT_DURATION, editWorker, skillList, currentEntityId }
    });
    
  }

  onDeleteMember(workerToDelete: EntityWorkerMemberDTO) {

  }
}
