import { Component, Inject } from '@angular/core';
import { LocalService } from '../../core/services/local.service';
import { Router } from '@angular/router';
import { WorkerDTO } from '../../shared/models/DTOs/WorkerDTO';
import { EntityWorkerDTO } from '../../shared/models/DTOs/EntityWorkerDTO';
import { SideBarItemModel } from '../../shared/models/UI/SideBarItemModel';
import { BOOTSTRAP_ICON_PREFIX, ENTITY_ICON, ENTITY_ADD_ICON, MEMBERS_ICON, ENTITY_SCHEDULE_ICON } from '../../shared/constants/IconNamesConstants';
import { LANDING_PAGE_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE, DASHBOARD_HOME_ROUTE, NEW_ENTITY_ROUTE, ENTITY_WORKERS_ROUTE, ENTITY_SCHEDULE_ROUTE } from '../../shared/constants/ViewRoutesConstants';
import { EntityService } from '../../core/services/api/EntityService';

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
  ENTITY_WORKERS_ROUTE: string = ENTITY_WORKERS_ROUTE;

  // Cached data
  loggedUser: WorkerDTO;
  entityWorkerDTOs: EntityWorkerDTO[] = [];

  // UI Data
  workEntitiesSideBarItems: SideBarItemModel[] = [];

  constructor(@Inject(LocalService) private localStore: LocalService, private router: Router, private entityService: EntityService) {
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
    this.entityWorkerDTOs = await this.entityService.getEntitiesByWorkerId(this.loggedUser.workerId);
  }

  setupViewModel(){
    // Set up the Entities sidebar items
    // Add New Entity Button
    this.workEntitiesSideBarItems.push(new SideBarItemModel("New Entity", BOOTSTRAP_ICON_PREFIX+ENTITY_ADD_ICON, NEW_ENTITY_ROUTE, []));

    // For each entity, add a sidebar group
    this.entityWorkerDTOs.forEach(entityWorkerDTO => {
      let entityOptionItems: SideBarItemModel[] = [];
      
      // Add Members Button
      entityOptionItems.push(new SideBarItemModel("Members", BOOTSTRAP_ICON_PREFIX+MEMBERS_ICON, ENTITY_WORKERS_ROUTE.replace(':entityId', entityWorkerDTO.entityId), []));
      // Add Schedule Button
      entityOptionItems.push(new SideBarItemModel("Schedule", BOOTSTRAP_ICON_PREFIX+ENTITY_SCHEDULE_ICON, ENTITY_SCHEDULE_ROUTE.replace(':entityId', entityWorkerDTO.entityId), []));

      this.workEntitiesSideBarItems.push(new SideBarItemModel(entityWorkerDTO.entityName, BOOTSTRAP_ICON_PREFIX+ENTITY_ICON, "", entityOptionItems));
    });
  }
}
