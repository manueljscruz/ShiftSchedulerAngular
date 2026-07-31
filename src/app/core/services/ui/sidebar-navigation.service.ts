import { Injectable } from '@angular/core';
import { SideBarItemModel } from '../../../shared/models/UI/SideBarItemModel';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EntityWorkerDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerDTO';
import { SIDEBAR_ITEM_GROUP_ID } from '../../../shared/constants/UiContants';
import { ABSENCE_ICON, BILLING_ICON, ENTITY_ICON, ENTITY_SCHEDULE_ICON, HOLIDAYS_ICON, MEMBERS_ICON, SHIFT_ICON, SHIFT_RULES_ICON } from '../../../shared/constants/IconNamesConstants';
import { ENTITY_FORM_ROUTE, ENTITY_SCHEDULE_ROUTE, ENTITY_WORKERS_ROUTE, ENTITY_SHIFTS_ROUTE, ENTITY_RULES_ROUTE, ENTITY_ABSENCES_ROUTE, ENTITY_HOLIDAYS_ROUTE, ENTITY_BILLING_ROUTE } from '../../../shared/constants/ViewRoutesConstants';

@Injectable({
  providedIn: 'root'
})
export class SidebarNavigationService {

  private workEntitiesSideBarItems: BehaviorSubject<SideBarItemModel[]> = new BehaviorSubject<SideBarItemModel[]>([]);

  // Tracks how many Level-2 (nested) expansion panels are currently open.
  private nestedPanelsOpen: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  /// <summary>
  /// Emits true whenever at least one nested sidebar panel is open.
  /// Dashboard binds to this to apply the expanded CSS class.
  /// </summary>
  isNestedPanelOpen$(): Observable<boolean> {
    return this.nestedPanelsOpen.pipe(map(count => count > 0));
  }

  /// <summary>
  /// Called by sidebar-item-group when a nested panel opens.
  /// </summary>
  incrementNestedPanels(): void {
    this.nestedPanelsOpen.next(this.nestedPanelsOpen.value + 1);
  }

  /// <summary>
  /// Called by sidebar-item-group when a nested panel closes or the component is destroyed while open.
  /// </summary>
  decrementNestedPanels(): void {
    this.nestedPanelsOpen.next(Math.max(0, this.nestedPanelsOpen.value - 1));
  }

  getWorkEntitiesSideBarItems(): BehaviorSubject<SideBarItemModel[]> {
    return this.workEntitiesSideBarItems;
  }

  private setWorkEntitiesSideBarItems(items: SideBarItemModel[]) {
    this.workEntitiesSideBarItems.next(items);
  }

  /// <summary>
  /// Builds the sidebar tree from a flat list of EntityWorkerDTOs.
  /// Entities with an explicit role get a full feature sub-menu.
  /// Ancestor entities (no role) get only a Home navigation link.
  /// Child entities are nested under their parent using the recursive sidebar-item-group component.
  /// </summary>
  addInitialWorkEntitiesSideBarItems(entityWorkerDTOs: EntityWorkerDTO[]) {

    // Step 1: Create a sidebar node for every entity
    const nodeMap = new Map<string, SideBarItemModel>();

    entityWorkerDTOs.forEach(dto => {
      const encodedId = encodeURIComponent(dto.entityId);
      const node = new SideBarItemModel(
        SIDEBAR_ITEM_GROUP_ID.replace('{id}', encodedId),
        dto.entityName,
        ENTITY_ICON,
        '',
        this.buildFeatureSubItems(dto, encodedId)
      );
      nodeMap.set(dto.entityId, node);
    });

    // Step 2: Build tree — nest child nodes under their parent node
    const rootItems: SideBarItemModel[] = [];

    entityWorkerDTOs.forEach(dto => {
      const node = nodeMap.get(dto.entityId)!;
      if (dto.parentEntityId && nodeMap.has(dto.parentEntityId)) {
        nodeMap.get(dto.parentEntityId)!.sidebarItemChildren.push(node);
      } else {
        rootItems.push(node);
      }
    });

    this.setWorkEntitiesSideBarItems(rootItems);
  }

  /// <summary>
  /// Adds a new entity to the sidebar after creation.
  /// New entities always carry an explicit role (creator is General Manager).
  /// If the entity has a parent already in the sidebar, it is nested under it.
  /// </summary>
  addNewWorkEntitySideBarItem(dto: EntityWorkerDTO) {
    const encodedId = encodeURIComponent(dto.entityId);

    const newNode = new SideBarItemModel(
      SIDEBAR_ITEM_GROUP_ID.replace('{id}', encodedId),
      dto.entityName,
      ENTITY_ICON,
      '',
      this.buildFeatureSubItems(dto, encodedId)
    );

    const currentItems = this.getWorkEntitiesSideBarItems().value;

    if (dto.parentEntityId) {
      const encodedParentId = encodeURIComponent(dto.parentEntityId);
      const parentNode = this.findNodeById(currentItems, SIDEBAR_ITEM_GROUP_ID.replace('{id}', encodedParentId));
      if (parentNode) {
        parentNode.sidebarItemChildren.push(newNode);
        this.setWorkEntitiesSideBarItems([...currentItems]);
        return;
      }
    }

    currentItems.push(newNode);
    this.setWorkEntitiesSideBarItems(currentItems);
  }

  /// <summary>
  /// Updates a work entity name in the sidebar (searches recursively).
  /// </summary>
  updateWorkEntitySideBarItem(entityId: string, newName: string) {
    const encodedId = encodeURIComponent(entityId);
    const currentItems = this.getWorkEntitiesSideBarItems().value;
    const node = this.findNodeById(currentItems, SIDEBAR_ITEM_GROUP_ID.replace('{id}', encodedId));
    if (!node) return;
    node.updateName(newName);
    this.setWorkEntitiesSideBarItems([...currentItems]);
  }

  /// <summary>
  /// Removes a work entity from the sidebar (searches recursively).
  /// </summary>
  deleteWorkEntitySideBarItem(entityId: string) {
    const encodedId = encodeURIComponent(entityId);
    const targetId = SIDEBAR_ITEM_GROUP_ID.replace('{id}', encodedId);
    const currentItems = this.removeNodeById(this.getWorkEntitiesSideBarItems().value, targetId);
    this.setWorkEntitiesSideBarItems(currentItems);
  }

  // #region Private Helpers

  /// <summary>
  /// Builds the feature sub-items for an entity sidebar node.
  /// All entities get a Home link.
  /// Only entities with an explicit role get the full management menu.
  /// </summary>
  private buildFeatureSubItems(dto: EntityWorkerDTO, encodedId: string): SideBarItemModel[] {
    const items: SideBarItemModel[] = [];

    items.push(new SideBarItemModel('', 'Home', ENTITY_ICON, ENTITY_FORM_ROUTE.replace(':entityId', encodedId), []));

    if (dto.entityPermissionRoleId != null) {
      items.push(new SideBarItemModel('', 'Members', MEMBERS_ICON, ENTITY_WORKERS_ROUTE.replace(':entityId', encodedId), []));
      items.push(new SideBarItemModel('', 'Shift Management', SHIFT_ICON, ENTITY_SHIFTS_ROUTE.replace(':entityId', encodedId), []));
      items.push(new SideBarItemModel('', 'Rules', SHIFT_RULES_ICON, ENTITY_RULES_ROUTE.replace(':entityId', encodedId), []));
      items.push(new SideBarItemModel('', 'Holidays', HOLIDAYS_ICON, ENTITY_HOLIDAYS_ROUTE.replace(':entityId', encodedId), []));
      items.push(new SideBarItemModel('', 'Absences', ABSENCE_ICON, ENTITY_ABSENCES_ROUTE.replace(':entityId', encodedId), []));
      items.push(new SideBarItemModel('', 'Schedule', ENTITY_SCHEDULE_ICON, ENTITY_SCHEDULE_ROUTE.replace(':entityId', encodedId), []));
      items.push(new SideBarItemModel('', 'Billing', BILLING_ICON, ENTITY_BILLING_ROUTE.replace(':entityId', encodedId), []));
    }

    return items;
  }

  /// <summary>
  /// Recursively searches a sidebar tree for a node by its sidebarItemId.
  /// </summary>
  private findNodeById(items: SideBarItemModel[], targetId: string): SideBarItemModel | null {
    for (const item of items) {
      if (item.sidebarItemId === targetId) return item;
      if (item.sidebarItemChildren.length > 0) {
        const found = this.findNodeById(item.sidebarItemChildren, targetId);
        if (found) return found;
      }
    }
    return null;
  }

  /// <summary>
  /// Recursively removes a node by sidebarItemId from the tree, returning the updated list.
  /// </summary>
  private removeNodeById(items: SideBarItemModel[], targetId: string): SideBarItemModel[] {
    return items
      .filter(item => item.sidebarItemId !== targetId)
      .map(item => {
        if (item.sidebarItemChildren.length > 0) {
          item.sidebarItemChildren = this.removeNodeById(item.sidebarItemChildren, targetId);
        }
        return item;
      });
  }

  // #endregion
}
