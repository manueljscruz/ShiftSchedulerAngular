import { Component, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-snackbar',
  templateUrl: './success-snackbar.component.html',
  styleUrl: './success-snackbar.component.css'
})
export class SuccessSnackbarComponent {

  message: string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message;
  }
}
