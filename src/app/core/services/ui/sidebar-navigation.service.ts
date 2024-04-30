import { Injectable } from '@angular/core';
import { SideBarItemModel } from '../../../shared/models/UI/SideBarItemModel';
import { BehaviorSubject } from 'rxjs';
import { EntityWorkerDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerDTO';
import { Entity } from '../../../shared/models/database/entity';
import { SIDEBAR_ITEM_GROUP_ID } from '../../../shared/constants/UiIDsContants';
import { ENTITY_ADD_ICON, ENTITY_ICON, ENTITY_SCHEDULE_ICON, MEMBERS_ICON } from '../../../shared/constants/IconNamesConstants';
import { ENTITY_FORM_ROUTE, ENTITY_SCHEDULE_ROUTE, ENTITY_WORKERS_ROUTE, NEW_ENTITY_ROUTE } from '../../../shared/constants/ViewRoutesConstants';

@Injectable({
  providedIn: 'root'
})
export class SidebarNavigationService {

  private workEntitiesSideBarItems: BehaviorSubject<SideBarItemModel[]> = new BehaviorSubject<SideBarItemModel[]>([]);

  constructor() 
  { }

  getWorkEntitiesSideBarItems(): BehaviorSubject<SideBarItemModel[]> {
    return this.workEntitiesSideBarItems;
  }

  private setWorkEntitiesSideBarItems(items: SideBarItemModel[]) {
    this.workEntitiesSideBarItems.next(items);
  }

  /// <summary>
  /// Adds the initial sidebar items for the work entities
  /// </summary>
  addInitialWorkEntitiesSideBarItems(entityWorkerDTOs: EntityWorkerDTO[]) {

    // Create general container
    let entityOptionsItems: SideBarItemModel[] = [];

    entityOptionsItems.push(new SideBarItemModel(SIDEBAR_ITEM_GROUP_ID.replace('{id}', 'new'), "New Entity", ENTITY_ADD_ICON, NEW_ENTITY_ROUTE, []));

    // For each entity, add a sidebar group
    entityWorkerDTOs.forEach(entityWorkerDTO => {
      let entityOptionItems: SideBarItemModel[] = [];
      
      // Add Home Button
      entityOptionItems.push(new SideBarItemModel('', "Home", ENTITY_ICON, ENTITY_FORM_ROUTE.replace(':entityId', entityWorkerDTO.EntityId), []));
      // Add Members Button
      entityOptionItems.push(new SideBarItemModel('', "Members", MEMBERS_ICON, ENTITY_WORKERS_ROUTE.replace(':entityId', entityWorkerDTO.EntityId), []));
      // Add Schedule Button
      entityOptionItems.push(new SideBarItemModel('', "Schedule", ENTITY_SCHEDULE_ICON, ENTITY_SCHEDULE_ROUTE.replace(':entityId', entityWorkerDTO.EntityId), []));

      entityOptionsItems.push(new SideBarItemModel(SIDEBAR_ITEM_GROUP_ID.replace('{id}', entityWorkerDTO.EntityId), entityWorkerDTO.EntityName, ENTITY_ICON, "", entityOptionItems));
    
    });

    this.setWorkEntitiesSideBarItems(entityOptionsItems);
  }

  /// <summary>
  /// Adds a new entity to the sidebar
  /// </summary>
  addNewWorkEntitySideBarItem(newEntity: Entity) {
    let entityOptionItems: SideBarItemModel[] = [];
      
    // Add Home Button
    entityOptionItems.push(new SideBarItemModel('', "Home", ENTITY_ICON, ENTITY_FORM_ROUTE.replace(':entityId', newEntity.EntityId), []));

    // Add Members Button
    entityOptionItems.push(new SideBarItemModel('', "Members", MEMBERS_ICON, ENTITY_WORKERS_ROUTE.replace(':entityId', newEntity.EntityId), []));

    // Add Schedule Button
    entityOptionItems.push(new SideBarItemModel('', "Schedule", ENTITY_SCHEDULE_ICON, ENTITY_SCHEDULE_ROUTE.replace(':entityId', newEntity.EntityId), []));

    let sidebarGroupModel = new SideBarItemModel(SIDEBAR_ITEM_GROUP_ID.replace('{id}', newEntity.EntityId), newEntity.EntityName, ENTITY_ICON, "", entityOptionItems);
 
    let currentItems = this.getWorkEntitiesSideBarItems().value;
    currentItems.push(sidebarGroupModel);
    this.setWorkEntitiesSideBarItems(currentItems);
  }

  /// <summary>
  /// Updates a work entity name from the sidebar
  /// </summary>
  updateWorkEntitySideBarItem(entityId: string, newName: string) {
    let currentItems = this.getWorkEntitiesSideBarItems().value;
    let itemToUpdate = currentItems.find(item => item.sidebarItemId === SIDEBAR_ITEM_GROUP_ID.replace('{id}',entityId));
    if(!itemToUpdate) return;
    itemToUpdate.updateName(newName);
    this.setWorkEntitiesSideBarItems(currentItems);
  }

  /// <summary>
  /// Deletes a work entity from the sidebar
  /// </summary>
  deleteWorkEntitySideBarItem(entityId: string) {
    let currentItems = this.getWorkEntitiesSideBarItems().value;
    let itemToDelete = currentItems.find(item => item.sidebarItemId === SIDEBAR_ITEM_GROUP_ID.replace('{id}',entityId));
    if(!itemToDelete) return;
    currentItems = currentItems.filter(item => item.sidebarItemId !== SIDEBAR_ITEM_GROUP_ID.replace('{id}',entityId));
    this.setWorkEntitiesSideBarItems(currentItems);
  }
}
