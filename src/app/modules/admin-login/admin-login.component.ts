import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/api/AuthService';
import { LoginDTO } from '../../shared/models/DTOs/Outgoing/LoginDTO';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  email: string = '';
  password: string = '';
  hidePassword: boolean = true;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingScreenService: LoadingSpinnerManagerService,
    private snackbarManagerService: SnackbarManagerService
  ) {}

  async login() {
    if (this.email === '' || this.password === '') {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Please enter email and password'));
      return;
    }

    if (!this.validateEmail()) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Please enter a valid email address'));
      return;
    }

    this.isLoading = true;
    const loginDTO = new LoginDTO(this.email, this.password);

    try {
      const loginResult = await this.authService.login(loginDTO).toPromise();

      if (loginResult && loginResult.user) {
        if (loginResult.emailConfirmed === false) {
          this.isLoading = false;
          this.clearPassword();
          this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Please confirm your email before accessing the admin area.'));
          return;
        }

        if (!loginResult.isAdmin) {
          // Not an admin — clear session immediately
          this.authService.logout().toPromise().catch(() => this.authService.clearAuthState());
          this.isLoading = false;
          this.clearPassword();
          this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(6, 'Access denied. Admin privileges required.'));
          return;
        }

        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(3, `Welcome, ${loginResult.user.userDisplayName}`));
        this.clearPassword();
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.isLoading = false;
        this.clearPassword();
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Login failed. Please check your credentials.'));
      }
    } catch (error: any) {
      this.isLoading = false;
      this.clearPassword();

      let errorMessage = 'Login failed. Please try again.';
      if (error.status === 401) {
        errorMessage = 'Invalid email or password.';
      } else if (error.status === 0) {
        errorMessage = 'Unable to connect to server. Please check your connection.';
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }

      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, errorMessage));
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  private validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  private clearPassword() {
    this.password = '';
  }
}
