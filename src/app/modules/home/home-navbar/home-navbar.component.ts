import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';

@Component({
  selector: 'home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})

export class HomeNavbarComponent {

  constructor(private dialog: MatDialog) {}

  openRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterDialogComponent, {
      width: '400px',
      data: { enterAnimationDuration, exitAnimationDuration }
    });
  }

}
