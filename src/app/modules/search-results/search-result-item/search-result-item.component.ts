import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResultDTO } from '../../../shared/models/DTOs/Incoming/SearchResultDTO';
import { DASHBOARD_ROUTE } from '../../../shared/constants/ViewRoutesConstants';

@Component({
  selector: 'search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrl: './search-result-item.component.css'
})
export class SearchResultItemComponent {

  @Input() searchResult?: SearchResultDTO;

  constructor(private router: Router) {}

  onSearchResultClicked(): void {
    if (!this.searchResult) return;

    // Navigate based on the result type
    if (this.searchResult.resultType === 'Entity') {
      // Navigate to entity dashboard
      this.router.navigate([`${DASHBOARD_ROUTE}/entity-workers`, this.searchResult.identifier]);
    } else if (this.searchResult.resultType === 'Worker') {
      // Navigate to worker profile (or a public profile page if available)
      this.router.navigate([`${DASHBOARD_ROUTE}/profile`], {
        queryParams: { workerId: this.searchResult.identifier }
      });
    }
  }

  /**
   * Returns the appropriate icon based on the result type
   */
  getResultIcon(): string {
    if (!this.searchResult) return 'help_outline';

    switch (this.searchResult.resultType) {
      case 'Worker':
        return 'person';
      case 'Entity':
        return 'business';
      default:
        return 'help_outline';
    }
  }

  /**
   * Returns the appropriate CSS class for the type badge
   */
  getTypeBadgeClass(): string {
    if (!this.searchResult) return '';

    return `type-badge-${this.searchResult.resultType.toLowerCase()}`;
  }
}
