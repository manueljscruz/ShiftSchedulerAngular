import { Component } from '@angular/core';
import { BOOTSTRAP_ICON_PREFIX, FILTER_ICON } from '../../shared/constants/IconNamesConstants';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { EntityMembersViewModel } from '../../shared/models/UI/EntityMembersViewModel';
import { EntityService } from '../../core/services/api/EntityService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { ActivatedRoute } from '@angular/router';
import { SkillDTO } from '../../shared/models/DTOs/SkillDTO';


@Component({
  selector: 'app-entity-workers',
  templateUrl: './entity-workers.component.html',
  styleUrl: './entity-workers.component.css'
})
export class EntityWorkersComponent {
  public workerQty : number = 50;
  public BOOTSTRAP_ICON_PREFIX: string = BOOTSTRAP_ICON_PREFIX;
  public FILTER_ICON: string = FILTER_ICON;
  public entityMembersViewModel: EntityMembersViewModel;
  public selectedSkill? : SkillDTO;
  private currentEntityId: string = '';
  public isFilterActive: boolean = false;
  
  /// Constructor
  constructor(private entityService : EntityService,
    private snackManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private route: ActivatedRoute
  ) {
    this.entityMembersViewModel = new EntityMembersViewModel([], []);
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
  }

  /// Methods
  
  async ngOnInit() {
    this.loadingScreenService.changeLoadingState(true);
    this.entityMembersViewModel = await this.entityService.getEntityMembersViewModel(this.currentEntityId);
    this.loadingScreenService.changeLoadingState(false);
  }

  // TEMPORARY FUNCTION
  countRange(count: number): number[] {
    return Array(count).fill(0).map((_, index) => index);
  }

  toggleFilters() {
    this.isFilterActive = !this.isFilterActive;
  }
}
