import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'delete-entity-warning-dialog',
  templateUrl: './delete-entity-warning-dialog.component.html',
  styleUrl: './delete-entity-warning-dialog.component.css'
})
export class DeleteEntityWarningDialogComponent {

  entityName: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.entityName = data.entityName;
   }
}
