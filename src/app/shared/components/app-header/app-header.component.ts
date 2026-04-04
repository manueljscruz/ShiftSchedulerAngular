import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SEARCH_RESULTS_ROUTE, NOTIFICATIONS_ROUTE } from '../../constants/ViewRoutesConstants';
import { NotificationService } from '../../../core/services/api/NotificationService';

/**
 * App Header Component
 *
 * Top application bar displayed across all dashboard views.
 * Contains:
 * - Hamburger menu button (mobile only) - toggles sidebar drawer
 * - Global search field - searches across all entities and workers
 *
 * Responsive behavior:
 * - Mobile: Shows hamburger menu button, search field full width
 * - Desktop: No menu button, search field max 400px width
 *
 * The header height is fixed at:
 * - Desktop: 80px
 * - Mobile: 64px
 * Content area calculations account for this in dashboard layout.
 */
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {

  //#region Constants

  // Route constants
  SEARCH_RESULTS_ROUTE = SEARCH_RESULTS_ROUTE;
  NOTIFICATIONS_ROUTE = NOTIFICATIONS_ROUTE;

  //#endregion

  //#region Input/Output Properties

  /**
   * Controls visibility of hamburger menu button.
   * Set to true on mobile, false on desktop.
   * Managed by parent dashboard component based on layout.
   */
  @Input() showMenuButton: boolean = false;

  /**
   * Emitted when hamburger menu button is clicked.
   * Handled by dashboard component to toggle mobile sidebar drawer.
   */
  @Output() menuButtonClicked = new EventEmitter<void>();

  //#endregion

  //#region Data Properties

  /**
   * User's search query input.
   * Bound to search input field via ngModel.
   */
  public searchInput: string = '';

  //#endregion

  //#region Constructor

  constructor(private elRef: ElementRef,
    private router: Router,
    public notificationService: NotificationService
  ) {

  }

  //#endregion

  //#region Event Handlers

  /**
   * Handles hamburger menu button click.
   * Emits event to parent dashboard to toggle mobile sidebar.
   */
  onMenuButtonClick() {
    this.menuButtonClicked.emit();
  }

  goToNotifications() {
    this.router.navigate([NOTIFICATIONS_ROUTE]);
  }

  //#endregion

  //#region Lifecycle Hooks

  /**
   * After view initialization lifecycle hook.
   *
   * Performs DOM cleanup to remove Angular Material's subscript wrapper elements.
   * The subscript wrapper normally displays hint text and error messages below
   * form fields, but in this header we want a compact layout without extra space.
   *
   * Note: This is a workaround for Material Design's opinionated styling.
   * Consider using appearance="outline" or "fill" if this causes issues.
   */
  ngAfterViewInit(): void {
    const subscriptWrappers =
      this.elRef.nativeElement.querySelectorAll(
        '.mat-mdc-form-field-subscript-wrapper'
      );

    subscriptWrappers.forEach((el: HTMLElement) => el.remove());
  }

  //#endregion

  //#region Search Functionality

  /**
   * Handles Enter key press in search field.
   *
   * Validates input (must not be empty after trimming) and navigates
   * to search results page with query parameter.
   *
   * Example: User types "John" and presses Enter
   * Result: Navigation to /search-results?query=John
   */
  onEnter() {
    let query = this.searchInput.trim();
    if(query.length === 0) {
      return;
    }

    this.router.navigate([SEARCH_RESULTS_ROUTE],{
      queryParams: { query: query }
    });
  }

  //#endregion
}
