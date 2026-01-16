import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { NewUserDTO } from '../../../shared/models/DTOs/Outgoing/NewWorkerDTO';
import { GenderLocalizedDTO } from '../../../shared/models/DTOs/Incoming/GenderLocalizedDTO';
import { WorkerService } from '../../../core/services/api/WorkerService';
import { REGISTER_ICON } from '../../../shared/constants/IconNamesConstants';
import { GenericMessageDialogComponent } from '../../../shared/components/generic-message-dialog/generic-message-dialog.component';
import { EMAIL_REGEX, ALPHA_NUMERIC_SPECIAL_REGEX } from '../../../shared/constants/DataConstants';
import { Router } from '@angular/router';
import { LOGIN_ROUTE } from '../../../shared/constants/ViewRoutesConstants';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.css'
})

export class RegisterDialogComponent {
  
  public gendersLocalized: GenderLocalizedDTO[];

  // Holds user input values
  nameInput: string = '';
  emailInput: string = '';
  passwordInput: string = '';
  confirmPasswordInput: string = '';
  executeActionIcon: string = REGISTER_ICON;

  // Holds the selected gender
  selectedGender? : GenderLocalizedDTO;

  // Password requirements tracking
  passwordRequirements = {
    minLength: false,
    hasDigit: false,
    hasLowercase: false,
    hasUppercase: false,
    hasSpecialChar: false
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private loginRegisterService: WorkerService,
  private dialog: MatDialog,
  private dialogRef: MatDialogRef<RegisterDialogComponent>,
  private router: Router) {
    this.gendersLocalized = data.gendersLocalized;
  }

  async ngOnInit() {

  }

  /**
   * Validates password against all requirements and updates the requirement status
   */
  onPasswordChange() {
    const password = this.passwordInput;

    // Minimum length: 6 characters
    this.passwordRequirements.minLength = password.length >= 6;

    // Has at least one digit (0-9)
    this.passwordRequirements.hasDigit = /\d/.test(password);

    // Has at least one lowercase letter (a-z)
    this.passwordRequirements.hasLowercase = /[a-z]/.test(password);

    // Has at least one uppercase letter (A-Z)
    this.passwordRequirements.hasUppercase = /[A-Z]/.test(password);

    // Has at least one special character
    this.passwordRequirements.hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
  }

  /**
   * Checks if all password requirements are met
   */
  arePasswordRequirementsMet(): boolean {
    return this.passwordRequirements.minLength &&
           this.passwordRequirements.hasDigit &&
           this.passwordRequirements.hasLowercase &&
           this.passwordRequirements.hasUppercase &&
           this.passwordRequirements.hasSpecialChar;
  }

  // Handles the form submission
  async onRegisterSubmit(){

    // Validate the form
    let validationResult = this.validateRegisterForm();
    if(!validationResult.result){
      alert(validationResult.message);
      return;
    }

    // Register the user
    let newRegister: NewUserDTO = new NewUserDTO(this.nameInput, this.selectedGender?.genderId ? this.selectedGender.genderId : 0, this.emailInput, this.passwordInput);

    try {
      // Call the API to register the user
      let response : BaseResponseModel = await this.loginRegisterService.register(newRegister);

      // If successful, show success message and redirect to login
      if (response && response.success) {
        this.openSuccessRegisterDialog('Registration Successful', response.message || 'Your account has been created successfully. Please login to continue.');
      } else {
        alert(response?.message || 'Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error.error?.message || 'Registration failed. Please try again.');
    }
  }
  
  private openSuccessRegisterDialog(title: string, content: string){
    const messageDialogRef = this.dialog.open(GenericMessageDialogComponent, {
      width: '500px',
      data: {
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
        messageTitle: title,
        messageText: content
      }
    });

    // When the success message dialog closes, close the registration dialog and redirect to login
    messageDialogRef.afterClosed().subscribe(() => {
      // Close the registration dialog
      this.dialogRef.close();

      // Redirect to login page
      this.router.navigate([LOGIN_ROUTE]);
    });
  }

  validateRegisterForm() : BaseResponseModel{
    let response = new BaseResponseModel(false, '', null);

    if(this.nameInput.trim().length === 0){
      response.message = `Name is required`;
      return response;
    }

    if(this.selectedGender === undefined){
      response.message = 'Gender is required';
      return response;
    }

    if(this.emailInput.trim().length === 0){
      response.message = 'Email is required';
      return response;
    }

    if(!EMAIL_REGEX.test(this.emailInput)){
      response.message = 'Invalid Email address';
      return response;
    }

    if(this.passwordInput.trim().length === 0){
      response.message = 'Password is required';
      return response;
    }

    // Validate password against all requirements
    if(!this.arePasswordRequirementsMet()){
      response.message = 'Password does not meet all security requirements. Please check the requirements below the password field.';
      return response;
    }

    if(this.confirmPasswordInput.trim().length === 0){
      response.message = 'Confirm Password is required';
      return response;
    }

    if(this.passwordInput !== this.confirmPasswordInput){
      response.message = 'Password and Confirm Password do not match';
      return response;
    }

    response.result = true;
    return response;
  }

}
