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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private loginRegisterService: WorkerService,
  private dialog: MatDialog,
  private dialogRef: MatDialogRef<RegisterDialogComponent>,
  private router: Router) {
    this.gendersLocalized = data.gendersLocalized;
  }

  async ngOnInit() {

    
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

    if(!ALPHA_NUMERIC_SPECIAL_REGEX.test(this.passwordInput)){
      response.message = 'Password must contain at least one letter, one number, and one special character';
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
