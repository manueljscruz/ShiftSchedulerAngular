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
    let loginDTO: LoginDTO; // Declare the variable here

    if (this.email === '' || this.password === '') {
      alert('Please enter email and password');
      return;
    }
    else if (!this.validateEmail()) {
      alert('Please enter a valid email');
      return;
    }
    else {

      this.loadingScreenService.changeLoadingState(true);

      loginDTO = new LoginDTO(this.email, this.password); // Initialize it here

      try {
        const loginResult = await this.authService.login(loginDTO).toPromise();

        this.clearPassword();

        this.loadingScreenService.changeLoadingState(false);

        if (loginResult && loginResult.user) {
          // No need to manually store in localStorage/sessionStorage
          // The AuthService BehaviorSubject is already updated via tap() operator
          this.router.navigate(['/dashboard']);
        } else {
          this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Login failed'));
        }
      } catch (error: any) {
        this.clearPassword();
        this.loadingScreenService.changeLoadingState(false);
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, error.error?.message || 'Login failed'));
      }
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
    this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Please contact the administrator to reset your password'));
  }
}
