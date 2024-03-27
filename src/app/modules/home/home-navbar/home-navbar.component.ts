import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { GenderLocalizedDTO } from '../../../shared/models/DTOs/GenderLocalizedDTO';

@Component({
  selector: 'home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})

export class HomeNavbarComponent {

  @Input() gendersLocalized: GenderLocalizedDTO[];

  constructor(private dialog: MatDialog) {
    this.gendersLocalized = [];
  }

  openRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string, gendersLocalized: GenderLocalizedDTO[]): void {
    this.dialog.open(RegisterDialogComponent, {
      width: '400px',
      data: { enterAnimationDuration, exitAnimationDuration, gendersLocalized }
    });
  }

}
