import { Component, Inject, InjectionToken } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-message-dialog',
  templateUrl: './generic-message-dialog.component.html',
  styleUrl: './generic-message-dialog.component.css'
})
export class GenericMessageDialogComponent {
  messageTitle: string = '';
  messageText: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // Support both delete warning and generic message property names
    this.messageTitle = data.messageTitle || data.deleteWarningTitle || '';
    this.messageText = data.messageText || data.deleteWarningMessage || '';
   }
}

