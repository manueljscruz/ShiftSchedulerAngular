import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BOOTSTRAP_ICON_PREFIX } from '../../constants/IconNamesConstants';
import { SideBarItemModel } from '../../models/UI/SideBarItemModel';

/**
 * Sidebar Item Group Component
 *
 * Recursive expandable menu group component used in the sidebar.
 * Built using Angular Material Expansion Panel for expand/collapse functionality.
 *
 * Features:
 * - Displays a group header with icon and text
 * - Contains child items that can be either:
 *   - Simple navigation items (sidebar-item)
 *   - Nested groups (sidebar-item-group) - supports unlimited nesting
 * - Automatically determines child type based on sidebarItemChildren array length
 *
 * Use cases:
 * - Work entity groups containing Workers, Shifts, Schedule, Rules, Absences
 * - Any hierarchical navigation structure
 *
 * Event propagation:
 * - Bubbles navigationEvent from child items up to parent (ultimately to dashboard)
 * - Ensures mobile drawer closes when any nested item is clicked
 */
@Component({
  selector: 'sidebar-item-group',
  templateUrl: './sidebar-item-group.component.html',
  styleUrl: './sidebar-item-group.component.css'
})
export class SidebarItemGroupComponent {

  //#region Constants

  // Bootstrap icon prefix for icon class names
  BOOTSTRAP_ICON_PREFIX: string = BOOTSTRAP_ICON_PREFIX;

  //#endregion

  //#region Input Properties

  /**
   * Unique identifier for this group.
   * Used as ID for the mat-expansion-panel element.
   */
  @Input() public sidebarItemGroupId: string = '';

  /**
   * Display text for the group header.
   * Example: "ABC Corporation", "Marketing Department"
   */
  @Input() public sidebarItemGroupText: string = '';

  /**
   * Array of child navigation items.
   * Can contain:
   * - Simple items (sidebarItemChildren.length === 0) - renders as sidebar-item
   * - Nested groups (sidebarItemChildren.length > 0) - renders as sidebar-item-group
   */
  @Input() public sidebarGroupItems: SideBarItemModel[] = [];

  /**
   * Icon name (without prefix) for the group header.
   * Combined with BOOTSTRAP_ICON_PREFIX in template.
   * Example: "building" becomes "bi bi-building"
   */
  @Input() public sidebarItemGroupIcon: string = '';

  //#endregion

  //#region Output Events

  /**
   * Emitted when any child item (or nested child) is clicked.
   * Propagates navigation events up the component tree to dashboard.
   * Used to close mobile drawer after navigation.
   */
  @Output() navigationEvent = new EventEmitter<void>();

  //#endregion

  //#region Constructor

  constructor()
  {

  }

  //#endregion

  //#region Event Handlers

  /**
   * Handles navigation click from any child component.
   * Propagates the event up to parent component.
   * Called by both sidebar-item and nested sidebar-item-group children.
   */
  onChildNavigationClick() {
    this.navigationEvent.emit();
  }

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit()
  {
    // Debug logging available if needed
    // console.log(this.sidebarGroupItems);
  }

  /**
   * Change detection hook.
   * Currently empty but available for responding to input changes.
   * Could be used to react to dynamic sidebar structure updates.
   */
  ngOnChanges()
  {

  }

  //#endregion
}
