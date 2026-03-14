import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CONVERT_MEMBER_TITLE, CONVERT_MEMBER_CONTENT } from '../../../shared/constants/UITextConstants';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent } from "@angular/material/dialog";
import { EntityWorkerMemberDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { EntityService } from '../../../core/services/api/EntityService';
import { ConvertBotToUserDTO } from '../../../shared/models/DTOs/Outgoing/ConvertBotToUserDTO';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { GenericWarningDialogComponent } from '../../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import { AuthService } from '../../../core/services/api/AuthService';
import { MemberListFilterDTO } from '../../../shared/models/DTOs/Outgoing/MemberListFilterDTO';
import { MemberPagedModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/MemberPagedModelRequestDTO';

@Component({
  selector: 'app-bot-to-user-dialog',
  templateUrl: './bot-to-user-dialog.component.html',
  styleUrl: './bot-to-user-dialog.component.css'
})
export class BotToUserDialogComponent implements OnInit {
  currentEntityId: string = '';

  selectedBot : EntityWorkerMemberDTO;

  eligibleWorkersForConversion: EntityWorkerMemberDTO[] = [];

  selectedWorkerForConversion: EntityWorkerMemberDTO = EntityWorkerMemberDTO.newInstance();

  isLoadingWorkers: boolean = true;

  @Output() onBotConverted = new EventEmitter<BaseResponseModel>();

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialog: MatDialog,
      private loadingSpinnerManagerService: LoadingSpinnerManagerService,
      private snackbarManagerService: SnackbarManagerService,
      private entityService: EntityService,
      private authService: AuthService
    ) {
      this.currentEntityId = data.currentEntityId;
      this.selectedBot = data.selectedBot;
    }

  async ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.isLoadingWorkers = false;
      return;
    }

    const eligibleWorkersFilter = new MemberListFilterDTO('', true, false);

    const requestDTO: MemberPagedModelRequestDTO = {
      entityId: this.currentEntityId,
      workerId: currentUser.userId,
      currentPage: 1,
      nextPage: 1,
      itemsPerPage: 500,
      memberFilters: eligibleWorkersFilter,
      showInactive: false
    };

    const response = await this.entityService.getEntityMembers(requestDTO);

    if (response && response.data) {
      this.eligibleWorkersForConversion = response.data as EntityWorkerMemberDTO[];
    }

    this.isLoadingWorkers = false;
  }

  onConvertBotToUser() {
    if (!this.selectedBot || !this.selectedWorkerForConversion) {
      console.error('Bot or worker selection is invalid');
      return;
    }

    if (this.selectedWorkerForConversion.isBot) {
      console.error('Selected worker cannot be a bot');
      return;
    }

    let enterAnimationDuration = '5000';
    let exitAnimationDuration = '5000';

    const dialogRef = this.dialog.open(GenericWarningDialogComponent, {
      width: '400px',
      data: {
        enterAnimationDuration, 
        exitAnimationDuration,
        warningTitle: CONVERT_MEMBER_TITLE,
        warningMessage: CONVERT_MEMBER_CONTENT.replace("{{0}}", this.selectedBot.workerName).replace("{{1}}", this.selectedWorkerForConversion.workerName),
        isDeleteWarning: false
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.convertBotToUser();
      }
    });
  }

  async convertBotToUser() {
    let convertBotToUserDTO = new ConvertBotToUserDTO(
      this.currentEntityId,
      this.selectedBot.workerId,
      this.selectedWorkerForConversion?.workerId
    );

    this.loadingSpinnerManagerService.changeLoadingState(true);

    let response : BaseResponseModel = await this.entityService.convertBotToUser(convertBotToUserDTO);
    
    this.loadingSpinnerManagerService.changeLoadingState(false);

    if (response && response.success) {
      this.onBotConverted.emit(response);
    }
    else {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
    }
  }
}
