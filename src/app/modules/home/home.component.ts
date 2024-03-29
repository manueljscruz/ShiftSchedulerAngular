import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { GenderService } from '../../core/services/GenderService'; // Replace 'path/to/gender.service' with the actual path to the 'GenderService' file
import { GenderLocalizedDTO } from '../../shared/models/DTOs/GenderLocalizedDTO'; // Replace 'path/to/GenderLocalizedDTO' with the actual path to the 'GenderLocalizedDTO' file

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  genders : GenderLocalizedDTO[] = [];
  /**
   *
   */
  constructor(private genderService: GenderService) {
    this.genders = [
    ];
  }

  async ngOnInit()
  {
    await this.GetGenders();
  }

  async GetGenders() : Promise<void>{
    this.genders = await this.genderService.getGenders();
    console.log(this.genders);
  }
}
