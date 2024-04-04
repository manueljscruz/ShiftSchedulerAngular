import { Component, Inject } from '@angular/core';
import { LocalService } from '../../core/services/local.service';
import { Router } from '@angular/router';
import { WorkerDTO } from '../../shared/models/DTOs/WorkerDTO';
import { SideBarItemModel } from '../../shared/models/UI/SideBarItemModel';
import { BOOTSTRAP_ICON_PREFIX, ENTITY_ADD_ICON } from '../../shared/constants/IconNamesConstants';
import { LANDING_PAGE_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE, DASHBOARD_HOME_ROUTE, NEW_ENTITY_ROUTE } from '../../shared/constants/ViewRoutesConstants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  // Constants
  // Route Links
  LANDING_PAGE_ROUTE: string = LANDING_PAGE_ROUTE;
  LOGIN_ROUTE: string = LOGIN_ROUTE;
  DASHBOARD_ROUTE: string = DASHBOARD_ROUTE;
  DASHBOARD_HOME_ROUTE: string = DASHBOARD_HOME_ROUTE;
  NEW_ENTITY_ROUTE: string = NEW_ENTITY_ROUTE;

  
  loggedUser: WorkerDTO;
  workEntitiesSideBarItems: SideBarItemModel[] = [];

  constructor(@Inject(LocalService) private localStore: LocalService, private router: Router) {
    this.loggedUser = JSON.parse(this.localStore.getData("loggedUser"));
  }

  async ngOnInit() {
    // If there is no logged user, redirect to login page
    if (!this.loggedUser) {
      this.router.navigate([LOGIN_ROUTE]);
    }

    // Get view model data
    await this.getViewModelData();

    this.setupViewModel();
  }

  logout() {
    this.localStore.removeData("loggedUser");
    this.router.navigate([LOGIN_ROUTE]);
  }

  async getViewModelData() {
    // Get data from API
    
    

  }

  setupViewModel(){
    this.workEntitiesSideBarItems.push(new SideBarItemModel("New Entity", BOOTSTRAP_ICON_PREFIX+ENTITY_ADD_ICON, NEW_ENTITY_ROUTE));
  }
}
