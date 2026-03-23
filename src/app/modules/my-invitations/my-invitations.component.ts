import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../core/services/api/AuthService';
import { EntityService } from '../../core/services/api/EntityService';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SidebarNavigationService } from '../../core/services/ui/sidebar-navigation.service';
import { PendingInvitationDTO } from '../../shared/models/DTOs/Incoming/PendingInvitationDTO';
import { AcceptDeclineInvitationDTO } from '../../shared/models/DTOs/Outgoing/AcceptDeclineInvitationDTO';
import { EntityWorkerDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerDTO';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';

@Component({
  selector: 'app-my-invitations',
  templateUrl: './my-invitations.component.html',
  styleUrl: './my-invitations.component.css'
})
export class MyInvitationsComponent implements OnDestroy {

  //#region Properties

  loggedUser: UserDTO | null = null;
  pendingInvitations: PendingInvitationDTO[] = [];
  isLoading: boolean = false;

  private destroy$ = new Subject<void>();

  //#endregion

  //#region Constructor

  constructor(
    private authService: AuthService,
    private entityService: EntityService,
    private loadingSpinnerService: LoadingSpinnerManagerService,
    private snackbarManagerService: SnackbarManagerService,
    private sidebarNavigationService: SidebarNavigationService
  ) {}

  //#endregion

  //#region Lifecycle

  async ngOnInit() {
    await this.authService.waitForInitialization();

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async user => {
        this.loggedUser = user;
        if (this.loggedUser) {
          await this.loadInvitations();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //#endregion

  //#region Load Invitations

  private async loadInvitations(): Promise<void> {
    if (!this.loggedUser) return;

    this.isLoading = true;
    try {
      const response = await this.entityService.getPendingInvitations(this.loggedUser.userId);
      if (response && Array.isArray(response)) {
        this.pendingInvitations = response as PendingInvitationDTO[];
      } else if (response?.result) {
        this.pendingInvitations = response.result as PendingInvitationDTO[];
      } else {
        this.pendingInvitations = [];
      }
    } catch (error) {
      this.pendingInvitations = [];
    }
    this.isLoading = false;
  }

  //#endregion

  //#region Accept

  async accept(invitation: PendingInvitationDTO): Promise<void> {
    if (!this.loggedUser) return;

    this.loadingSpinnerService.changeLoadingState(true);

    const dto = new AcceptDeclineInvitationDTO(this.loggedUser.userId, invitation.entityId);
    const response = await this.entityService.acceptInvitation(dto);

    this.loadingSpinnerService.changeLoadingState(false);

    if (response?.success) {
      // Add the entity to the sidebar immediately
      const entityWorkerDTO = response.result as EntityWorkerDTO;
      if (entityWorkerDTO) {
        this.sidebarNavigationService.addNewWorkEntitySideBarItem(entityWorkerDTO);
      }

      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, `You have joined ${invitation.entityName}.`));
      this.pendingInvitations = this.pendingInvitations.filter(i => i.entityId !== invitation.entityId);
    } else {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response?.message || 'Failed to accept invitation.'));
    }
  }

  //#endregion

  //#region Decline

  async decline(invitation: PendingInvitationDTO): Promise<void> {
    if (!this.loggedUser) return;

    this.loadingSpinnerService.changeLoadingState(true);

    const dto = new AcceptDeclineInvitationDTO(this.loggedUser.userId, invitation.entityId);
    const response = await this.entityService.declineInvitation(dto);

    this.loadingSpinnerService.changeLoadingState(false);

    if (response?.success) {
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, `Invitation from ${invitation.entityName} declined.`));
      this.pendingInvitations = this.pendingInvitations.filter(i => i.entityId !== invitation.entityId);
    } else {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response?.message || 'Failed to decline invitation.'));
    }
  }

  //#endregion

}
