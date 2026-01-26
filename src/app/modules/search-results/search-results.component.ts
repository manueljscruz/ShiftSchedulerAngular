import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { PageEvent } from '@angular/material/paginator';
import { SearchResultsViewModel } from '../../shared/models/VM/SearchResultsViewModel';
import { SearchService } from '../../core/services/api/SearchService';
import { SearchRequestDTO } from '../../shared/models/DTOs/Outgoing/SearchRequestDTO';
import { PagedList } from '../../shared/models/DTOs/Incoming/PagedList';
import { SearchResultDTO } from '../../shared/models/DTOs/Incoming/SearchResultDTO';

@Component({
  selector: 'search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  // Pagination properties
  currentPageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // Search state
  currentQuery: string = '';
  selectedResultType: string = '';
  isLoading: boolean = false;
  hasSearched: boolean = false;

  // Result types for filtering
  resultTypes = [
    { value: '', label: 'All' },
    { value: 'Worker', label: 'Workers' },
    { value: 'Entity', label: 'Entities' }
  ];

  searchResultsViewModel: SearchResultsViewModel = new SearchResultsViewModel();

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private snackManagerService: SnackbarManagerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const query = params['query'] || '';
      const resultType = params['resultType'] || '';

      if (query !== this.currentQuery || resultType !== this.selectedResultType) {
        this.currentQuery = query;
        this.selectedResultType = resultType;
        this.currentPageIndex = 0;

        if (query) {
          this.performSearch();
        }
      }
    });
  }

  async handlePageEvent($event: PageEvent): Promise<void> {
    this.currentPageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    await this.performSearch();
  }

  onFilterChange(): void {
    this.currentPageIndex = 0;
    this.performSearch();
  }

  async performSearch(): Promise<void> {
    if (!this.currentQuery.trim()) {
      return;
    }

    this.isLoading = true;
    this.loadingScreenService.changeLoadingState(true);

    const searchRequest = new SearchRequestDTO(
      '',
      '',
      '',
      this.currentPageIndex,
      this.currentPageIndex + 1,
      this.pageSize,
      this.currentQuery,
      this.selectedResultType || undefined
    );

    try {
      const response = await this.searchService.search(searchRequest);

      if (response.success && response.result) {
        this.searchResultsViewModel.resultList = new PagedList<SearchResultDTO>(
          response.result.data || [],
          response.result.currentPage,
          response.result.pageSize,
          response.result.totalCount
        );
      } else {
        this.searchResultsViewModel.resultList = PagedList.Empty<SearchResultDTO>();
        if (response.message) {
          this.snackManagerService.openSnackBar(response.message, 'Close');
        }
      }
    } catch (error: any) {
      console.error('Search error:', error);
      this.snackManagerService.openSnackBar('An error occurred while searching.', 'Close');
      this.searchResultsViewModel.resultList = PagedList.Empty<SearchResultDTO>();
    } finally {
      this.isLoading = false;
      this.hasSearched = true;
      this.loadingScreenService.changeLoadingState(false);
    }
  }

  get hasResults(): boolean {
    return this.searchResultsViewModel.resultList.data.length > 0;
  }

  get showNoResults(): boolean {
    return this.hasSearched && !this.hasResults && !this.isLoading;
  }
}
