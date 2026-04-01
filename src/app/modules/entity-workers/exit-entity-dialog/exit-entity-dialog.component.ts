import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntityService } from '../../../core/services/api/EntityService';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import { MemberExitDTO } from '../../../shared/models/DTOs/Outgoing/MemberExitDTO';
import { EntityWorkerMemberDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';

@Component({
  selector: 'app-exit-entity-dialog',
  templateUrl: './exit-entity-dialog.component.html',
  styleUrl: './exit-entity-dialog.component.css',
})
export class ExitEntityDialogComponent {

  @Output() onExitConfirmed: EventEmitter<void> = new EventEmitter<void>();

  exitMode: 'immediate' | 'scheduled' | 'cancel' = 'immediate';
  scheduledDate: Date | null = null;
  today: Date = new Date();
  tomorrow: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { currentEntityId: string; workerMember: EntityWorkerMemberDTO },
    private dialogRef: MatDialogRef<ExitEntityDialogComponent>,
    private entityService: EntityService,
    private loadingService: LoadingSpinnerManagerService,
    private snackbarService: SnackbarManagerService
  ) {}

  get hasScheduledExit(): boolean {
    const d = this.data.workerMember.dateToExit;
    if (!d) return false;
    const date = new Date(d);
    return !isNaN(date.getTime()) && date.getFullYear() > 1 && date > new Date();
  }

  get canConfirm(): boolean {
    if (this.exitMode === 'immediate' || this.exitMode === 'cancel') return true;
    return this.scheduledDate !== null;
  }

  async confirm(): Promise<void> {
    if (!this.canConfirm) return;

    this.isLoading = true;
    this.loadingService.changeLoadingState(true);

    const dto = new MemberExitDTO();
    dto.workerId = this.data.workerMember.workerId;
    dto.entityId = this.data.currentEntityId;
    dto.isBot = this.data.workerMember.isBot;

    let response;

    if (this.exitMode === 'cancel') {
      response = await this.entityService.cancelMemberExit(dto);
    } else {
      dto.dateToExit = this.exitMode === 'immediate'
        ? new Date().toISOString()
        : this.scheduledDate!.toISOString();
      response = await this.entityService.setMemberDateToExit(dto);
    }

    this.isLoading = false;
    this.loadingService.changeLoadingState(false);

    if (response.success) {
      this.onExitConfirmed.emit();
      this.dialogRef.close(true);
    } else {
      this.snackbarService.showFailSnackbar(new SnackbarUIModel(5, response.message));
    }
  }
}
