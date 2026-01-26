import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchResultDTO } from '../../../shared/models/DTOs/Incoming/SearchResultDTO';
import { PUBLIC_PROFILE_ROUTE } from '../../../shared/constants/ViewRoutesConstants';

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

    // Navigate to public profile view with type and id
    const type = this.searchResult.resultType.toLowerCase();
    this.router.navigate([PUBLIC_PROFILE_ROUTE
      .replace(':type', type)
      .replace(':id', this.searchResult.identifier)
    ]);
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
