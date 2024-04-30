import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { NewWorkerDTO } from '../../../shared/models/DTOs/Outgoing/NewWorkerDTO';
import { GenderLocalizedDTO } from '../../../shared/models/DTOs/Incoming/GenderLocalizedDTO';
import { WorkerService } from '../../../core/services/api/WorkerService';

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
  
  // Holds the selected gender
  selectedGender? : GenderLocalizedDTO;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private loginRegisterService: WorkerService) {
    this.gendersLocalized = data.gendersLocalized;
  }

  async ngOnInit() {

    
  }

  // Handles the form submission
  async onRegisterSubmit(){

    // Validate the form
    let validationResult = this.validateRegisterForm();
    if(!validationResult.Result){
      alert(validationResult.Message);
      return;
    }

    // Register the user
    let newRegister: NewWorkerDTO = new NewWorkerDTO(this.nameInput, this.selectedGender?.GenderId ? this.selectedGender.GenderId : 0, this.emailInput, this.passwordInput);

    // Call the API to register the user
    let response : BaseResponseModel = await this.loginRegisterService.register(newRegister);

    // If successful, close the dialog
    if(response.Result){
      alert(response.Message);
      
    }
    
  }
  

  validateRegisterForm() : BaseResponseModel{
    let emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    let response = new BaseResponseModel(false, '', null);

    if(this.nameInput.trim().length === 0){
      response.Message = `Name is required`;
      return response;
    }

    if(this.selectedGender === undefined){
      response.Message = 'Gender is required';
      return response;
    }

    if(this.emailInput.trim().length === 0){
      response.Message = 'Email is required';
      return response;
    }

    if(!emailRegex.test(this.emailInput)){
      response.Message = 'Invalid Email address';
      return response;
    }

    if(this.passwordInput.trim().length === 0){
      response.Message = 'Password is required';
      return response;
    }

    if(this.confirmPasswordInput.trim().length === 0){
      response.Message = 'Confirm Password is required';
      return response;
    }

    if(this.passwordInput !== this.confirmPasswordInput){
      response.Message = 'Password and Confirm Password do not match';
      return response;
    }

    response.Result = true;
    return response;
  }

}
