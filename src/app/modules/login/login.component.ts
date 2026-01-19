import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { LoginDTO } from '../../shared/models/DTOs/Outgoing/LoginDTO';
import { WorkerService } from '../../core/services/api/WorkerService';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { LocalService } from '../../core/services/local.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { SessionService } from '../../core/services/session.service';
import { AuthService } from '../../core/services/api/AuthService';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string;
  password: string;
  hidePassword: boolean = true;
  rememberMe: boolean;
  emailErrorWarningVisible: boolean;
  passwordErrorWarningVisible: boolean;
  isLoading: boolean;

constructor(private loginRegisterService: WorkerService, 
  private authService: AuthService,
  private router: Router, 
  private loadingScreenService: LoadingSpinnerManagerService,
  private snackbarManagerService: SnackbarManagerService,
  private sessionService: SessionService,
  @Inject(LocalService) private localStore: LocalService) {
  this.email = '';
  this.password = '';
  this.rememberMe = false;
  this.emailErrorWarningVisible = false;
  this.passwordErrorWarningVisible = false;
  this.isLoading = false;
}

  async login() {
    // Validation
    if (this.email === '' || this.password === '') {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Please enter email and password'));
      return;
    }

    if (!this.validateEmail()) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Please enter a valid email address'));
      return;
    }

    // Set loading state
    this.isLoading = true;

    const loginDTO = new LoginDTO(this.email, this.password);

    try {
      const loginResult = await this.authService.login(loginDTO).toPromise();

      if (loginResult && loginResult.user) {
        // Show success message
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(3, `Welcome back, ${loginResult.user.userDisplayName}!`));

        // Clear password for security
        this.clearPassword();

        // Navigate to dashboard
        this.router.navigate(['/dashboard']);
      } else {
        this.isLoading = false;
        this.clearPassword();
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Login failed. Please check your credentials.'));
      }
    } catch (error: any) {
      this.isLoading = false;
      this.clearPassword();

      // Provide specific error messages
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

  /// <summary>
  /// Validates the email address
  /// </summary>
  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      return false;
    }
    return true;
  }

  /// <summary>
  /// Toggles the visibility of the loading spinner
  /// </summary>
  private toggleLoadingSpinner(newState: boolean) {
    this.isLoading = newState;
  }

  private clearPassword() {
    this.password = '';
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  forgotPassword() {
    if (!this.isLoading) {
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Please contact the administrator to reset your password'));
    }
  }
}
