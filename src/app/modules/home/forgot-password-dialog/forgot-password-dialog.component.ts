import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/api/AuthService';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrl: './forgot-password-dialog.component.css'
})
export class ForgotPasswordDialogComponent {
  emailInput: string = '';
  isLoading: boolean = false;
  emailSent: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    private authService: AuthService,
    private snackbarManagerService: SnackbarManagerService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (!this.emailInput || this.isLoading || this.emailSent) {
      return;
    }

    this.isLoading = true;

    this.authService.forgotPassword(this.emailInput).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.emailSent = true;

        // Close dialog after 3 seconds
        setTimeout(() => {
          this.dialogRef.close();
        }, 3000);
      },
      error: (error) => {
        this.isLoading = false;
        this.snackbarManagerService.showFailSnackbar(
          new SnackbarUIModel(5, 'Failed to send reset email. Please try again.')
        );
      }
    });
  }
}
