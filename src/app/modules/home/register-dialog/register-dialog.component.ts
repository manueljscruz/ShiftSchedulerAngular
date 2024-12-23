import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { NewWorkerDTO } from '../../../shared/models/DTOs/Outgoing/NewWorkerDTO';
import { GenderLocalizedDTO } from '../../../shared/models/DTOs/Incoming/GenderLocalizedDTO';
import { WorkerService } from '../../../core/services/api/WorkerService';
import { REGISTER_ICON } from '../../../shared/constants/IconNamesConstants';
import { GenericMessageDialogComponent } from '../../../shared/components/generic-message-dialog/generic-message-dialog.component';

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
  private dialog: MatDialog) {
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
    let newRegister: NewWorkerDTO = new NewWorkerDTO(this.nameInput, this.selectedGender?.genderId ? this.selectedGender.genderId : 0, this.emailInput, this.passwordInput);

    // Call the API to register the user
    let response : BaseResponseModel = await this.loginRegisterService.register(newRegister);

    // If successful, close the dialog
    this.openSuccessRegisterDialog('5000ms', '5000ms', 'Register Success', response.message);
  }
  
  private openSuccessRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string, title : string, content : string){
    const dialogRef = this.dialog.open(GenericMessageDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, messageTitle: title, messageText: content}
    });
  }

  validateRegisterForm() : BaseResponseModel{
    let emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
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

    if(!emailRegex.test(this.emailInput)){
      response.message = 'Invalid Email address';
      return response;
    }

    if(this.passwordInput.trim().length === 0){
      response.message = 'Password is required';
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
