import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DELETE_ICON, DONE_ICON, KICK_OUT_ICON } from '../../constants/IconNamesConstants';

@Component({
  selector: 'app-generic-warning-dialog',
  templateUrl: './generic-warning-dialog.component.html',
  styleUrl: './generic-warning-dialog.component.css'
})
export class GenericWarningDialogComponent {

  DONE_ICON: string = DONE_ICON;
  DELETE_ICON: string = DELETE_ICON;
  KICK_OUT_ICON: string = KICK_OUT_ICON;
  warningTitle: string = '';
  warningMessage: string = '';
  isDeleteWarning: boolean = false;
  isKickOut: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.warningTitle = data.warningTitle;
    this.warningMessage = data.warningMessage;
    this.isDeleteWarning = data.isDeleteWarning ?? false;
    this.isKickOut = data.isKickOut ?? false;
   }
}
