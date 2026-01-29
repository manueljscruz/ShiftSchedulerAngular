import { Component, Input } from '@angular/core';
import { EntityWorkerDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerDTO';
import { DashboardEntityViewModel } from '../../../shared/models/VM/DashboardEntityViewModel';
import { MEMBERS_ICON, SHIFT_FILLED_ICON } from '../../../shared/constants/IconNamesConstants';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { EntityService } from '../../../core/services/api/EntityService';
import { BaseViewModelRequestDTO } from '../../../shared/models/DTOs/Outgoing/BaseViewModelRequestDTO';
import { UserDTO } from '../../../shared/models/DTOs/Incoming/UserDTO';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import { CalendarEvent } from 'angular-calendar';
import { ScheduleEntryDTO } from '../../../shared/models/DTOs/Incoming/ScheduleEntryDTO';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleEventViewHolderComponent } from '../../entity-schedule/schedule-event-view-holder/schedule-event-view-holder.component';
import { ENTITY_RULES_ROUTE, ENTITY_SHIFTS_ROUTE, ENTITY_WORKERS_ROUTE } from '../../../shared/constants/ViewRoutesConstants';

@Component({
  selector: 'dashboard-tab-view',
  templateUrl: './dashboard-tab-view.component.html',
  styleUrl: './dashboard-tab-view.component.css'
})
export class DashboardTabViewComponent {


  // CONSTANTS
  MEMBERS_ICON = MEMBERS_ICON;
  SHIFT_FILLED_ICON = SHIFT_FILLED_ICON;
  BASE_ENTITY_WORKERS_ROUTE = ENTITY_WORKERS_ROUTE;
  BASE_ENTITY_RULES_ROUTE = ENTITY_RULES_ROUTE;
  BASE_ENTITY_SHIFTS_ROUTE = ENTITY_SHIFTS_ROUTE;


  /// <summary>
  /// The entity worker instance for the current tab
  /// </summary>
  @Input() entityWorkerInstance?: EntityWorkerDTO; 


  /// <summary>
  /// The logged user information
  /// </summary>
  @Input() loggedUser?: UserDTO | null;

  /// <summary>
  /// Flag to indicate if the tab is currently active
  /// </summary>
  @Input() active = false;

  /// <summary>
  /// Encoded Entity Id for Router Links
  /// </summary>
  encodedEntityId: string = '';

  /// <summary>
  /// Router Links for Dashboard Shortcuts
  /// </summary>
  membersRouterLink: string = '';
  rulesRouterLink: string = '';
  shiftsRouterLink: string = '';
  
  /// <summary>
  /// ViewModel for the entity dashboard
  /// </summary>
  entityDashboardViewModel: DashboardEntityViewModel = DashboardEntityViewModel.newDashboardEntityViewModel();

  /// <summary>
  /// Current view date for the calendar
  /// </summary>
  viewDate: Date = new Date();

  /// <summary>
  /// Day of the week the calendar starts on
  /// </summary>
  dayOfTheWeek: number = (new Date()).getDay();

  /// <summary>
  /// Calendar events
  /// </summary>
  events: CalendarEvent[] = [];

  /**
   * 
   * @param snackbarManagerService Snackbar service to provide information
   * @param loadingScreenService Loading screen service to handle loaders
   * @param entityService Entity service used to retrieve information
   * @param dialog Dialog service that uses popup
   */
  constructor(private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private entityService: EntityService, 
    private dialog: MatDialog) {
    }


  //#region On Changes
  
  /**
   * Lifecycle hook that is called when input properties change
   * 
   * Called when the active tab changes to load data if necessary
   */
  ngOnChanges(): void {
    if (this.active) {
      this.onTabActivated();
    }
  }

  //#endregion

  //#region On Tab Activated

  /**
   * Handles actions to be performed when the tab is activated
   * 
   * Loads the entity dashboard data if not already loaded
   * Builds the calendar events and sets up router links
   * 
   */
  private async onTabActivated() {
    this.loadingScreenService.changeLoadingState(true);

    let baseViewModelRequestDTO = new BaseViewModelRequestDTO(this.entityWorkerInstance?.entityId ?? '', this.loggedUser?.userId ?? '');
    this.entityDashboardViewModel = await this.entityService.getEntityDashboardViewModel(baseViewModelRequestDTO);
    
    if(this.entityDashboardViewModel == null){
      this.loadingScreenService.changeLoadingState(false);
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5000, 'Error loading entity dashboard data'));
      return;
    }

    if(this.entityDashboardViewModel.scheduleEntries != null)
      this.BuildCalendar(this.entityDashboardViewModel.scheduleEntries);

    this.loadingScreenService.changeLoadingState(false);

    if (!this.entityDashboardViewModel) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5000, 'Error loading entity dashboard data'));
    }

    if(this.membersRouterLink == '' || this.rulesRouterLink == '' || this.shiftsRouterLink == ''){
      this.encodedEntityId = encodeURIComponent(this.entityWorkerInstance?.entityId ?? '');
      this.membersRouterLink = this.BASE_ENTITY_WORKERS_ROUTE.replace(':entityId', this.encodedEntityId);
      this.rulesRouterLink = this.BASE_ENTITY_RULES_ROUTE.replace(':entityId', this.encodedEntityId);
      this.shiftsRouterLink = this.BASE_ENTITY_SHIFTS_ROUTE.replace(':entityId', this.encodedEntityId);
    }
  }

  //#endregion

  //#region Build Calendar

  /**
   * 
   * @param scheduleEntries Schedule entries retrieved to be converted into events for calendar
   */
  private BuildCalendar(scheduleEntries: ScheduleEntryDTO[]) {
    this.events = scheduleEntries.map(schedule => ({
        id: schedule.scheduleEntryId,
        start: new Date(schedule.scheduleStartDate),
        end: new Date(schedule.scheduleEndDate),
        title: schedule.shiftDTO.shiftName,
        color: { primary: schedule.shiftDTO.shiftColorHex, secondary: schedule.shiftDTO.shiftColorHex },
        allDay: false
      }));
  }

  //#endregion

  //#region Open View

  /**
   * 
   * @param $event Calendar event of the Schedule Entry
   */
  public OpenView($event: { event: CalendarEvent; sourceEvent: MouseEvent|KeyboardEvent; }){

    let entryId = $event.event.id as string;

    let workerDayEntry = this.entityDashboardViewModel.scheduleEntries.filter(entry => entry.scheduleEntryId === entryId);
    
    const dialogRef = this.dialog.open(ScheduleEventViewHolderComponent, {
      width: '500px',
      data: { scheduleEntries: workerDayEntry, isCurrentUserEntityOwner: false } 
    });
    
    dialogRef.componentInstance.closeOp.subscribe((result : boolean) => {
      if (result) {
        // Close the dialog
        dialogRef.close();
      }
    });
  }

  //#endregion

 
}
