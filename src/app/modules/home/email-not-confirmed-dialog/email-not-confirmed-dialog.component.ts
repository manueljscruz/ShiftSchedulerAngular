import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/api/AuthService';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';

export interface EmailNotConfirmedDialogData {
  email: string;
}

@Component({
  selector: 'app-email-not-confirmed-dialog',
  templateUrl: './email-not-confirmed-dialog.component.html',
  styleUrl: './email-not-confirmed-dialog.component.css'
})
export class EmailNotConfirmedDialogComponent {
  email: string;
  isLoading: boolean = false;
  emailSent: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EmailNotConfirmedDialogData,
    private dialogRef: MatDialogRef<EmailNotConfirmedDialogComponent>,
    private authService: AuthService,
    private snackbarManagerService: SnackbarManagerService
  ) {
    this.email = data.email;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onResend(): void {
    if (this.isLoading || this.emailSent) {
      return;
    }

    this.isLoading = true;

    this.authService.resendConfirmationEmail(this.email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.emailSent = true;

        this.snackbarManagerService.showSuccessSnackbar(
          new SnackbarUIModel(5, 'Confirmation email sent! Please check your inbox.')
        );

        // Close dialog after 2 seconds
        setTimeout(() => {
          this.dialogRef.close();
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;

        let errorMessage = 'Failed to send confirmation email. Please try again.';
        if (error.status === 429) {
          errorMessage = 'Too many requests. Please wait a few minutes before trying again.';
        }

        this.snackbarManagerService.showFailSnackbar(
          new SnackbarUIModel(5, errorMessage)
        );
      }
    });
  }
}
