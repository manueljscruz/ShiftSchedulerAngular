import { Component, Input } from '@angular/core';
import { BUILDING, DASHBOARD_HOME, PERSON, LOGOUT } from '../../constants/IconNamesConstants';
import { SideBarItemModel } from '../../models/UI/SideBarItemModel';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.css'
})
export class AppSidebarComponent {

  DASHBOARD_HOME: string = DASHBOARD_HOME;
  PERSON: string = PERSON;
  BUILDING: string = BUILDING;
  LOGOUT: string = LOGOUT;

  @Input() workEntitiesSideBarItems : SideBarItemModel[] = [];

  constructor() {
  }



}
