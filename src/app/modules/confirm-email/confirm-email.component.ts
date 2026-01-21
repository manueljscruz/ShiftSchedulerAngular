import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/api/AuthService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LOGIN_ROUTE } from '../../shared/constants/ViewRoutesConstants';

@Component({
  selector: 'confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit {
  email: string = '';
  token: string = '';
  isLoading: boolean = true;
  confirmationSuccess: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private snackbarManagerService: SnackbarManagerService
  ) {}

  ngOnInit(): void {
    // Get email and token from query params
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.token = params['token'] || '';

      // If missing params, show error
      if (!this.email || !this.token) {
        this.isLoading = false;
        this.errorMessage = 'Invalid confirmation link. Missing email or token.';
        this.redirectToLogin(3000);
        return;
      }

      // Call the API to confirm the email
      this.confirmEmailAddress();
    });
  }

  confirmEmailAddress(): void {
    this.authService.confirmEmail(this.email, this.token).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.confirmationSuccess = true;

        this.snackbarManagerService.showSuccessSnackbar(
          new SnackbarUIModel(3, 'Email confirmed successfully! You can now log in.')
        );

        // Redirect to login after 2 seconds
        this.redirectToLogin(2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.confirmationSuccess = false;

        if (error.status === 400) {
          this.errorMessage = 'Invalid or expired confirmation token.';
        } else if (error.status === 404) {
          this.errorMessage = 'User not found.';
        } else {
          this.errorMessage = 'Email confirmation failed. Please try again or contact support.';
        }

        this.snackbarManagerService.showFailSnackbar(
          new SnackbarUIModel(5, this.errorMessage)
        );

        // Redirect to login after 5 seconds even on error
        this.redirectToLogin(5000);
      }
    });
  }

  private redirectToLogin(delay: number): void {
    setTimeout(() => {
      this.router.navigate([LOGIN_ROUTE]);
    }, delay);
  }
}
