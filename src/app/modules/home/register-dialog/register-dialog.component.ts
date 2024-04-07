import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { NewWorkerDTO } from '../../../shared/models/DTOs/NewWorkerDTO';
import { GenderLocalizedDTO } from '../../../shared/models/DTOs/GenderLocalizedDTO';
import { LoginRegisterService } from '../../../core/services/api/LoginRegisterService';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private loginRegisterService: LoginRegisterService) {
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
    if(response.result){
      alert(response.message);
      
    }
    
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
