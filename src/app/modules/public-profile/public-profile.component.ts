import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../core/services/api/SearchService';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { WorkerPublicProfileDTO } from '../../shared/models/DTOs/Incoming/WorkerPublicProfileDTO';
import { EntityPublicProfileDTO } from '../../shared/models/DTOs/Incoming/EntityPublicProfileDTO';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { SEARCH_RESULTS_ROUTE, ENTITY_WORKERS_ROUTE } from '../../shared/constants/ViewRoutesConstants';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrl: './public-profile.component.css'
})
export class PublicProfileComponent implements OnInit {
  profileType: 'worker' | 'entity' | null = null;
  profileId: string = '';
  isLoading: boolean = true;
  hasError: boolean = false;

  // Worker profile data
  workerProfile: WorkerPublicProfileDTO | null = null;

  // Entity profile data
  entityProfile: EntityPublicProfileDTO | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private loadingService: LoadingSpinnerManagerService,
    private snackbarService: SnackbarManagerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.profileType = params['type'] as 'worker' | 'entity';
      this.profileId = params['id'];

      if (this.profileType && this.profileId) {
        this.loadProfile();
      } else {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  async loadProfile(): Promise<void> {
    this.isLoading = true;
    this.hasError = false;
    this.loadingService.changeLoadingState(true);

    try {
      if (this.profileType === 'worker') {
        await this.loadWorkerProfile();
      } else if (this.profileType === 'entity') {
        await this.loadEntityProfile();
      }
    } catch (error: any) {
      console.error('Error loading profile:', error);
      this.hasError = true;
      this.snackbarService.showFailSnackbar(new SnackbarUIModel(5000, 'Failed to load profile.'));
    } finally {
      this.isLoading = false;
      this.loadingService.changeLoadingState(false);
    }
  }

  private async loadWorkerProfile(): Promise<void> {
    const response = await this.searchService.getWorkerPublicProfile(this.profileId);

    if (response.success && response.result) {
      this.workerProfile = response.result as WorkerPublicProfileDTO;
    } else {
      this.hasError = true;
      if (response.message) {
        this.snackbarService.showFailSnackbar(new SnackbarUIModel(5000, response.message));
      }
    }
  }

  private async loadEntityProfile(): Promise<void> {
    const response = await this.searchService.getEntityPublicProfile(this.profileId);

    if (response.success && response.result) {
      this.entityProfile = response.result as EntityPublicProfileDTO;
    } else {
      this.hasError = true;
      if (response.message) {
        this.snackbarService.showFailSnackbar(new SnackbarUIModel(5000, response.message));
      }
    }
  }

  goBack(): void {
    this.router.navigate([SEARCH_RESULTS_ROUTE]);
  }

  viewEntityDetails(): void {
    if (this.entityProfile) {
      this.router.navigate([ENTITY_WORKERS_ROUTE.replace(':entityId', this.entityProfile.entityId)]);
    }
  }

  getProfileIcon(): string {
    return this.profileType === 'worker' ? 'person' : 'business';
  }

  getProfileTitle(): string {
    if (this.profileType === 'worker' && this.workerProfile) {
      return this.workerProfile.displayName;
    } else if (this.profileType === 'entity' && this.entityProfile) {
      return this.entityProfile.entityName;
    }
    return 'Profile';
  }
}
