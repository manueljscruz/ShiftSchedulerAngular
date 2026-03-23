import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ENTITY_ICON, ENTITY_ADD_ICON, DASHBOARD_HOME_ICON, PROFILE_ICON, LOGOUT_ICON, SETTINGS_ICON, HELP_ICON, INVITATIONS_ICON } from '../../constants/IconNamesConstants';
import { SideBarItemModel } from '../../models/UI/SideBarItemModel';
import { LANDING_PAGE_ROUTE, DASHBOARD_ROUTE, DASHBOARD_HOME_ROUTE, PROFILE_ROUTE, NEW_ENTITY_ROUTE, SETTINGS_ROUTE, HELP_ROUTE, MY_INVITATIONS_ROUTE } from '../../constants/ViewRoutesConstants';
import { SIDERBAR_ITEM_GROUP_ENTITIES_CONTAINER } from '../../constants/UiContants';
import { MatDivider } from "@angular/material/divider";

/**
 * App Sidebar Component
 *
 * Main navigation sidebar for the application.
 * Displays hierarchical navigation menu with:
 * - Top section: Dashboard, Profile, New Entity
 * - Middle section: User's work entities (dynamic, expandable groups)
 * - Bottom section: Settings, Help, Logout
 *
 * Responsive behavior:
 * - Desktop: Always visible, fixed width (260px)
 * - Mobile: Rendered inside mat-sidenav drawer, overlay mode
 *
 * Event propagation:
 * - Emits navigationEvent when any menu item is clicked (used to close mobile drawer)
 * - Emits logoutEvent when logout is clicked (handled by parent dashboard)
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.css'
})
export class AppSidebarComponent {

  //#region Constants - Icon Names

  // Bootstrap icon names for sidebar menu items
  DASHBOARD_HOME_ICON: string = DASHBOARD_HOME_ICON;
  PROFILE_ICON: string = PROFILE_ICON;
  ENTITY_ICON: string = ENTITY_ICON;
  LOGOUT_ICON: string = LOGOUT_ICON;
  ENTITY_ADD_ICON: string = ENTITY_ADD_ICON;
  SETTINGS_ICON: string = SETTINGS_ICON;
  HELP_ICON: string = HELP_ICON;
  INVITATIONS_ICON: string = INVITATIONS_ICON;

  //#endregion

  //#region Constants - Route Names

  // Route paths used for navigation in template
  LANDING_PAGE_ROUTE: string = LANDING_PAGE_ROUTE;
  DASHBOARD_ROUTE: string = DASHBOARD_ROUTE;
  DASHBOARD_HOME_ROUTE: string = DASHBOARD_HOME_ROUTE;
  PROFILE_ROUTE: string = PROFILE_ROUTE;
  NEW_ENTITY_ROUTE: string = NEW_ENTITY_ROUTE;
  SETTINGS_ROUTE: string = SETTINGS_ROUTE;
  HELP_ROUTE: string = HELP_ROUTE;
  MY_INVITATIONS_ROUTE: string = MY_INVITATIONS_ROUTE;

  //#endregion

  //#region Properties

  // UI container ID constant (currently unused but available for DOM queries)
  SIDERBAR_ITEM_GROUP_ENTITIES_CONTAINER: string = SIDERBAR_ITEM_GROUP_ENTITIES_CONTAINER;

  /**
   * Dynamically populated work entities for the current user.
   * Each entity becomes an expandable group in the middle section of the sidebar.
   * Passed down from dashboard component after loading from API.
   */
  @Input() workEntitiesSideBarItems : SideBarItemModel[] = [];

  /**
   * Emitted when user clicks the logout menu item.
   * Handled by dashboard component to perform logout logic.
   */
  @Output() logoutEvent = new EventEmitter<void>();

  /**
   * Emitted when user clicks any navigation menu item.
   * Used on mobile to automatically close the drawer after navigation.
   * Event propagates from child sidebar-item and sidebar-item-group components.
   */
  @Output() navigationEvent = new EventEmitter<void>();

  //#endregion

  //#region Constructor

  constructor() {
  }

  //#endregion

  //#region Event Handlers

  /**
   * Handles logout button click.
   * Emits logoutEvent to parent dashboard component for handling.
   */
  onLogoutClick(){
    this.logoutEvent.emit();
  }

  /**
   * Handles navigation click from child components.
   * Propagates the event up to dashboard to close mobile drawer.
   * Called when any sidebar-item or nested sidebar-item-group is clicked.
   */
  onNavigationClick(){
    this.navigationEvent.emit();
  }

  //#endregion

}
