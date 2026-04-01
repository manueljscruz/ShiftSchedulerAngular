import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FILTER_ICON } from '../../shared/constants/IconNamesConstants';
import { EntityMembersViewModel } from '../../shared/models/VM/EntityMembersViewModel';
import { EntityService } from '../../core/services/api/EntityService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { ActivatedRoute } from '@angular/router';
import { SkillDTO } from '../../shared/models/DTOs/Incoming/SkillDTO';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { EntityWorkerMemberDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { UI_DIALOG_ENTRANCE_DURATION, UI_DIALOG_EXIT_DURATION } from '../../shared/constants/UiContants';
import { EditMemberDialogComponent } from './edit-member-dialog/edit-member-dialog.component';
import { DeleteMemberDTO } from '../../shared/models/DTOs/Outgoing/DeleteMemberDTO';
import { DELETE_MEMBER_CONTENT, DELETE_MEMBER_TITLE, KICK_OUT_MEMBER_CONTENT, KICK_OUT_MEMBER_TITLE } from '../../shared/constants/UITextConstants';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import { BaseViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { PagedList } from '../../shared/models/DTOs/Incoming/PagedList';
import { PagedModelRequest } from '../../shared/models/DTOs/Outgoing/PagedModelRequest';
import { EntityWorkerMemberCardComponent } from "../../shared/components/entity-worker-member-card/entity-worker-member-card.component";
import { WorkerFiltersDialogComponent } from './worker-filters-dialog/worker-filters-dialog.component';
import { MemberListFilterDTO } from '../../shared/models/DTOs/Outgoing/MemberListFilterDTO';
import { AuthService } from '../../core/services/api/AuthService';
import { BotToUserDialogComponent } from './bot-to-user-dialog/bot-to-user-dialog.component';
import { MemberPagedModelRequestDTO } from '../../shared/models/DTOs/Outgoing/MemberPagedModelRequestDTO';
import { TransferMemberDialogComponent } from './transfer-member-dialog/transfer-member-dialog.component';
import { ExitEntityDialogComponent } from './exit-entity-dialog/exit-entity-dialog.component';

/**
 * Entity Workers Component
 *
 * Manages the worker/member roster for a specific entity (organization/department).
 * Displays workers in either grid or list view with pagination and filtering capabilities.
 *
 * Features:
 * - Grid/List view toggle for worker display
 * - Pagination for large worker lists (5/10/25/100 items per page)
 * - Filtering by skills and shifts
 * - Add new workers to entity (via AddMemberDialogComponent)
 * - Edit worker details including skills and assigned shifts (via EditMemberDialogComponent)
 * - Delete workers from entity (with confirmation)
 * - Permission-based UI (entity owners see add/edit/delete, regular members see read-only)
 *
 * Responsive behavior:
 * - Mobile: Grid switches to 1 column, actions stack vertically
 * - Tablet: 2 columns
 * - Desktop: 3+ columns based on screen width
 *
 * Route: /dashboard/entity/:entityId/workers
 * Access: Requires user to be a member of the entity
 */
@Component({
  selector: 'app-entity-workers',
  templateUrl: './entity-workers.component.html',
  styleUrl: './entity-workers.component.css',
})
export class EntityWorkersComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  UI_DIALOG_ENTRANCE_DURATION = UI_DIALOG_ENTRANCE_DURATION;
  UI_DIALOG_EXIT_DURATION = UI_DIALOG_EXIT_DURATION;
  DELETE_MEMBER_TITLE = DELETE_MEMBER_TITLE;
  DELETE_MEMBER_CONTENT = DELETE_MEMBER_CONTENT;
  KICK_OUT_MEMBER_TITLE = KICK_OUT_MEMBER_TITLE;
  KICK_OUT_MEMBER_CONTENT = KICK_OUT_MEMBER_CONTENT;

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
  public loggedUser: UserDTO | null = null;

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
  /// Flag indicating the current user can add, edit, and delete members (GM or Manager role)
  /// </summary>
  public canManageMembers: boolean = false;

  /// <summary>
  /// Flag indicating the current user can transfer/copy members (GM, or Manager with CanManageChildren)
  /// </summary>
  public canTransferCopyMembers: boolean = false;
  
  /// <summary>
  /// Flag to determine if the view is in grid mode
  /// </summary>
  public isGridView: boolean = false;

  /// <summary>
  /// Flag to determine if the view is in list mode
  /// </summary>
  public isListView: boolean = true;

  // Mobile actions menu toggle
  public isMobileActionsOpen: boolean = false;

  showInactive: boolean = false;

  activeFilters: MemberListFilterDTO = new MemberListFilterDTO();

  currentPageIndex = 0;

  pageSize = 10;

  totalItems = 0;

  pageSizeOptions: number[] = [5, 10, 25, 100];

  isSelectionMode: boolean = false;
  selectedMembers: EntityWorkerMemberDTO[] = [];

  //#endregion
  
  //#region Constructor

  /// Constructor
  constructor(private entityService : EntityService,
    private snackManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.entityMembersViewModel = new EntityMembersViewModel("", [], [], [], new PagedList([], 1, 10, 0));
  }

  //#endregion

  //#region Methods
  
  //#region On Init

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const entityId = params.get('entityId') || '';
        if (entityId) {
          this.currentEntityId = entityId;
          this.loadViewData();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private async loadViewData(): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.loggedUser = currentUser;
    }

    if (!this.loggedUser) {
      return;
    }

    this.loadingScreenService.changeLoadingState(true);
    this.entityMembersViewModel = new EntityMembersViewModel("", [], [], [], new PagedList([], 1, 10, 0));
    this.activeFilters = new MemberListFilterDTO();
    this.currentPageIndex = 1;

    let memberListModelRequestDTO : MemberPagedModelRequestDTO = {
      entityId: this.currentEntityId,
      workerId: this.loggedUser.userId,
      currentPage: this.currentPageIndex,
      nextPage: this.currentPageIndex,
      itemsPerPage: this.pageSize,
      showInactive: this.showInactive,
      memberFilters: new MemberListFilterDTO()
    };

    let response = await this.entityService.getEntityMembers(memberListModelRequestDTO);
    this.loadingScreenService.changeLoadingState(false);
    if(response == null || response.data.length === 0){
      return;
    }
    this.entityMembersViewModel = await this.entityService.getEntityMembersViewModel(memberListModelRequestDTO);

    const GENERAL_MANAGER_ID = 1;
    const MANAGER_ID = 2;
    const roleId = this.entityMembersViewModel.currentUserPermissionRoleId;
    const canManageChildren = this.entityMembersViewModel.currentUserCanManageChildren;

    this.canManageMembers = roleId === GENERAL_MANAGER_ID || roleId === MANAGER_ID;
    this.canTransferCopyMembers = roleId === GENERAL_MANAGER_ID || (roleId === MANAGER_ID && canManageChildren);
  }

  //#endregion

  //#region Toggle Filters

  /// <summary>
  /// Method that activates or deactivates the filter options
  /// </summary>
  async toggleFilters() {

    const dialogRef = this.dialog.open(WorkerFiltersDialogComponent, {
      width: '400px',
      data: {
        enterAnimationDuration: UI_DIALOG_ENTRANCE_DURATION,
        exitAnimationDuration: UI_DIALOG_EXIT_DURATION,
        entityUsedSkills: this.entityMembersViewModel.entityUsedSkills,
        entityShifts: this.entityMembersViewModel.shifts,
        activeFilters: this.activeFilters
      }
    });

    dialogRef.componentInstance.onFiltersClose.subscribe(async (result: any) => {
      dialogRef.close();

      // If result is not null, then apply filters
      if(result){
        this.activeFilters = result as MemberListFilterDTO;
        this.currentPageIndex = 0;
        await this.GetMembersPage(this.currentPageIndex, this.pageSize, this.activeFilters);
      }
    });

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
      data: { enterAnimationDuration, exitAnimationDuration, skillList, currentEntityId, shiftList: this.entityMembersViewModel.shifts, rolesList: this.entityMembersViewModel.entityPermissionRoles }
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
          this.entityMembersViewModel.entityMembers.data.push(newMemberResult as EntityWorkerMemberDTO);
        }
      }
    });
  }

  //#endregion

  //#region On Edit Member

  onEditMember(editWorker: EntityWorkerMemberDTO) {
    let skillList = this.entityMembersViewModel.skills;
    let shiftsList = this.entityMembersViewModel.shifts;
    let rolesList = this.entityMembersViewModel.entityPermissionRoles;
    let currentEntityId = this.currentEntityId;

    const currentUserRoleId = this.entityMembersViewModel.currentUserPermissionRoleId;

    const dialogRef = this.dialog.open(EditMemberDialogComponent, {
      width: '500px',
      data: { UI_DIALOG_ENTRANCE_DURATION, UI_DIALOG_EXIT_DURATION, editWorker, skillList, currentEntityId, shiftsList, rolesList, currentUserRoleId }
    });
    
    dialogRef.componentInstance.onMemberEdited.subscribe((result: BaseResponseModel) => {
      dialogRef.close();

      if(result.success){
        this.snackManagerService.showSuccessSnackbar(new SnackbarUIModel(5, result.message));

        editWorker = result.result;
        let index = this.entityMembersViewModel.entityMembers.data.findIndex(x => x.workerId === editWorker.workerId);
        if(index >= 0){
          this.entityMembersViewModel.entityMembers.data[index] = editWorker as EntityWorkerMemberDTO;
        }
        else{
          this.snackManagerService.showFailSnackbar(new SnackbarUIModel(5, result.message));
        }
      }
    });
  }

  //#endregion

  //#region On Delete Member

  onDeleteMember(workerToDelete: EntityWorkerMemberDTO) {
    if(workerToDelete == null){
      return;
    }

    this.deleteMember(workerToDelete);
  }

  //#endregion

  //#region On Remove Member From List (with confirmation dialog)

  onRemoveMemberFromList(workerToRemove: EntityWorkerMemberDTO) {
    if (workerToRemove == null) {
      return;
    }

    const isBot = workerToRemove.isBot;
    const dialogRef = this.dialog.open(GenericWarningDialogComponent, {
      width: '500px',
      data: {
        warningTitle: isBot ? DELETE_MEMBER_TITLE : KICK_OUT_MEMBER_TITLE,
        warningMessage: isBot ? DELETE_MEMBER_CONTENT : KICK_OUT_MEMBER_CONTENT,
        isDeleteWarning: isBot,
        isKickOut: !isBot
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteMember(workerToRemove);
      }
    });
  }

  //#endregion

  //#region Delete Member

  async deleteMember(workerToDelete: EntityWorkerMemberDTO){
    let workerData = new DeleteMemberDTO(workerToDelete.workerId, this.currentEntityId,  workerToDelete.isBot);

    this.loadingScreenService.changeLoadingState(true);

    let apiResponse = await this.entityService.deleteEntityWorker(workerData);
    if(apiResponse.success){
      let index = this.entityMembersViewModel.entityMembers.data.findIndex(x => x.workerId === workerToDelete.workerId);
      if(index >= 0){
        this.entityMembersViewModel.entityMembers.data = this.entityMembersViewModel.entityMembers.data.filter(x => x.workerId !== workerToDelete.workerId);
        this.entityMembersViewModel.entityMembers.totalCount--;

        this.snackManagerService.showSuccessSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }
      else{
        this.snackManagerService.showFailSnackbar(new SnackbarUIModel(5, apiResponse.message));
      }
    }

    this.loadingScreenService.changeLoadingState(false);
  }

  //#endregion

  //#region On View Change

  onViewChange($event: MatButtonToggleChange) {
    switch ($event.value) {
      case 'grid':
        this.isGridView = true;
        this.isListView = false;
        break;

      case 'list':
        this.isGridView = false;
        this.isListView = true;
        break;

      default:
        this.isGridView = true;
        this.isListView = false;
        break;
    }
  }

  //#endregion

  //#region Get Members Page

  async GetMembersPage(nextPageIndex: number, itemsPerPage: number, filters?: MemberListFilterDTO){
    if (!this.loggedUser) {
      return;
    }

    let memberListModelRequestDTO : MemberPagedModelRequestDTO = {
      entityId: this.currentEntityId,
      workerId: this.loggedUser.userId,
      currentPage: this.currentPageIndex,
      nextPage: nextPageIndex+1,
      itemsPerPage: itemsPerPage,
      memberFilters: filters ? filters : new MemberListFilterDTO(),
      showInactive: this.showInactive
    };

    this.loadingScreenService.changeLoadingState(true);

    this.entityMembersViewModel.entityMembers = await this.entityService.getEntityMembers(memberListModelRequestDTO);

    this.loadingScreenService.changeLoadingState(false);
  }

  //#endregion

  //#region Handle Page Event

  async handlePageEvent($event: PageEvent) {
    this.currentPageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;

    await this.GetMembersPage(this.currentPageIndex, this.pageSize, this.activeFilters);
  }

  //#endregion

  //#region Convert Bot to User

  onConvertBotToUser(botForConversion: EntityWorkerMemberDTO) {
    let currentEntityId = this.currentEntityId;
    const dialogRef = this.dialog.open(BotToUserDialogComponent, {
      width: '500px',
      data: { 
        enterAnimationDuration: UI_DIALOG_ENTRANCE_DURATION, 
        exitAnimationDuration: UI_DIALOG_EXIT_DURATION,
        currentEntityId: currentEntityId,
        selectedBot: botForConversion
      }
    });

    dialogRef.componentInstance.onBotConverted.subscribe((result: BaseResponseModel) => {
      dialogRef.close();

      if(result.success){
        this.snackManagerService.showSuccessSnackbar(new SnackbarUIModel(5, result.message));
        

        // Locate bot in members list
        let index = this.entityMembersViewModel.entityMembers.data.findIndex(x => x.workerId === botForConversion.workerId);
        if(index >= 0){
          this.entityMembersViewModel.entityMembers.data.splice(index,1);
        }

        // Locate user in members list and update to reflect bot conversion
        let convertedUser = result.result as EntityWorkerMemberDTO;
        let userIndex = this.entityMembersViewModel.entityMembers.data.findIndex(x => x.workerId === convertedUser.workerId);

        // if user is in the current members list page, update their info. If not, do nothing as they will appear with correct info when user navigates to their page in the pagination
        if(userIndex >= 0){
          this.entityMembersViewModel.entityMembers.data[userIndex] = convertedUser;
        }
      }
    });
  }

  //#endregion

  //#region Selection Mode

  toggleSelectionMode(): void {
    this.isSelectionMode = !this.isSelectionMode;
    if (!this.isSelectionMode) {
      this.selectedMembers = [];
      this.entityMembersViewModel.entityMembers.data.forEach(m => m.isSelected = false);
    }
  }

  onMemberSelectionChange(member: EntityWorkerMemberDTO, checked: boolean): void {
    member.isSelected = checked;
    if (checked) {
      if (!this.selectedMembers.find(m => m.workerId === member.workerId)) {
        this.selectedMembers.push(member);
      }
    } else {
      this.selectedMembers = this.selectedMembers.filter(m => m.workerId !== member.workerId);
    }
  }

  //#endregion

  //#region Open Transfer / Copy Dialog

  openTransferMemberDialog(): void {
    if (this.selectedMembers.length === 0) return;

    const dialogRef = this.dialog.open(TransferMemberDialogComponent, {
      width: '560px',
      data: {
        selectedMembers: this.selectedMembers,
        sourceEntityId: this.currentEntityId,
        entityPermissionRoles: this.entityMembersViewModel.entityPermissionRoles,
        entitySkills: this.entityMembersViewModel.skills
      }
    });

    dialogRef.componentInstance.onMembersTransferred.subscribe((result: BaseResponseModel) => {
      dialogRef.close();
      if (result.success) {
        this.snackManagerService.showSuccessSnackbar(new SnackbarUIModel(5, result.message));
        this.toggleSelectionMode();
        this.GetMembersPage(this.currentPageIndex, this.pageSize, this.activeFilters);
      } else {
        this.snackManagerService.showFailSnackbar(new SnackbarUIModel(5, result.message));
      }
    });
  }

  //#endregion

  //#region On Leave Entity (self-exit)

  onLeaveEntity(): void {
    if (!this.loggedUser) return;

    // Build a minimal member DTO from the logged-in user —
    // avoids pagination dependency (user may not be on the current page)
    const selfMember = new EntityWorkerMemberDTO(
      this.loggedUser.userId,
      this.loggedUser.userDisplayName ?? '',
      false, [], false, false, false, false, []
    );

    const dialogRef = this.dialog.open(ExitEntityDialogComponent, {
      width: '400px',
      data: {
        currentEntityId: this.currentEntityId,
        workerMember: selfMember
      }
    });

    dialogRef.componentInstance.onExitConfirmed.subscribe(() => {
      dialogRef.close();
      this.loadViewData();
    });
  }

  //#endregion


  //#endregion

}
