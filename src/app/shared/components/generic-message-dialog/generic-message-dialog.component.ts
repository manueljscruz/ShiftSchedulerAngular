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
    this.messageTitle = data.deleteWarningTitle;
    this.messageText = data.deleteWarningMessage;
   }
}

