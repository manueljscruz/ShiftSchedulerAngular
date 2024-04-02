import { Component, Inject } from '@angular/core';
import { LocalService } from '../../core/services/local.service';
import { Router } from '@angular/router';
import { WorkerDTO } from '../../shared/models/DTOs/WorkerDTO';
import { SideBarItemModel } from '../../shared/models/UI/SideBarItemModel';
import { BOOTSTRAP_ICON_PREFIX, BUILDING_ADD } from '../../shared/constants/IconNamesConstants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  loggedUser: WorkerDTO;
  workEntitiesSideBarItems: SideBarItemModel[] = [];

  constructor(@Inject(LocalService) private localStore: LocalService, private router: Router) {
    this.loggedUser = JSON.parse(this.localStore.getData("loggedUser"));
  }

  ngOnInit() {
    // If there is no logged user, redirect to login page
    if (!this.loggedUser) {
      this.router.navigate(['/login']);
    }

    // Get view model data
    this.getViewModelData();
  }

  logout() {
    this.localStore.removeData("loggedUser");
    this.router.navigate(['/login']);
  }

  getViewModelData() {
    // Get data from API
    
    this.workEntitiesSideBarItems.push(new SideBarItemModel("New Entity", BOOTSTRAP_ICON_PREFIX+BUILDING_ADD, "/add-entity"));

  }
}
