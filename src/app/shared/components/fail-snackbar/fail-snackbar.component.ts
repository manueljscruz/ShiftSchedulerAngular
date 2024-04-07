import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-fail-snackbar',
  templateUrl: './fail-snackbar.component.html',
  styleUrl: './fail-snackbar.component.css'
})
export class FailSnackbarComponent {

  message: string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    console.log(data);
    this.message = data.message;
  }
}
