import { Component, Input } from '@angular/core';
import { SearchResultDTO } from '../../../shared/models/DTOs/Incoming/SearchResultDTO';

@Component({
  selector: 'search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrl: './search-result-item.component.css'
})
export class SearchResultItemComponent {

  @Input() searchResult?: SearchResultDTO;

  onSearchResultClicked() {
    throw new Error('Method not implemented.');
  }
}
