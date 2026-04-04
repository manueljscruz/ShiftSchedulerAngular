import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
import { NotificationService } from '../../core/services/api/NotificationService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnDestroy {

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
  isSidebarExpanded: boolean = false;
  workEntitiesSideBarItems: SideBarItemModel[] = [];

  // Subscription management
  private destroy$ = new Subject<void>();

  constructor(private router: Router,
    private entityService: EntityService,
    private sidebarNavigationService: SidebarNavigationService,
    private authService: AuthService,
    private notificationService: NotificationService) {
  }

  async ngOnInit() {
    // Start notification polling
    this.notificationService.startPolling();

    // Initialize mobile detection
    this.checkScreenSize();

    // Wait for auth initialization before subscribing
    await this.authService.waitForInitialization();

    // Subscribe to current user - now safe from race condition
    this.authService.currentUser$.pipe(
      takeUntil(this.destroy$) // Unsubscribe on component destroy
    ).subscribe(async user => {
      this.loggedUser = user;

      // If no logged user AFTER initialization, redirect to login
      if (!this.loggedUser) {
        this.router.navigate([LOGIN_ROUTE]);
      } else {
        // Only fetch data when user is confirmed
        await this.getViewModelData();

        let entityWorkerDTOs = this.entityWorkerDTOs;
        this.sidebarNavigationService.addInitialWorkEntitiesSideBarItems(entityWorkerDTOs);
      }
    });

    this.sidebarNavigationService.getWorkEntitiesSideBarItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.workEntitiesSideBarItems = items;
      });

    this.sidebarNavigationService.isNestedPanelOpen$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(isExpanded => {
        this.isSidebarExpanded = isExpanded;
      });
  }

  ngOnDestroy() {
    this.notificationService.stopPolling();
    this.destroy$.next();
    this.destroy$.complete();
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
      try {
        this.entityWorkerDTOs = await this.entityService.getEntitiesByWorkerId(this.loggedUser.userId);
      } catch (error) {
        console.error('Failed to load entities:', error);
        // Error will be handled by interceptor
      }
    }
  }

}
