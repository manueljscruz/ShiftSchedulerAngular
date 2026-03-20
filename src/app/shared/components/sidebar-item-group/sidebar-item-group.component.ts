import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BOOTSTRAP_ICON_PREFIX } from '../../constants/IconNamesConstants';
import { SideBarItemModel } from '../../models/UI/SideBarItemModel';
import { SidebarNavigationService } from '../../../core/services/ui/sidebar-navigation.service';

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
export class SidebarItemGroupComponent implements OnDestroy {

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

  /**
   * True when this group is rendered inside another sidebar-item-group (Level 2+).
   * When true, opening/closing this panel updates the sidebar width counter.
   */
  @Input() public isNested: boolean = false;

  //#endregion

  //#region Output Events

  /**
   * Emitted when any child item (or nested child) is clicked.
   * Propagates navigation events up the component tree to dashboard.
   * Used to close mobile drawer after navigation.
   */
  @Output() navigationEvent = new EventEmitter<void>();

  //#endregion

  //#region Private State

  // Tracks whether this panel is currently open, used by ngOnDestroy to avoid counter drift.
  private isPanelOpen: boolean = false;

  //#endregion

  //#region Constructor

  constructor(private sidebarNavigationService: SidebarNavigationService) { }

  //#endregion

  //#region Event Handlers

  /**
   * Handles navigation click from any child component.
   * Propagates the event up to parent component.
   */
  onChildNavigationClick() {
    this.navigationEvent.emit();
  }

  /// <summary>
  /// Called when the mat-expansion-panel opens.
  /// Increments the nested panel counter when this is a Level-2+ group.
  /// </summary>
  onPanelOpened(): void {
    this.isPanelOpen = true;
    if (this.isNested) this.sidebarNavigationService.incrementNestedPanels();
  }

  /// <summary>
  /// Called when the mat-expansion-panel closes.
  /// Decrements the nested panel counter when this is a Level-2+ group.
  /// </summary>
  onPanelClosed(): void {
    this.isPanelOpen = false;
    if (this.isNested) this.sidebarNavigationService.decrementNestedPanels();
  }

  //#endregion

  //#region Lifecycle Hooks

  ngOnInit() { }

  ngOnChanges() { }

  /// <summary>
  /// Decrements the counter if this nested panel is destroyed while still open,
  /// preventing the sidebar from staying permanently wide.
  /// </summary>
  ngOnDestroy(): void {
    if (this.isNested && this.isPanelOpen) {
      this.sidebarNavigationService.decrementNestedPanels();
    }
  }

  //#endregion
}
