import { Component, Inject } from '@angular/core';
import { LocalService } from '../../core/services/local.service';
import { Router } from '@angular/router';
import { WorkerDTO } from '../../shared/models/DTOs/Incoming/WorkerDTO';
import { EntityWorkerDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerDTO';
import { SideBarItemModel } from '../../shared/models/UI/SideBarItemModel';
import { ENTITY_ICON, ENTITY_ADD_ICON, MEMBERS_ICON, ENTITY_SCHEDULE_ICON } from '../../shared/constants/IconNamesConstants';
import { LANDING_PAGE_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE, DASHBOARD_HOME_ROUTE, NEW_ENTITY_ROUTE, ENTITY_WORKERS_ROUTE, ENTITY_SCHEDULE_ROUTE, ENTITY_FORM_ROUTE } from '../../shared/constants/ViewRoutesConstants';
import { EntityService } from '../../core/services/api/EntityService';
import { SIDEBAR_ITEM_GROUP_ID } from '../../shared/constants/UiContants';
import { SidebarNavigationService } from '../../core/services/ui/sidebar-navigation.service';

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
  entityWorkerDTOs: any = {};

  // UI Data
  showSidebar: boolean = true;
  workEntitiesSideBarItems: SideBarItemModel[] = [];

  constructor(@Inject(LocalService) private localStore: LocalService, 
    private router: Router, 
    private entityService: EntityService,
    private sidebarNavigationService: SidebarNavigationService) {
    this.loggedUser = JSON.parse(this.localStore.getData("loggedUser"));
  }

  async ngOnInit() {
    // If there is no logged user, redirect to login page
    if (!this.loggedUser) {
      this.router.navigate([LOGIN_ROUTE]);
    }

    this.sidebarNavigationService.getWorkEntitiesSideBarItems().subscribe(items => {
      this.workEntitiesSideBarItems = items;
    });

    // Get view model data
    await this.getViewModelData();

    let entityWorkerDTOs = this.entityWorkerDTOs;
    this.sidebarNavigationService.addInitialWorkEntitiesSideBarItems(entityWorkerDTOs);

    
  }

  logout() {
    this.localStore.removeData("loggedUser");
    this.router.navigate([LOGIN_ROUTE]);
  }

  async getViewModelData() {
    // Get data from API
    this.entityWorkerDTOs = await this.entityService.getEntitiesByWorkerId(this.loggedUser.workerId);
  }

}
