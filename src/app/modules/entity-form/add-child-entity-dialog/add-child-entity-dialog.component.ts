import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityService } from '../../../core/services/api/EntityService';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import { FormEntityDTO } from '../../../shared/models/DTOs/Outgoing/FormEntityDTO';
import { EntityTypeLocalizedDTO } from '../../../shared/models/DTOs/Incoming/EntityTypeLocalizedDTO';

@Component({
  selector: 'add-child-entity-dialog',
  templateUrl: './add-child-entity-dialog.component.html',
  styleUrl: './add-child-entity-dialog.component.css',
})
export class AddChildEntityDialogComponent {

  /// <summary>
  /// The name input for the new child entity.
  /// </summary>
  childEntityNameInput: string = '';

  /// <summary>
  /// The description input for the new child entity.
  /// </summary>
  childEntityDescriptionInput: string = '';

  /// <summary>
  /// The selected entity type for the new child entity.
  /// </summary>
  selectedEntityType?: EntityTypeLocalizedDTO;

  /// <summary>
  /// The list of entity types available to select from.
  /// </summary>
  entityTypes: EntityTypeLocalizedDTO[] = [];

  /// <summary>
  /// Event emitted when a child entity is successfully created.
  /// </summary>
  @Output() onChildEntityCreated: EventEmitter<BaseResponseModel> = new EventEmitter<BaseResponseModel>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private entityService: EntityService,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService
  ) {
    this.entityTypes = data.entityTypes;
  }

  //#region Create Child Entity

  /// <summary>
  /// Validates and creates the new child entity.
  /// </summary>
  async createChildEntity() {
    let validationResult = this.validateForm();
    if (!validationResult.success) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResult.message));
      return;
    }

    this.loadingScreenService.changeLoadingState(true);

    let newChildEntity = new FormEntityDTO(
      undefined,
      this.childEntityNameInput,
      this.selectedEntityType!.entityTypeId,
      this.childEntityDescriptionInput,
      this.data.workerId,
      this.data.parentEntityId
    );

    let response = await this.entityService.addEntity(newChildEntity);

    this.loadingScreenService.changeLoadingState(false);

    this.onChildEntityCreated.emit(response);
  }

  //#endregion

  //#region Validate Form

  /// <summary>
  /// Validates the child entity form inputs.
  /// </summary>
  validateForm(): BaseResponseModel {
    let response = new BaseResponseModel(false, '', null);

    if (this.childEntityNameInput.trim().length === 0) {
      response.message = 'Entity name is required';
      return response;
    }

    else if (this.childEntityNameInput.trim().length < 3) {
      response.message = 'Entity name must be at least 3 characters long';
      return response;
    }

    else if (!this.selectedEntityType) {
      response.message = 'Please select an entity type';
      return response;
    }

    response.success = true;
    return response;
  }

  //#endregion
}
