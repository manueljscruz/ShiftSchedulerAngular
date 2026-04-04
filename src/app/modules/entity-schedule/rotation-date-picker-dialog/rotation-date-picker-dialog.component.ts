import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';

export interface RotationDatePickerDialogData {
  title: string;
  minDate?: Date;
  maxDate?: Date;
}

@Component({
  selector: 'app-rotation-date-picker-dialog',
  templateUrl: './rotation-date-picker-dialog.component.html',
  providers: [provideNativeDateAdapter()]
})
export class RotationDatePickerDialogComponent {
  selectedDate: Date | null = null;

  constructor(
    public dialogRef: MatDialogRef<RotationDatePickerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RotationDatePickerDialogData
  ) {}

  confirm(): void {
    this.dialogRef.close(this.selectedDate);
  }

  cancel(): void {
    this.dialogRef.close(undefined);
  }
}
