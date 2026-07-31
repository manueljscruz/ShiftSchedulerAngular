import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SubscriptionHistoryItemDTO } from '../../../shared/models/DTOs/Incoming/billing/SubscriptionHistoryItemDTO';
import { CANCEL_ICON } from '../../../shared/constants/IconNamesConstants';

@Component({
  selector: 'subscription-history-dialog',
  templateUrl: './subscription-history-dialog.component.html',
  styleUrl: './subscription-history-dialog.component.css'
})
export class SubscriptionHistoryDialogComponent {

  CANCEL_ICON = CANCEL_ICON;

  history: SubscriptionHistoryItemDTO[] = [];

  readonly historyColumns = ['plan', 'duration', 'startDate', 'endDate', 'status'];

  @Output() closeOp = new EventEmitter<boolean>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.history = data.history || [];
  }

  closeDialog() {
    this.closeOp.emit(true);
  }
}
