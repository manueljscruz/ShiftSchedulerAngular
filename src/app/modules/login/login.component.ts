import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { LoginDTO } from '../../shared/models/DTOs/LoginDTO';
import { LoginRegisterService } from '../../core/services/LoginRegisterService';
import { WorkerDTO } from '../../shared/models/DTOs/WorkerDTO';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string;
  password: string;
  rememberMe: boolean;
  emailErrorWarningVisible: boolean;
  passwordErrorWarningVisible: boolean;
  isLoading: boolean;

constructor(private loginRegisterService: LoginRegisterService) {
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
    } else {

      this.toggleLoadingSpinner(true);

      loginDTO = new LoginDTO(this.email, this.password); // Initialize it here

      // Call the login service here
      let loginResult : WorkerDTO = await this.loginRegisterService.login(loginDTO);

      await this.wait(3);

      this.toggleLoadingSpinner(false);
    }
  }

  /// <summary>
  /// Validates the email address
  /// </summary>
  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      alert('Please enter a valid email');
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

  private wait(seconds: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  }
}
