import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { LoginDTO } from '../../shared/models/DTOs/LoginDTO';
import { LoginRegisterService } from '../../core/services/LoginRegisterService';
import { WorkerDTO } from '../../shared/models/DTOs/WorkerDTO';

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


constructor(private loginRegisterService: LoginRegisterService) {
  this.email = '';
  this.password = '';
  this.rememberMe = false;
  this.emailErrorWarningVisible = false;
  this.passwordErrorWarningVisible = false;
}

  async login() {
    let loginDTO: LoginDTO; // Declare the variable here

    if (this.email === '' || this.password === '') {
      alert('Please enter email and password');
      return;
    } else {
      loginDTO = new LoginDTO(this.email, this.password); // Initialize it here

      // Call the login service here
      let loginResult : WorkerDTO = await this.loginRegisterService.login(loginDTO);
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

  }
}
