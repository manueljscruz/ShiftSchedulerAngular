import { Component } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { ScheduleService } from '../../core/services/api/ScheduleService';
import { EntityScheduleViewModel } from '../../shared/models/VM/EntityScheduleViewModel';
import { ScheduleViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/ScheduleViewModelRequestDTO';
import { CreateEntityScheduleDTO } from '../../shared/models/DTOs/Outgoing/CreateEntityScheduleDTO';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { ScheduleEntryDTO } from '../../shared/models/DTOs/Incoming/ScheduleEntryDTO';

@Component({
  selector: 'app-entity-schedule',
  templateUrl: './entity-schedule.component.html',
  styleUrl: './entity-schedule.component.css'
})
export class EntityScheduleComponent {


  //#region CONSTANTS

  //#endregion

  //#region Properties

  /// <summary>
  /// Logged user object
  /// </summary>
  public loggedUser: UserDTO = new UserDTO();
  
  /// <summary>
  /// Current entity id
  /// </summary>
  private currentEntityId: string = '';
  
  /// <summary>
  /// Is current user entity owner flag
  /// </summary>
  public isCurrentUserEntityOwner: boolean = false;

  /// <summary>
  /// Entity schedule view model
  /// </summary>
  scheduleViewModel : EntityScheduleViewModel = new EntityScheduleViewModel([], false, [], []);

  /// <summary>
  /// The start date of the calendar component
  /// </summary
  startDate: Date = new Date();

  /// <summary>
  /// The end date of the calendar component
  /// </summary
  endDate: Date = new Date();

  /// <summary>
  /// User events or entity events
  /// </summary>
  events: CalendarEvent[] = [];

  scheduleEntries: ScheduleEntryDTO[] = [];

  /// <summary>
  /// The current view date that is used to determine the month and year to display events for the component
  /// </summary>
  viewDate: Date = new Date();

  //#endregion

  //#region Constructor
  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private scheduleService: ScheduleService) { 
      this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
      this.startDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), 1);
      this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, 0);
  }

  //#endregion

  //#region Methods

  async ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');

    // Turn on the loading spinner
    this.loadingScreenService.changeLoadingState(true);

    let entityScheduleViewModelRequestDTO = new ScheduleViewModelRequestDTO(this.currentEntityId, this.loggedUser.userId, '', this.startDate, this.endDate );

    // Get the schedule view model
    this.scheduleViewModel = await this.scheduleService.getScheduleViewModel(entityScheduleViewModelRequestDTO);

    this.isCurrentUserEntityOwner = this.scheduleViewModel.allowEdit;

    // Turn off the loading spinner
    this.loadingScreenService.changeLoadingState(false);
  }

  async createSchedule() {
    let entityScheduleViewModelRequestDTO = new CreateEntityScheduleDTO(this.currentEntityId, this.loggedUser.userId, '', this.startDate, this.endDate);
    
    this.loadingScreenService.changeLoadingState(true);

    let response = await this.scheduleService.createSchedule(entityScheduleViewModelRequestDTO);
    
    // Turn off the loading spinner
    this.loadingScreenService.changeLoadingState(false);

    if (response.success) {
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Schedule created successfully'));

      this.scheduleEntries = response.result as ScheduleEntryDTO[];

      this.events = this.scheduleEntries.map(schedule => ({
        id: schedule.scheduleEntryId,
        start: new Date(schedule.scheduleStartDate),
        end: new Date(schedule.scheduleEndDate),
        title: schedule.shiftDTO.shiftName,
        color: { primary: '#1e90ff', secondary: '#D1E8FF' },
        allDay: true
      }));
    } else {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5,'Failed to create schedule'));
    }
  }

  formatDateString(dateString: string): string {
    const date = new Date(dateString);
    // Convert to local time
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  }

  handleEventClicked($event: { event: CalendarEvent; sourceEvent: MouseEvent|KeyboardEvent; }) {
    console.log($event.event);
  }

  //#endregion

}
