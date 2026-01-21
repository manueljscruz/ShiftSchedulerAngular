import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/api/AuthService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LOGIN_ROUTE } from '../../shared/constants/ViewRoutesConstants';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  resetSuccess: boolean = false;
  errorMessage: string = '';

  passwordRequirements = {
    minLength: false,
    hasDigit: false,
    hasLowercase: false,
    hasUppercase: false,
    hasSpecialChar: false
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackbarManagerService: SnackbarManagerService
  ) {}

  ngOnInit(): void {
    // Get email and token from query params
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.token = params['token'] || '';

      // If missing params, show error and redirect
      if (!this.email || !this.token) {
        this.errorMessage = 'Invalid or missing reset link parameters.';
        setTimeout(() => {
          this.router.navigate([LOGIN_ROUTE]);
        }, 3000);
      }
    });
  }

  onPasswordChange(): void {
    const password = this.newPassword;
    this.passwordRequirements.minLength = password.length >= 6;
    this.passwordRequirements.hasDigit = /\d/.test(password);
    this.passwordRequirements.hasLowercase = /[a-z]/.test(password);
    this.passwordRequirements.hasUppercase = /[A-Z]/.test(password);
    this.passwordRequirements.hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  }

  isFormValid(): boolean {
    return this.email !== '' &&
           this.token !== '' &&
           this.newPassword !== '' &&
           this.confirmPassword !== '' &&
           this.newPassword === this.confirmPassword &&
           this.arePasswordRequirementsMet();
  }

  arePasswordRequirementsMet(): boolean {
    return this.passwordRequirements.minLength &&
           this.passwordRequirements.hasDigit &&
           this.passwordRequirements.hasLowercase &&
           this.passwordRequirements.hasUppercase &&
           this.passwordRequirements.hasSpecialChar;
  }

  onSubmit(): void {
    if (!this.isFormValid() || this.isLoading || this.resetSuccess) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.resetPassword(this.email, this.token, this.newPassword, this.confirmPassword).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.resetSuccess = true;

        this.snackbarManagerService.showSuccessSnackbar(
          new SnackbarUIModel(3, 'Password reset successful!')
        );

        // Redirect to login after 2 seconds
        setTimeout(() => {
          this.router.navigate([LOGIN_ROUTE]);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;

        if (error.status === 400) {
          this.errorMessage = 'Invalid or expired reset token. Please request a new password reset.';
        } else {
          this.errorMessage = 'Failed to reset password. Please try again.';
        }

        this.snackbarManagerService.showFailSnackbar(
          new SnackbarUIModel(5, this.errorMessage)
        );
      }
    });
  }
}
