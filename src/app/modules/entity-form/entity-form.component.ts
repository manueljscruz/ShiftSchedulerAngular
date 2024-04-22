import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntityService } from '../../core/services/api/EntityService';
import { LocalService } from '../../core/services/local.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { EntityProfileViewModel } from '../../shared/models/VM/EntityProfileViewModel';
import { WorkerDTO } from '../../shared/models/DTOs/Incoming/WorkerDTO';
import { EntityDTO } from '../../shared/models/DTOs/Incoming/EntityDTO';

@Component({
  selector: 'entity-form',
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.css'
})

export class EntityFormComponent {
  entityProfileViewModel: EntityProfileViewModel = new EntityProfileViewModel(new EntityDTO('','','','',0), false, []);
  currentEntityId: string = '';
  loggedUser: WorkerDTO = new WorkerDTO();
  userLanguage: string = '';

  constructor(private route: ActivatedRoute,
    private entityService: EntityService,
    private localService: LocalService,
    private loadingScreenService: LoadingSpinnerManagerService
  ) {
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.userLanguage = navigator.language;
    if(this.userLanguage.indexOf('-') > 0)
    {
      this.userLanguage = this.userLanguage.split('-')[0];
    }
  }

  async ngOnInit() {
    this.loadingScreenService.changeLoadingState(true);
    let entityProfileViewModelRequestDTO = {
      entityId: this.currentEntityId,
      workerId: this.loggedUser.workerId,
      languageCode: this.userLanguage
    };
    this.entityProfileViewModel = await this.entityService.getEntityProfileViewModel(entityProfileViewModelRequestDTO);
    this.loadingScreenService.changeLoadingState(false);
  }

  /*
  private route: ActivatedRoute
  ) {
    this.entityMembersViewModel = new EntityMembersViewModel("", [], []);
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
  */
}
