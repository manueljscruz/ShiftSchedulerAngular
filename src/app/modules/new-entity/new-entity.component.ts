import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../core/services/api/HomeService';
import { EntityTypeLocalizedDTO } from '../../shared/models/DTOs/Incoming/EntityTypeLocalizedDTO';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { FormEntityDTO } from '../../shared/models/DTOs/Outgoing/FormEntityDTO';
import { LocalService } from '../../core/services/local.service';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { EntityService } from '../../core/services/api/EntityService';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { Subscription } from 'rxjs';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ENTITY_FORM_ROUTE, ENTITY_SCHEDULE_ROUTE, ENTITY_WORKERS_ROUTE } from '../../shared/constants/ViewRoutesConstants';
import { SideBarItemModel } from '../../shared/models/UI/SideBarItemModel';
import { BOOTSTRAP_ICON_PREFIX, ENTITY_ICON, ENTITY_SCHEDULE_ICON, MEMBERS_ICON } from '../../shared/constants/IconNamesConstants';
import { SIDEBAR_ITEM_GROUP_ID, SIDERBAR_ITEM_GROUP_ENTITIES_CONTAINER } from '../../shared/constants/UiContants';
import { SidebarNavigationService } from '../../core/services/ui/sidebar-navigation.service';

@Component({
  selector: 'app-new-entity',
  templateUrl: './new-entity.component.html',
  styleUrl: './new-entity.component.css',
})
export class NewEntityComponent {

  entityTypes: EntityTypeLocalizedDTO[] = [];

  loggedInUser: UserDTO;
  entityNameInput : string = '';
  selectedEntityType?: EntityTypeLocalizedDTO;
  entityDescriptionInput : string = '';
  
  isLoading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(@Inject(LocalService) private localStore: LocalService, 
  private auxDataService: HomeService, 
  private entityService: EntityService,
  private loadingScreenService: LoadingSpinnerManagerService, 
  private snackbarManagerService: SnackbarManagerService,
  private sidebarNavigationService: SidebarNavigationService,
  private router: Router) {
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
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResult.message));
      return;
    }

    // Trigger loading screen
    this.isLoading = true;

    let newEntity: FormEntityDTO = new FormEntityDTO('', this.entityNameInput, this.selectedEntityType?.entityTypeId ? this.selectedEntityType.entityTypeId : 0, this.entityDescriptionInput, this.loggedInUser.userId);
    console.log(newEntity);

    // Call the API to create the new entity
    // let response : BaseResponseModel = await this.entityService.addEntity(newEntity);
    this.loadingScreenService.changeLoadingState(true);
    
    let response : BaseResponseModel = await this.entityService.addEntity(newEntity);

    this.loadingScreenService.changeLoadingState(false);

    if(response.success){
      this.clearFormInputs();
      this.sidebarNavigationService.addNewWorkEntitySideBarItem(response.result);
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Entity created successfully'));
      this.router.navigate([ENTITY_FORM_ROUTE.replace(':entityId', response.result.entityId)]);
    }
    else
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Failed to create entity: ' + response.message));
    
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

  private clearFormInputs(){
    this.entityNameInput = '';
    this.entityDescriptionInput = '';
    this.selectedEntityType = undefined;
  }

  addEntityTest(id:string , name:string, description:string, workerId:string){
    let entityOptionItems: SideBarItemModel[] = [];
      
      // Add Home Button
      entityOptionItems.push(new SideBarItemModel('', "Home", ENTITY_ICON, ENTITY_FORM_ROUTE.replace(':entityId', id), []));
      // Add Members Button
      entityOptionItems.push(new SideBarItemModel('', "Members", MEMBERS_ICON, ENTITY_WORKERS_ROUTE.replace(':entityId', id), []));
      // Add Schedule Button
      entityOptionItems.push(new SideBarItemModel('', "Schedule", ENTITY_SCHEDULE_ICON, ENTITY_SCHEDULE_ROUTE.replace(':entityId', id), []));

      let sidebarGroupModel = new SideBarItemModel(SIDEBAR_ITEM_GROUP_ID.replace('{id}', id), name, ENTITY_ICON, "", entityOptionItems);

      let entitiesContainer = document.getElementById(SIDERBAR_ITEM_GROUP_ENTITIES_CONTAINER);
      let newSidebarGroup = document.createElement('sidebar-item-group');
      newSidebarGroup.setAttribute('id', sidebarGroupModel.sidebarItemId);
      newSidebarGroup.setAttribute('sidebarItemGroupText', name);
      newSidebarGroup.setAttribute('sidebarItemGroupIcon', sidebarGroupModel.sidebarItemIcon);
      newSidebarGroup.setAttribute('sidebarItemGroupLink', sidebarGroupModel.sidebarItemLink);

      entitiesContainer?.appendChild(newSidebarGroup);
  }
}


