import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from '../../core/services/api/EntityService';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { EntityProfileViewModel } from '../../shared/models/VM/EntityProfileViewModel';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { EntityDTO } from '../../shared/models/DTOs/Incoming/EntityDTO';
import { EntityTypeLocalizedDTO } from '../../shared/models/DTOs/Incoming/EntityTypeLocalizedDTO';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEntityWarningDialogComponent } from './delete-entity-warning-dialog/delete-entity-warning-dialog.component';
import { AddChildEntityDialogComponent } from './add-child-entity-dialog/add-child-entity-dialog.component';
import { Entity } from '../../shared/models/database/entity';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { FormEntityDTO } from '../../shared/models/DTOs/Outgoing/FormEntityDTO';
import { DASHBOARD_HOME_ROUTE } from '../../shared/constants/ViewRoutesConstants';
import { SIDEBAR_ITEM_GROUP_ID } from '../../shared/constants/UiContants';
import { SidebarNavigationService } from '../../core/services/ui/sidebar-navigation.service';
import { LanguageServiceService } from '../../core/services/language-service.service';
import { AuthService } from '../../core/services/api/AuthService';

@Component({
  selector: 'entity-form',
  templateUrl: './entity-form.component.html',
  styleUrl: './entity-form.component.css'
})

export class EntityFormComponent {

  /// <summary>
  /// ViewModel for the entity profile page
  /// </summary>
  entityProfileViewModel: EntityProfileViewModel = new EntityProfileViewModel(new EntityDTO('','','','',0), false, []);

  /// <summary>
  /// Identifier of the current entity being viewed
  /// </summary>
  currentEntityId: string = '';

  /// <summary>
  /// Logged user information
  /// </summary>
  loggedUser: UserDTO | null = null;

  /// <summary>
  /// User language
  /// </summary>
  userLanguage: string = '';

  /// <summary>
  /// Flag to indicate if the entity is being edited
  /// </summary>
  isEditing: boolean = false;

  // Mobile actions menu toggle
  public isMobileActionsOpen: boolean = false;


  /// <summary>
  /// Selected entity type. Can be null if the entity cannot be edited
  /// </summary>
  selectedEntityType?: EntityTypeLocalizedDTO;

  constructor(private route: ActivatedRoute,
    private entityService: EntityService,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private sidebarNavigationService: SidebarNavigationService,
    private languageService: LanguageServiceService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.loggedUser = currentUser;
    }
    this.userLanguage = this.languageService.returnLocalization();
  }

  async ngOnInit() {
    if (!this.loggedUser) {
      return;
    }

    this.loadingScreenService.changeLoadingState(true);

    // Retrieve the entity profile view model
    let entityProfileViewModelRequestDTO = {
      entityId: this.currentEntityId,
      workerId: this.loggedUser.userId
    };

    let viewModel = await this.entityService.getEntityProfileViewModel(entityProfileViewModelRequestDTO);

    this.loadingScreenService.changeLoadingState(false);

    if(viewModel == null) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Error loading entity data'));
      return;
    }

    this.entityProfileViewModel = viewModel;

    // Sets the initial entity type if the entity can be edited
    this.setInitialEntityType();
  }

  /// <summary>
  /// Allows for the entity to be edited
  /// </summary>
  toggleEditEntity(){
    this.isEditing = !this.isEditing;
  }

  /// <summary>
  /// Sets the initial entity type for the select input if its allowed to be edited
  /// </summary>
  setInitialEntityType(){
    if(this.entityProfileViewModel.allowEdit){
      this.selectedEntityType = this.entityProfileViewModel.entityTypeLocalizeds.find(x => x.entityTypeLocalizedName == this.entityProfileViewModel.entityDTO.entityTypeLocalized);
    }
  }
  
  async saveEntity(){
    if (!this.loggedUser) {
      return;
    }

    let validationResult = this.validateEntityForm();
    if(!validationResult.result){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResult.message));
      return;
    }

    this.loadingScreenService.changeLoadingState(true);
    let entityToUpdate = new FormEntityDTO(this.currentEntityId, this.entityProfileViewModel.entityDTO.entityName, this.selectedEntityType?.entityTypeId || 0, this.entityProfileViewModel.entityDTO.entityDescription, this.loggedUser.userId);

    let response = await this.entityService.updateEntity(entityToUpdate);
    if(response.success){
      this.sidebarNavigationService.updateWorkEntitySideBarItem(this.currentEntityId, entityToUpdate.EntityName);
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Entity updated successfully'));
      this.isEditing = false;
    }
    else
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Failed to update entity: ' + response.message));

    this.loadingScreenService.changeLoadingState(false);
  }
  

  openAddChildEntityDialog() {
    const dialogRef = this.dialog.open(AddChildEntityDialogComponent, {
      width: '500px',
      data: {
        entityTypes: this.entityProfileViewModel.entityTypeLocalizeds,
        parentEntityId: this.currentEntityId,
        workerId: this.loggedUser?.userId
      }
    });

    dialogRef.componentInstance.onChildEntityCreated.subscribe((result: BaseResponseModel) => {
      dialogRef.close();
      if (result.success) {
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Child entity created successfully'));
        this.entityProfileViewModel.childrenEntities.push(result.result as Entity);
      } else {
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Failed to create child entity: ' + result.message));
      }
    });
  }

  openDeleteEntityDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    const dialogRef = this.dialog.open(DeleteEntityWarningDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, entityName: this.entityProfileViewModel.entityDTO.entityName }
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.deleteEntity();
      };
    });
  }
  
  validateEntityForm() : BaseResponseModel {
    let response = new BaseResponseModel(false, '', null);

    if(this.entityProfileViewModel.entityDTO.entityName.trim().length === 0){
      response.message = 'Entity name is required';
      return response;
    }

    else if(this.entityProfileViewModel.entityDTO.entityName.trim().length < 3){
      response.message = 'Entity name must be at least 3 characters long';
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

  async deleteEntity() {
    if(this.currentEntityId.length === 0){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Entity not found'));
      return;
    }

    this.loadingScreenService.changeLoadingState(true);
    await this.entityService.deleteEntity(this.currentEntityId).then(response => {
      if(response.success){
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Entity deleted successfully'));
        this.sidebarNavigationService.deleteWorkEntitySideBarItem(this.currentEntityId);
        this.router.navigate([DASHBOARD_HOME_ROUTE]);
      }
      else
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Failed to delete entity: ' + response.message));
      
      this.loadingScreenService.changeLoadingState(false);
    });
  }
}
