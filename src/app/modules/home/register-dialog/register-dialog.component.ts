import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { Gender } from '../../../shared/models/database/gender';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { NewWorkerDTO } from '../../../shared/models/DTOs/NewWorkerDTO';
import { GenderLocalizedDTO } from '../../../shared/models/DTOs/GenderLocalizedDTO';

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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.gendersLocalized = data.gendersLocalized;
  }

  async ngOnInit() {

    
  }

  // Handles the form submission
  onRegisterSubmit(){

    // Validate the form
    let validationResult = this.validateRegisterForm();
    if(!validationResult.result){
      alert(validationResult.errorMessage);
      return;
    }

    // Register the user
    let newRegister: NewWorkerDTO = new NewWorkerDTO(this.nameInput, this.selectedGender?.genderId ? this.selectedGender.genderId : 0, this.emailInput, this.passwordInput);

    console.log(newRegister);
  }
  

  validateRegisterForm() : BaseResponseModel{
    let emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    let response = new BaseResponseModel(false, '', '', null);

    if(this.nameInput.trim().length === 0){
      response.errorMessage = 'Name is required';
      return response;
    }

    if(this.selectedGender === undefined){
      response.errorMessage = 'Gender is required';
      return response;
    }

    if(this.emailInput.trim().length === 0){
      response.errorMessage = 'Email is required';
      return response;
    }

    if(!emailRegex.test(this.emailInput)){
      response.errorMessage = 'Invalid Email address';
      return response;
    }

    if(this.passwordInput.trim().length === 0){
      response.errorMessage = 'Password is required';
      return response;
    }

    if(this.confirmPasswordInput.trim().length === 0){
      response.errorMessage = 'Confirm Password is required';
      return response;
    }

    if(this.passwordInput !== this.confirmPasswordInput){
      response.errorMessage = 'Password and Confirm Password do not match';
      return response;
    }

    response.result = true;
    return response;
  }

}
