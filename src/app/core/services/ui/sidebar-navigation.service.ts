import { Injectable } from '@angular/core';
import { SideBarItemModel } from '../../../shared/models/UI/SideBarItemModel';
import { BehaviorSubject } from 'rxjs';
import { EntityWorkerDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerDTO';
import { Entity } from '../../../shared/models/database/entity';
import { SIDEBAR_ITEM_GROUP_ID } from '../../../shared/constants/UiContants';
import { ABSENCE_ICON, ENTITY_ADD_ICON, ENTITY_ICON, ENTITY_SCHEDULE_ICON, MEMBERS_ICON, SHIFT_ICON, SHIFT_RULES_ICON } from '../../../shared/constants/IconNamesConstants';
import { ENTITY_FORM_ROUTE, ENTITY_SCHEDULE_ROUTE, ENTITY_WORKERS_ROUTE, NEW_ENTITY_ROUTE, ENTITY_SHIFTS_ROUTE, ENTITY_RULES_ROUTE, ENTITY_ABSENCES_ROUTE } from '../../../shared/constants/ViewRoutesConstants';

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

    // For each entity, add a sidebar group
    entityWorkerDTOs.forEach(entityWorkerDTO => {
      let entityOptionItems: SideBarItemModel[] = [];

      let encodedEntityId = encodeURIComponent(entityWorkerDTO.entityId);

      // Add Home Button
      entityOptionItems.push(new SideBarItemModel('', "Home", ENTITY_ICON, ENTITY_FORM_ROUTE.replace(':entityId', encodedEntityId), []));
      // Add Members Button
      entityOptionItems.push(new SideBarItemModel('', "Members", MEMBERS_ICON, ENTITY_WORKERS_ROUTE.replace(':entityId', encodedEntityId), []));
      // Add Shifts Options 
      entityOptionItems.push(new SideBarItemModel('', "Shift Management", SHIFT_ICON, ENTITY_SHIFTS_ROUTE.replace(':entityId', encodedEntityId), []));
      // Add Rules Options
      entityOptionItems.push(new SideBarItemModel('', "Rules", SHIFT_RULES_ICON, ENTITY_RULES_ROUTE.replace(':entityId', encodedEntityId), []));

      entityOptionItems.push(new SideBarItemModel('', "Absences", ABSENCE_ICON, ENTITY_ABSENCES_ROUTE.replace(':entityId', encodedEntityId), []));
      // Add Schedule Button
      entityOptionItems.push(new SideBarItemModel('', "Schedule", ENTITY_SCHEDULE_ICON, ENTITY_SCHEDULE_ROUTE.replace(':entityId', encodedEntityId), []));

      entityOptionsItems.push(new SideBarItemModel(SIDEBAR_ITEM_GROUP_ID.replace('{id}', encodedEntityId), entityWorkerDTO.entityName, ENTITY_ICON, "", entityOptionItems));
    
    });

    this.setWorkEntitiesSideBarItems(entityOptionsItems);

    /* Previous implementation
      // Add Shifts Group
      let shiftGroup : SideBarItemModel[] = [];

      // Add Shifts Options to Shift Group
      shiftGroup.push(new SideBarItemModel('', "Shift Management", SHIFT_ICON, ENTITY_SHIFTS_ROUTE.replace(':entityId', entityWorkerDTO.entityId), []));
      shiftGroup.push(new SideBarItemModel('', "Rules", SHIFT_RULES_ICON, ENTITY_RULES_ROUTE.replace(':entityId', entityWorkerDTO.entityId), []));

      // Add Group to Entity Options
      entityOptionItems.push(new SideBarItemModel('', 'Shifts', SHIFT_ICON, "", shiftGroup));
      */
  }

  /// <summary>
  /// Adds a new entity to the sidebar
  /// </summary>
  addNewWorkEntitySideBarItem(newEntity: Entity) {
    let entityOptionItems: SideBarItemModel[] = [];
      
    let encodedEntityId = encodeURIComponent(newEntity.entityId);

    // Add Home Button
    entityOptionItems.push(new SideBarItemModel('', "Home", ENTITY_ICON, ENTITY_FORM_ROUTE.replace(':entityId', encodedEntityId), []));

    // Add Members Button
    entityOptionItems.push(new SideBarItemModel('', "Members", MEMBERS_ICON, ENTITY_WORKERS_ROUTE.replace(':entityId', encodedEntityId), []));

    // Add Shifts Options 
    entityOptionItems.push(new SideBarItemModel('', "Shift Management", SHIFT_ICON, ENTITY_SHIFTS_ROUTE.replace(':entityId', encodedEntityId), []));

    // Add Rules Options
    entityOptionItems.push(new SideBarItemModel('', "Rules", SHIFT_RULES_ICON, ENTITY_RULES_ROUTE.replace(':entityId', encodedEntityId), []));

    entityOptionItems.push(new SideBarItemModel('', "Absences", ABSENCE_ICON, ENTITY_ABSENCES_ROUTE.replace(':entityId', encodedEntityId), []));
    
    // Add Schedule Button
    entityOptionItems.push(new SideBarItemModel('', "Schedule", ENTITY_SCHEDULE_ICON, ENTITY_SCHEDULE_ROUTE.replace(':entityId', encodedEntityId), []));


    let sidebarGroupModel = new SideBarItemModel(SIDEBAR_ITEM_GROUP_ID.replace('{id}', encodedEntityId), newEntity.entityName, ENTITY_ICON, "", entityOptionItems);
 
    let currentItems = this.getWorkEntitiesSideBarItems().value;
    currentItems.push(sidebarGroupModel);
    this.setWorkEntitiesSideBarItems(currentItems);
  }

  /// <summary>
  /// Updates a work entity name from the sidebar
  /// </summary>
  updateWorkEntitySideBarItem(entityId: string, newName: string) {
    let encodedEntityId = encodeURIComponent(entityId);
    let currentItems = this.getWorkEntitiesSideBarItems().value;
    let itemToUpdate = currentItems.find(item => item.sidebarItemId === SIDEBAR_ITEM_GROUP_ID.replace('{id}',encodedEntityId));
    if(!itemToUpdate) return;
    itemToUpdate.updateName(newName);
    this.setWorkEntitiesSideBarItems(currentItems);
  }

  /// <summary>
  /// Deletes a work entity from the sidebar
  /// </summary>
  deleteWorkEntitySideBarItem(entityId: string) {
    let encodedEntityId = encodeURIComponent(entityId);
    let currentItems = this.getWorkEntitiesSideBarItems().value;
    let itemToDelete = currentItems.find(item => item.sidebarItemId === SIDEBAR_ITEM_GROUP_ID.replace('{id}',encodedEntityId));
    if(!itemToDelete) return;
    currentItems = currentItems.filter(item => item.sidebarItemId !== SIDEBAR_ITEM_GROUP_ID.replace('{id}',encodedEntityId));
    this.setWorkEntitiesSideBarItems(currentItems);
  }
}
