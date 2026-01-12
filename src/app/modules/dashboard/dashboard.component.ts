import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { EntityWorkerDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerDTO';
import { SideBarItemModel } from '../../shared/models/UI/SideBarItemModel';
import { ENTITY_ICON, ENTITY_ADD_ICON, MEMBERS_ICON, ENTITY_SCHEDULE_ICON } from '../../shared/constants/IconNamesConstants';
import { LANDING_PAGE_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE, DASHBOARD_HOME_ROUTE, NEW_ENTITY_ROUTE, ENTITY_WORKERS_ROUTE, ENTITY_SCHEDULE_ROUTE, ENTITY_FORM_ROUTE } from '../../shared/constants/ViewRoutesConstants';
import { EntityService } from '../../core/services/api/EntityService';
import { SIDEBAR_ITEM_GROUP_ID } from '../../shared/constants/UiContants';
import { SidebarNavigationService } from '../../core/services/ui/sidebar-navigation.service';
import { AuthService } from '../../core/services/api/AuthService';

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
  loggedUser: UserDTO | null = null;
  entityWorkerDTOs: any = {};

  // UI Data
  showSidebar: boolean = true;
  sidebarOpen: boolean = false;
  isMobile: boolean = false;
  workEntitiesSideBarItems: SideBarItemModel[] = [];

  constructor(private router: Router,
    private entityService: EntityService,
    private sidebarNavigationService: SidebarNavigationService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    // Initialize mobile detection
    this.checkScreenSize();

    // Subscribe to current user from AuthService
    this.authService.currentUser$.subscribe(user => {
      this.loggedUser = user;

      // If there is no logged user, redirect to login page
      if (!this.loggedUser) {
        this.router.navigate([LOGIN_ROUTE]);
      }
    });

    this.sidebarNavigationService.getWorkEntitiesSideBarItems().subscribe(items => {
      this.workEntitiesSideBarItems = items;
    });

    // Get view model data
    await this.getViewModelData();

    let entityWorkerDTOs = this.entityWorkerDTOs;
    this.sidebarNavigationService.addInitialWorkEntitiesSideBarItems(entityWorkerDTOs);


  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate([LOGIN_ROUTE]);
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  async getViewModelData() {
    // Get data from API
    if (this.loggedUser) {
      this.entityWorkerDTOs = await this.entityService.getEntitiesByWorkerId(this.loggedUser.userId);
    }
  }

}
