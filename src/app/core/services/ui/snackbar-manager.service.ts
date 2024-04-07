import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import { SuccessSnackbarComponent } from '../../../shared/components/success-snackbar/success-snackbar.component';
import { FailSnackbarComponent } from '../../../shared/components/fail-snackbar/fail-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarManagerService {

  constructor(private snackBar: MatSnackBar) { }
  
  showSuccessSnackbar(snackbarInstance : SnackbarUIModel){
    this.snackBar.openFromComponent(SuccessSnackbarComponent, {
      duration: snackbarInstance.duration * 1000,
      data: {message: snackbarInstance.message}
    });
  }

  showFailSnackbar(snackbarInstance : SnackbarUIModel){
    this.snackBar.openFromComponent(FailSnackbarComponent, {
      duration: snackbarInstance.duration * 1000,
      data: {message: snackbarInstance.message}
    });
  }
}
