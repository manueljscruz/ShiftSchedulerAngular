import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { AuxiliaryDataService } from '../../core/services/api/AuxiliaryDataService'; 
import { GenderLocalizedDTO } from '../../shared/models/DTOs/GenderLocalizedDTO';

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
  constructor(private auxDataService: AuxiliaryDataService) {
    this.genders = [
    ];
  }

  async ngOnInit()
  {
    await this.GetGenders();
  }

  async GetGenders() : Promise<void>{
    this.genders = await this.auxDataService.getGenders();
    // console.log(this.genders);
  }
}
