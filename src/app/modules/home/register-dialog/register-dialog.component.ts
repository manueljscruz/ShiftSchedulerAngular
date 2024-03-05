import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { Gender } from '../../../shared/models/gender';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.css'
})

export class RegisterDialogComponent {

  genders: Gender[];

  

  selectedGender? : Gender;

  constructor() {
    this.genders = [
      new Gender(1, 'Male'),
      new Gender(2, 'Female'),
      new Gender(3, 'Non-Binary'),
    ];

  }
}
