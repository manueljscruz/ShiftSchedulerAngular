import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { GenderLocalizedDTO } from '../../../shared/models/DTOs/Incoming/GenderLocalizedDTO';

@Component({
  selector: 'home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css'
})

export class HomeNavbarComponent {

  // Access the navbar element via the template reference
  @ViewChild('navbarNav') navbarNav!: ElementRef;

  @Input() gendersLocalized: GenderLocalizedDTO[];

  constructor(private dialog: MatDialog) {
    this.gendersLocalized = [];
  }

  handleRegisterClick(): void {
    // Collapse the navbar by removing the 'show' class
    const navbar = this.navbarNav.nativeElement;
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }

    // Proceed to open the register dialog
    this.openRegisterDialog('3000ms', '1500ms', this.gendersLocalized);
  }

  openRegisterDialog(enterAnimationDuration: string, exitAnimationDuration: string, gendersLocalized: GenderLocalizedDTO[]): void {
    this.dialog.open(RegisterDialogComponent, {
      width: '400px',
      data: { enterAnimationDuration, exitAnimationDuration, gendersLocalized }
    });
  }
}
