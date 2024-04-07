import { Component } from '@angular/core';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {

  
  constructor(private snackbarManagerService: SnackbarManagerService) {
    
  }

  openSnackBar() {
    this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Fail Message'));
  }
  
}
