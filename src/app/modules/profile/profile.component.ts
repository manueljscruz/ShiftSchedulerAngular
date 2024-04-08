import { Component } from '@angular/core';
import { EDIT_ICON } from '../../shared/constants/IconNamesConstants';
import { GenderLocalizedDTO } from '../../shared/models/DTOs/GenderLocalizedDTO';
import { AuxiliaryDataService } from '../../core/services/api/AuxiliaryDataService';
import { WorkerDTO } from '../../shared/models/DTOs/WorkerDTO';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{

  EDIT_ICON: string = EDIT_ICON;

  public gendersLocalized: GenderLocalizedDTO[] = [];
  selectedGender? : GenderLocalizedDTO;
  loggedUser: WorkerDTO = new WorkerDTO();

  isEditing: boolean = false;

  constructor(private auxDataService: AuxiliaryDataService) { }

  async ngOnInit() {
    // Load the logged user
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    console.log(this.loggedUser);
    // Load the
    this.gendersLocalized = await this.auxDataService.getGenders();

    if (this.loggedUser != null && this.loggedUser.genderId != null) {
      this.selectedGender = this.gendersLocalized.find(g => g.genderId == this.loggedUser?.genderId);
    }
  }

  toggleEditProfile() {
    this.isEditing = !this.isEditing;
  }

  async saveProfile() {

  }
}
