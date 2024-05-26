import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-delete-warning-dialog',
  templateUrl: './generic-delete-warning-dialog.component.html',
  styleUrl: './generic-delete-warning-dialog.component.css'
})
export class GenericDeleteWarningDialogComponent {

  deleteWarningTitle: string = ''; 
  deleteWarningMessage: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.deleteWarningTitle = data.deleteWarningTitle;
    this.deleteWarningMessage = data.deleteWarningMessage;
   }
}
