import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ENTITY_ICON, ENTITY_ADD_ICON, DASHBOARD_HOME_ICON, PROFILE_ICON, LOGOUT_ICON } from '../../constants/IconNamesConstants';
import { SideBarItemModel } from '../../models/UI/SideBarItemModel';
import { LANDING_PAGE_ROUTE, DASHBOARD_ROUTE, DASHBOARD_HOME_ROUTE, PROFILE_ROUTE, NEW_ENTITY_ROUTE } from '../../constants/ViewRoutesConstants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.css'
})
export class AppSidebarComponent {

  // Constants
  // Icon names
  DASHBOARD_HOME_ICON: string = DASHBOARD_HOME_ICON;
  PROFILE_ICON: string = PROFILE_ICON;
  ENTITY_ICON: string = ENTITY_ICON;
  LOGOUT_ICON: string = LOGOUT_ICON;

  // Route Names
  LANDING_PAGE_ROUTE: string = LANDING_PAGE_ROUTE;
  DASHBOARD_ROUTE: string = DASHBOARD_ROUTE;
  DASHBOARD_HOME_ROUTE: string = DASHBOARD_HOME_ROUTE;
  PROFILE_ROUTE: string = PROFILE_ROUTE;
  NEW_ENTITY_ROUTE: string = NEW_ENTITY_ROUTE;


  // Properties
  @Input() workEntitiesSideBarItems : SideBarItemModel[] = [];
  @Output() logoutEvent = new EventEmitter<void>();

  constructor() {
  }

  onLogoutClick(){
    this.logoutEvent.emit();
  }

}
