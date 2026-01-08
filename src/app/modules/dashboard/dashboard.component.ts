import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalService } from '../../core/services/local.service';
import { Router } from '@angular/router';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { EntityWorkerDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerDTO';
import { SideBarItemModel } from '../../shared/models/UI/SideBarItemModel';
import { ENTITY_ICON, ENTITY_ADD_ICON, MEMBERS_ICON, ENTITY_SCHEDULE_ICON } from '../../shared/constants/IconNamesConstants';
import { LANDING_PAGE_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE, DASHBOARD_HOME_ROUTE, NEW_ENTITY_ROUTE, ENTITY_WORKERS_ROUTE, ENTITY_SCHEDULE_ROUTE, ENTITY_FORM_ROUTE } from '../../shared/constants/ViewRoutesConstants';
import { EntityService } from '../../core/services/api/EntityService';
import { SIDEBAR_ITEM_GROUP_ID } from '../../shared/constants/UiContants';
import { SidebarNavigationService } from '../../core/services/ui/sidebar-navigation.service';

/**
 * Dashboard Component
 *
 * Main container component for the authenticated application area.
 * Implements a responsive layout with:
 * - Desktop: Fixed sidebar (260px) on left, content fills remaining space on right
 * - Mobile: Hamburger menu with overlay drawer, full-width content
 *
 * Responsibilities:
 * - Authentication verification and redirection
 * - Sidebar state management (open/closed)
 * - Loading user's work entities for navigation
 * - Providing logout functionality
 * - Acting as router outlet container for all dashboard child routes
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {

  //#region Constants - Route Links

  // Route constants used in template for navigation
  LANDING_PAGE_ROUTE: string = LANDING_PAGE_ROUTE;
  LOGIN_ROUTE: string = LOGIN_ROUTE;
  DASHBOARD_ROUTE: string = DASHBOARD_ROUTE;
  DASHBOARD_HOME_ROUTE: string = DASHBOARD_HOME_ROUTE;
  NEW_ENTITY_ROUTE: string = NEW_ENTITY_ROUTE;
  ENTITY_WORKERS_ROUTE: string = ENTITY_WORKERS_ROUTE;

  //#endregion

  //#region Data Properties

  /**
   * Currently logged-in user retrieved from LocalStorage.
   * Used for authentication checks and API calls.
   */
  loggedUser: UserDTO;

  /**
   * Entity-Worker relationships for the current user.
   * Contains all organizations/entities the user belongs to.
   */
  entityWorkerDTOs: any = {};

  //#endregion

  //#region UI State Properties

  /**
   * Controls whether sidebar is visible (legacy, currently always true).
   */
  showSidebar: boolean = true;

  /**
   * Controls mobile drawer open/closed state.
   * Only affects mobile view - desktop sidebar is always visible.
   */
  sidebarOpen: boolean = false;

  /**
   * Tracks if the viewport is mobile-sized (<768px).
   * Used to show/hide hamburger menu button in header.
   */
  isMobile: boolean = false;

  /**
   * Sidebar navigation items dynamically built from user's work entities.
   * Populated via SidebarNavigationService after entities are loaded.
   */
  workEntitiesSideBarItems: SideBarItemModel[] = [];

  //#endregion

  //#region Constructor

  constructor(@Inject(LocalService) private localStore: LocalService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private entityService: EntityService,
    private sidebarNavigationService: SidebarNavigationService) {
    // Load logged user from LocalStorage on component initialization
    this.loggedUser = JSON.parse(this.localStore.getData("loggedUser"));

    // Initialize isMobile only in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
    }
  }

  //#endregion

  //#region Sidebar Control Methods

  /**
   * Toggles the mobile sidebar drawer open/closed.
   * Called by hamburger menu button in app-header (mobile only).
   */
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  /**
   * Closes the mobile sidebar drawer.
   * Called automatically when user navigates to a new route on mobile
   * to prevent the drawer from blocking the content view.
   */
  closeSidebar() {
    this.sidebarOpen = false;
  }

  /**
   * Handles window resize events to update mobile detection.
   * Updates isMobile flag and closes sidebar when switching to desktop.
   */
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth < 768;
      if (!this.isMobile) {
        this.sidebarOpen = false;
      }
    }
  }

  //#endregion

  //#region Lifecycle Hooks

  /**
   * Component initialization lifecycle hook.
   *
   * Performs the following tasks:
   * 1. Verifies user authentication - redirects to login if not authenticated
   * 2. Subscribes to sidebar navigation items from service
   * 3. Loads user's work entities from API
   * 4. Populates sidebar with entity navigation items
   */
  async ngOnInit() {
    // Authentication guard - redirect to login if no user is logged in
    if (!this.loggedUser) {
      this.router.navigate([LOGIN_ROUTE]);
    }

    // Subscribe to sidebar navigation items observable
    // This allows the sidebar to update when new entities are added
    this.sidebarNavigationService.getWorkEntitiesSideBarItems().subscribe(items => {
      this.workEntitiesSideBarItems = items;
    });

    // Fetch user's entities from backend API
    await this.getViewModelData();

    // Initialize sidebar with loaded entities
    let entityWorkerDTOs = this.entityWorkerDTOs;
    this.sidebarNavigationService.addInitialWorkEntitiesSideBarItems(entityWorkerDTOs);
  }

  //#endregion

  //#region Authentication Methods

  /**
   * Logs out the current user.
   *
   * Clears user data and authentication tokens from LocalStorage
   * and redirects to the login page.
   */
  logout() {
    this.localStore.removeData("loggedUser");
    this.localStore.removeData("tokenData");
    this.router.navigate([LOGIN_ROUTE]);
  }

  //#endregion

  //#region Data Loading Methods

  /**
   * Loads view model data from the backend API.
   *
   * Fetches all entities (organizations/departments) that the current user
   * is associated with as a worker. This data is used to build the sidebar
   * navigation menu.
   */
  async getViewModelData() {
    this.entityWorkerDTOs = await this.entityService.getEntitiesByWorkerId(this.loggedUser.userId);
  }

  //#endregion

}
