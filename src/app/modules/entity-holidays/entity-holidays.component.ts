import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EntityHolidaysViewModel } from '../../shared/models/VM/EntityHolidaysViewModel';
import { EntityHolidayDTO } from '../../shared/models/DTOs/Incoming/EntityHolidayDTO';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { BaseViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { HolidayService } from '../../core/services/api/HolidayService';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { DELETE_HOLIDAY_CONTENT, DELETE_HOLIDAY_TITLE, NOT_OWNER_OF_INTANCE_CONTENT } from '../../shared/constants/UITextConstants';
import { MatTable } from '@angular/material/table';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { HolidayBehaviourLocalizedDTO } from '../../shared/models/DTOs/Incoming/HolidayBehaviourLocalizedDTO';
import { HolidayCatalogLocalizedDTO } from '../../shared/models/DTOs/Incoming/HolidayCatalogLocalizedDTO';
import { MatSelectChange } from '@angular/material/select';
import { AddEntityHolidayDTO } from '../../shared/models/DTOs/Outgoing/AddEntityHolidayDTO';
import { SingleIdentifierDTO } from '../../shared/models/DTOs/Outgoing/SingleIdentifierDTO';
import { PageEvent } from '@angular/material/paginator';
import { PagedModelRequest } from '../../shared/models/DTOs/Outgoing/PagedModelRequest';
import { PagedList } from '../../shared/models/DTOs/Incoming/PagedList';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import { AuthService } from '../../core/services/api/AuthService';
import { EntityService } from '../../core/services/api/EntityService';
import { ImportConfigDialogComponent } from '../../shared/components/import-config-dialog/import-config-dialog.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DeleteEntityObjectDTO } from '../../shared/models/DTOs/Outgoing/DeleteEntityObjectDTO';

@Component({
  selector: 'entity-holidays',
  templateUrl: './entity-holidays.component.html',
  styleUrl: './entity-holidays.component.css',
  providers: [provideNativeDateAdapter()],
})
export class EntityHolidaysComponent implements OnDestroy {

  private destroy$ = new Subject<void>();

  DELETE_HOLIDAY_TITLE = DELETE_HOLIDAY_TITLE;
  DELETE_HOLIDAY_CONTENT = DELETE_HOLIDAY_CONTENT;
  NOT_OWNER_OF_INTANCE_CONTENT = NOT_OWNER_OF_INTANCE_CONTENT;

  // Logged user object
  public loggedUser: UserDTO | null = null;

  // Current entity id
  public currentEntityId: string = '';

  // Determines if the form is active or not
  isFormActive: boolean = false;

  // Mobile actions menu toggle
  public isMobileActionsOpen: boolean = false;

  // Determines if the user is editing a holiday or not
  isEditing: boolean = false;

  // View model for the entity holidays
  entityHolidaysViewModel: EntityHolidaysViewModel = new EntityHolidaysViewModel();

  // Entity holidays data
  entityHolidays: PagedList<EntityHolidayDTO> = PagedList.Empty();

  // Selected holiday being worked on
  selectedHoliday: EntityHolidayDTO | null = null;

  // Flag to determine if creating custom or from catalog
  isCustomHoliday: boolean = true;

  // Selected catalog holiday
  selectedCatalogHoliday: HolidayCatalogLocalizedDTO | null = null;

  // Selected behaviour for the holiday
  selectedBehaviour: HolidayBehaviourLocalizedDTO | null = null;

  currentPageIndex = 0;

  pageSize = 10;

  totalItems = 0;

  pageSizeOptions: number[] = [5, 10, 25, 100];

  showInactive: boolean = false;

  // Form fields for new/edit holiday
  customHolidayName: string = '';
  customDay: number = 1;
  customMonth: number = 1;
  operatingStartTime: string = '';
  operatingEndTime: string = '';
  notes: string = '';
  isActive: boolean = true;

  @ViewChild(MatTable) holidayTable!: MatTable<EntityHolidayDTO>;

  // Month names for display
  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Days array (1-31)
  days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  displayedColumns: string[] = ['HolidayName', 'Date', 'Behaviour', 'OperatingHours', 'Status', 'Actions'];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private holidayService: HolidayService,
    private authService: AuthService,
    private entityService: EntityService
  ) {
  }

  //#region Ng On Init

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const entityId = params.get('entityId') || '';
        if (entityId) {
          this.currentEntityId = entityId;
          this.loadViewData();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async loadViewData(): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.loggedUser = currentUser;
    }

    if (!this.loggedUser) {
      return;
    }

    // Turn on the loading spinner
    this.loadingScreenService.changeLoadingState(true);
    this.entityHolidaysViewModel = new EntityHolidaysViewModel();
    this.entityHolidays = PagedList.Empty();

    let viewModelRequestDTO = new PagedModelRequest(this.currentEntityId, this.loggedUser.userId, this.currentPageIndex, this.currentPageIndex + 1, this.pageSize,
      this.showInactive
    );
    let viewModel = await this.holidayService.getHolidayViewModel(viewModelRequestDTO);

    this.loadingScreenService.changeLoadingState(false);

    if (viewModel == null || viewModel.entityHolidayDTOs == null) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Error loading holiday data'));
      return;
    }

    this.entityHolidaysViewModel = viewModel;
    this.entityHolidays = viewModel.entityHolidayDTOs;
  }

  //#endregion

  //#region Toggle Form to Create

  toggleFormToCreate() {
    this.resetFormFields();
    this.isEditing = false;
    this.toggleForm(true);
  }

  //#endregion

  //#region Toggle Form

  toggleForm(newState: boolean) {
    this.isFormActive = newState;

    if (!newState) {
      this.resetFormFields();
      // Disable operating timers when form is closed
      this.operatingStartTime = '';
      this.operatingEndTime = '';
    }
  }

  //#endregion

  //#region Reset Form Fields

  resetFormFields() {
    this.selectedHoliday = null;
    this.selectedCatalogHoliday = null;
    this.selectedBehaviour = null;
    this.isCustomHoliday = true;
    this.customHolidayName = '';
    this.customDay = 1;
    this.customMonth = 1;
    this.operatingStartTime = '';
    this.operatingEndTime = '';
    this.notes = '';
    this.isActive = true;
  }

  //#endregion

  //#region On Holiday To Edit

  onHolidayToEdit(holiday: EntityHolidayDTO) {
    this.selectedHoliday = { ...holiday };

    // Determine if this is a custom holiday or catalog-based
    this.isCustomHoliday = holiday.holidayCatalog ? false : true;

    if (!this.isCustomHoliday && holiday.holidayCatalog) {
      this.selectedCatalogHoliday = this.entityHolidaysViewModel.holidayCatalogDTOs.find(
        c => c.holidayCatalogId === holiday.holidayCatalog?.holidayCatalogId
      ) || null;
    }

    this.selectedBehaviour = this.entityHolidaysViewModel.holidayBehaviourDTOs.find(
      b => b.holidayBehaviourId === holiday.holidayBehaviourLocalized?.holidayBehaviourId
    ) || null;

    this.customHolidayName = holiday.customHolidayName || '';
    this.customDay = holiday.customDay || 1;
    this.customMonth = holiday.customMonth || 1;
    this.operatingStartTime = holiday.operatingStartTime ? this.formatTimeForInput(holiday.operatingStartTime) : '';
    this.operatingEndTime = holiday.operatingEndTime ? this.formatTimeForInput(holiday.operatingEndTime) : '';
    this.notes = holiday.notes || '';
    this.isActive = holiday.isActive;

    this.isEditing = true;
    this.toggleForm(true);
  }

  //#endregion

  //#region Format Time For Input

  formatTimeForInput(timeSpan: string): string {
    // TimeSpan comes as "HH:mm:ss", we need "HH:mm" for input
    if (!timeSpan) return '';
    const parts = timeSpan.split(':');
    return parts.length >= 2 ? `${parts[0]}:${parts[1]}` : '';
  }

  //#endregion

  //#region Open Delete Dialog

  openDeleteDialog(enterAnimationDuration: string, exitAnimationDuration: string, title: string, content: string, objectToDelete: EntityHolidayDTO) {
    const dialogRef = this.dialog.open(GenericWarningDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, warningTitle: title, warningMessage: content, isDeleteWarning: true }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        this.deleteHoliday(objectToDelete);
      };
    });
  }

  //#endregion

  //#region Delete Holiday

  async deleteHoliday(holidayInstance: EntityHolidayDTO) {
    let index = this.entityHolidays.data.findIndex(x => x.entityHolidayId === holidayInstance.entityHolidayId);

    this.loadingScreenService.changeLoadingState(true);

    let holidayDeleteObject = new DeleteEntityObjectDTO(this.currentEntityId, holidayInstance.entityHolidayId);
    let response: BaseResponseModel = await this.holidayService.deleteHoliday(holidayDeleteObject);

    this.loadingScreenService.changeLoadingState(false);

    if (response.success) {
      if (index >= 0) {
        let newCount = this.entityHolidays.totalCount - 1;
        this.totalItems = newCount;
        this.entityHolidays.totalCount = newCount;
        this.entityHolidays.data.splice(index, 1);
        this.holidayTable.renderRows();
      }
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, response.message));
    }
    else {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
    }
  }

  //#endregion

  //#region Edit Holiday

  editHoliday(holidayInstance: EntityHolidayDTO) {
    if (!this.entityHolidaysViewModel.allowEdit) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, NOT_OWNER_OF_INTANCE_CONTENT));
      return;
    }

    this.onHolidayToEdit(holidayInstance);
  }

  //#endregion

  //#region On Behaviour Change

  onBehaviourChange($event: MatSelectChange) {
    this.selectedBehaviour = $event.value;

    // Disable operating timers if behaviour is cleared or doesn't allow them
    if (!this.selectedBehaviour || !this.selectedBehaviour.allowsOperatingTimes) {
      this.operatingStartTime = '';
      this.operatingEndTime = '';
    }
  }

  //#endregion

  //#region On Catalog Holiday Change

  onCatalogHolidayChange($event: MatSelectChange) {
    this.selectedCatalogHoliday = $event.value;
    // Auto-fill behaviour from catalog
    if (this.selectedCatalogHoliday) {
      this.selectedBehaviour = this.entityHolidaysViewModel.holidayBehaviourDTOs.find(
        b => b.holidayBehaviourId === this.selectedCatalogHoliday?.holidayBehaviourLocalized?.holidayBehaviourId
      ) || null;
      // Auto-fill day/month from catalog
      this.customDay = this.selectedCatalogHoliday.recurrenceDay;
      this.customMonth = this.selectedCatalogHoliday.recurrenceMonth;
    }
  }

  //#endregion

  //#region On Holiday Type Change

  onHolidayTypeChange() {
    // Reset catalog selection when switching to custom
    if (this.isCustomHoliday) {
      this.selectedCatalogHoliday = null;
    }
  }

  //#endregion

  //#region Save Holiday

  async saveHoliday() {
    if (!this.loggedUser) {
      return;
    }

    let validationResult = this.validateForm();

    if (!validationResult.success) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResult.message));
      return;
    }

    let response: BaseResponseModel = new BaseResponseModel(false, '', null);

    // Format time for API (add seconds)
    const formatTimeForApi = (time: string): string | null => {
      if (!time) return null;
      return time.includes(':') && time.split(':').length === 2 ? `${time}:00` : time;
    };

    let dto : EntityHolidayDTO = EntityHolidayDTO.newEntityHolidayDTO();

    if (this.isEditing && this.selectedHoliday) {
      // Update existing holiday
      const updateDTO: EntityHolidayDTO = {
        ...this.selectedHoliday,
        holidayBehaviourLocalized: this.selectedBehaviour? this.selectedBehaviour : this.selectedHoliday.holidayBehaviourLocalized,
        holidayCatalog: this.isCustomHoliday ? null : this.selectedCatalogHoliday,  // Clear catalog if custom
        customHolidayName: this.isCustomHoliday ? this.customHolidayName : '',
        customDay: this.isCustomHoliday ? this.customDay : 0,
        customMonth: this.isCustomHoliday ? this.customMonth : 0,
        operatingStartTime: formatTimeForApi(this.operatingStartTime),
        operatingEndTime: formatTimeForApi(this.operatingEndTime),
        isActive: this.isActive,
        notes: this.notes
      };

      dto = updateDTO;

      this.loadingScreenService.changeLoadingState(true);
      response = await this.holidayService.updateHoliday(updateDTO);
      this.loadingScreenService.changeLoadingState(false);
    }
    else {
      // Create new holiday
      const addDTO: AddEntityHolidayDTO = {
        entityId: this.currentEntityId,
        holidayCatalogId: this.isCustomHoliday ? null : this.selectedCatalogHoliday?.holidayCatalogId || null,
        holidayBehaviourId: this.selectedBehaviour?.holidayBehaviourId || 0,
        isCustom: this.isCustomHoliday,
        customHolidayName: this.isCustomHoliday ? this.customHolidayName : '',
        customDay: this.isCustomHoliday? this.customDay : 0,
        customMonth: this.isCustomHoliday? this.customMonth : 0,
        operatingStartTime: formatTimeForApi(this.operatingStartTime),
        operatingEndTime: formatTimeForApi(this.operatingEndTime),
        notes: this.notes
      };

      this.loadingScreenService.changeLoadingState(true);
      response = await this.holidayService.addHoliday(addDTO);
      this.loadingScreenService.changeLoadingState(false);
    }

    if (response.success) {
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, response.message));

      if (this.isEditing) {
        if(this.selectedHoliday){
          this.selectedHoliday = dto;
        }
        
        let index = this.entityHolidays.data.findIndex(x => x.entityHolidayId === this.selectedHoliday?.entityHolidayId);
        if (index >= 0 && response.result) {
          this.entityHolidays.data[index] = dto;
          this.holidayTable?.renderRows();
        }
      }
      else {
        if (response.result) {
          this.entityHolidays.data.push(response.result);
          let newCount = this.entityHolidays.totalCount + 1;
          this.totalItems = newCount // Increment total items for pagination
          this.entityHolidays.totalCount = newCount;
          this.holidayTable?.renderRows();
        }
      }

      this.toggleForm(false);
      this.isEditing = false;
    }
    else {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
    }
  }

  //#endregion

  //#region Validate Form

  private validateForm(): BaseResponseModel {
    let response = new BaseResponseModel(false, '', null);

    if (this.selectedBehaviour === null) {
      response.message = 'Holiday behaviour is required.';
      return response;
    }

    if (this.isCustomHoliday && !this.customHolidayName.trim()) {
      response.message = 'Holiday name is required for custom holidays.';
      return response;
    }

    if (!this.isCustomHoliday && this.selectedCatalogHoliday === null) {
      response.message = 'Please select a holiday from the catalog.';
      return response;
    }

    if (this.customDay < 1 || this.customDay > 31) {
      response.message = 'Day must be between 1 and 31.';
      return response;
    }

    if (this.customMonth < 1 || this.customMonth > 12) {
      response.message = 'Month must be between 1 and 12.';
      return response;
    }

    response.success = true;
    return response;
  }

  //#endregion

  //#region Get Holiday Display Name

  getHolidayDisplayName(holiday: EntityHolidayDTO): string {
    if (holiday.holidayCatalog) {
      return holiday.holidayCatalog.holidayCatalogLocalizedName;
    }
    return holiday.customHolidayName || 'N/A';
  }

  //#endregion

  //#region Get Operating Hours Display

  getOperatingHoursDisplay(holiday: EntityHolidayDTO): string {
    if (!holiday.operatingStartTime && !holiday.operatingEndTime) {
      return 'N/A';
    }

    const formatTime = (time: string | null): string => {
      if (!time) return '--:--';
      const parts = time.split(':');
      return parts.length >= 2 ? `${parts[0]}:${parts[1]}` : time;
    };

    return `${formatTime(holiday.operatingStartTime)} - ${formatTime(holiday.operatingEndTime)}`;
  }

  //#endregion

  //#region Handle Page Event

  async handlePageEvent($event: PageEvent) {
    this.currentPageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;

    await this.GetEntityHolidays(this.currentPageIndex, this.pageSize);
  }

  //#endregion

  //#region Get Entity Holidays

  async GetEntityHolidays(currentPageIndex: number, pageSize: number) {
    if(!this.loggedUser){
      return;
    }

    let holidaysPageRequest : PagedModelRequest = {
      entityId : this.currentEntityId,
      workerId : this.loggedUser.userId,
      currentPage : this.currentPageIndex,
      nextPage : currentPageIndex+1,
      itemsPerPage : pageSize,
      showInactive : this.showInactive
    }

    this.loadingScreenService.changeLoadingState(true);

    let data = await this.holidayService.getHolidaysPage(holidaysPageRequest);

    this.entityHolidaysViewModel.entityHolidayDTOs = data;

    this.loadingScreenService.changeLoadingState(false);
  }

  //#endregion

  //#region Import Config

  openImportDialog(): void {
    const dialogRef = this.dialog.open(ImportConfigDialogComponent, {
      data: { entityId: this.currentEntityId, type: 'holidays' }
    });
    dialogRef.componentInstance.onImportComplete.subscribe(() => {
      dialogRef.close();
      this.loadViewData();
    });
  }

  //#endregion
}
