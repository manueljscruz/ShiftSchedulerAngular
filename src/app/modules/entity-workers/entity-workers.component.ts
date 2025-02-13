import { Component } from '@angular/core';
import { FILTER_ICON } from '../../shared/constants/IconNamesConstants';
import { EntityMembersViewModel } from '../../shared/models/VM/EntityMembersViewModel';
import { EntityService } from '../../core/services/api/EntityService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { ActivatedRoute } from '@angular/router';
import { SkillDTO } from '../../shared/models/DTOs/Incoming/SkillDTO';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { LocalService } from '../../core/services/local.service';
import { EntityWorkerMemberDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { UI_DIALOG_ENTRANCE_DURATION, UI_DIALOG_EXIT_DURATION } from '../../shared/constants/UiContants';
import { EditMemberDialogComponent } from './edit-member-dialog/edit-member-dialog.component';
import { DeleteMemberDTO } from '../../shared/models/DTOs/Outgoing/DeleteMemberDTO';
import { GenericDeleteWarningDialogComponent } from '../../shared/components/generic-delete-warning-dialog/generic-delete-warning-dialog.component';
import { DELETE_MEMBER_CONTENT, DELETE_MEMBER_TITLE } from '../../shared/constants/UITextConstants';


@Component({
  selector: 'app-entity-workers',
  templateUrl: './entity-workers.component.html',
  styleUrl: './entity-workers.component.css'
})
export class EntityWorkersComponent {

  UI_DIALOG_ENTRANCE_DURATION = UI_DIALOG_ENTRANCE_DURATION;
  UI_DIALOG_EXIT_DURATION = UI_DIALOG_EXIT_DURATION;
  DELETE_MEMBER_TITLE = DELETE_MEMBER_TITLE;
  DELETE_MEMBER_CONTENT = DELETE_MEMBER_CONTENT;

  //#region Properties

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
  public loggedUser: UserDTO = new UserDTO();

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
  
  //#endregion
  
  //#region Constructor

  /// Constructor
  constructor(private entityService : EntityService,
    private localStore: LocalService,
    private snackManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.entityMembersViewModel = new EntityMembersViewModel("", [], []);
    let decodedEntityId = decodeURIComponent(this.route.snapshot.paramMap.get('entityId') || '');
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || ''; // decodedEntityId;
  }

  //#endregion

  //#region Methods
  
  //#region On Init

  async ngOnInit() {
    this.loadingScreenService.changeLoadingState(true);
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.entityMembersViewModel = await this.entityService.getEntityMembersViewModel(this.currentEntityId);

    this.isCurrentUserEntityOwner = this.entityMembersViewModel.entityOwnerId === this.loggedUser.userId ? true : false;
    this.loadingScreenService.changeLoadingState(false);
  }

  //#endregion

  //#region Toggle Filters

  /// <summary>
  /// Method that activates or deactivates the filter options
  /// </summary>
  toggleFilters() {
    this.isFilterActive = !this.isFilterActive;
  }

  //#endregion

  //#region Open Add Member Dialog

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

  //#endregion

  //#region On Edit Member

  onEditMember(editWorker: EntityWorkerMemberDTO) {
    let skillList = this.entityMembersViewModel.skills;
    let currentEntityId = this.currentEntityId;
    
    const dialogRef = this.dialog.open(EditMemberDialogComponent, {
      width: '500px',
      data: { UI_DIALOG_ENTRANCE_DURATION, UI_DIALOG_EXIT_DURATION, editWorker, skillList, currentEntityId }
    });
    
  }

  //#endregion

  //#region On Delete Member

  onDeleteMember(workerToDelete: EntityWorkerMemberDTO, enterAnimationDuration: string, exitAnimationDuration: string, title : string, content : string) {
    if(workerToDelete == null){
      return;
    }

    const dialogRef = this.dialog.open(GenericDeleteWarningDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, deleteWarningTitle: title, deleteWarningMessage: content}
    });

    dialogRef.afterClosed().subscribe(async result =>{
      if(result){
        await this.deleteMember(workerToDelete);
      }
    });
  }

  //#endregion

  //#region Delete Member

  async deleteMember(workerToDelete: EntityWorkerMemberDTO){
    let workerData = new DeleteMemberDTO(this.loggedUser.userId, workerToDelete.workerId, workerToDelete.isBot);

    this.loadingScreenService.changeLoadingState(true);

    let apiResponse = await this.entityService.deleteEntityWorker(workerData);
    if(apiResponse.success){
      let index = this.entityMembersViewModel.entityMembers.findIndex(x => x.workerId === workerToDelete.workerId);
      if(index >= 0){
        this.entityMembersViewModel.entityMembers.splice(index, 1);

        this.snackManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }
      else{
        this.snackManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }
    }

    this.loadingScreenService.changeLoadingState(false);
  }

  //#endregion

  //#endregion

}
