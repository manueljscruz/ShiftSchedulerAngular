import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { PageEvent } from '@angular/material/paginator';
import { SearchResultsViewModel } from '../../shared/models/VM/SearchResultsViewModel';
import { SearchResultDTO } from '../../shared/models/DTOs/Incoming/SearchResultDTO';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
handlePageEvent($event: PageEvent) {
throw new Error('Method not implemented.');
}
  // Pagination properties
  currentPageIndex = 0;

  pageSize = 10;

  totalItems = 0;

  pageSizeOptions: number[] = [5, 10, 25, 100];

  searchResultsViewModel : SearchResultsViewModel = new SearchResultsViewModel();


  constructor(private route: ActivatedRoute, 
    loadingScreenService: LoadingSpinnerManagerService,
    snackManagerService: SnackbarManagerService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['query'] || '';
      this.performSearch(query);
    });
  }

  async performSearch(query: string): Promise<void> {
    this.searchResultsViewModel.resultList.data.push(new SearchResultDTO('1', 'Worker', 'John Doe', 'Worker'),
    new SearchResultDTO('2', 'Entity', 'Unidade Hospitalar', 'Hospital'));
  }
}
