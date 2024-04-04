import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AuxiliaryDataService } from '../../core/services/AuxiliaryDataService';
import { EntityTypeLocalizedDTO } from '../../shared/models/DTOs/EntityTypeLocalizedDTO';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { NewEntityDTO } from '../../shared/models/DTOs/NewEntityDTO';
import { LocalService } from '../../core/services/local.service';
import { WorkerDTO } from '../../shared/models/DTOs/WorkerDTO';
import { EntityService } from '../../core/services/EntityService';
import { LoadingSpinnerManagerService } from '../../core/services/loading-spinner-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-entity',
  templateUrl: './new-entity.component.html',
  styleUrl: './new-entity.component.css',
})
export class NewEntityComponent {

  entityTypes: EntityTypeLocalizedDTO[] = [];

  loggedInUser: WorkerDTO;
  entityNameInput : string = '';
  selectedEntityType?: EntityTypeLocalizedDTO;
  entityDescriptionInput : string = '';
  
  isLoading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(@Inject(LocalService) private localStore: LocalService, private auxDataService: AuxiliaryDataService, private entityService: EntityService,
    private loadingScreenService: LoadingSpinnerManagerService) {
    this.loggedInUser = JSON.parse(this.localStore.getData("loggedUser"));
  }


  async ngOnInit() {
    this.entityTypes = await this.auxDataService.getEntityTypes();
    this.subscription = this.loadingScreenService.currentIsLoading.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /// Handles the form submission
  async onCreateEntitySubmit() {
    let validationResult = this.validateNewEntityForm();
    
    if(!validationResult.result){
      alert(validationResult.message);
      return;
    }

    // Trigger loading screen
    this.isLoading = true;

    let newEntity: NewEntityDTO = new NewEntityDTO(this.entityNameInput, this.selectedEntityType?.entityTypeId ? this.selectedEntityType.entityTypeId : 0, this.entityDescriptionInput, this.loggedInUser.workerId);
    console.log(newEntity);

    // Call the API to create the new entity
    // let response : BaseResponseModel = await this.entityService.addEntity(newEntity);
    this.loadingScreenService.changeLoadingState(true);
    
    await this.wait(3);

    this.loadingScreenService.changeLoadingState(false);

    this.isLoading = false;
    // Hide loading screen
  }

  /// Waits for a specified number of seconds
  private async wait(seconds: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  }

  /// Validates the form inputs for creating a new entity
  private validateNewEntityForm(): BaseResponseModel {
    let response = new BaseResponseModel(false, '', null);

    if(this.entityNameInput.trim().length === 0){
      response.message = 'Please enter a name for the entity';
      return response;
    }

    else if(this.entityNameInput.trim().length < 3){
      response.message = 'The entity name must be at least 3 characters long.';
      return response;
    }

    else if(!this.selectedEntityType){
      response.message = 'Please select an entity type';
      return response;
    }

    else
      response.result = true;
    
    return response;
  }
}


