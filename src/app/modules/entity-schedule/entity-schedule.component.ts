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
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MonthViewDay } from 'calendar-utils';
import { ScheduleEventViewComponent } from './schedule-event-view/schedule-event-view.component';
import { ScheduleCreatorMenuComponent } from './schedule-creator-menu/schedule-creator-menu.component';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { start } from 'repl';

/*
interface ScheduleList{
    employee: string;
};
*/

@Component({
  selector: 'app-entity-schedule',
  templateUrl: './entity-schedule.component.html',
  styleUrl: './entity-schedule.component.css'
})

export class EntityScheduleComponent {

  //#region CONSTANTS

  EMPLOYEE_COLUMN: string = 'employee';
  TIME_COLUMN: string = 'time';

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
  scheduleViewModel : EntityScheduleViewModel = new EntityScheduleViewModel([], false, [], [], []);

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

  /// <summary>
  /// The schedule entries for the current entity
  /// </summary>
  scheduleEntries: ScheduleEntryDTO[] = [];

  /// <summary>
  /// Flag to determine if the calendar view is selected
  /// </summary>
  isCalendarView: boolean = false;

  /// <summary>
  /// Flag to determine if the list view is selected
  /// </summary>
  isListView: boolean = true;

  viewDate: Date = new Date();

  scheduleList: any;

  calendarListColumns: string[] = [];


  

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
      this.scheduleList = [];
  }

  //#endregion

  //#region Methods

  //#region On Init

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

    this.buildViews();
  }

//#endregion

  async onCreateSchedule(){
    // Open the schedule creator menu
    const dialogRef = this.dialog.open(ScheduleCreatorMenuComponent, {
      width: '800px',
      height: '600px',
      data: { 
        startDate: this.startDate,
        endDate: this.endDate,
        entityWorkerMembers: this.scheduleViewModel.entityWorkerMembers,
        entityShifts: this.scheduleViewModel.shifts,
        entityRules: this.scheduleViewModel.entityRules, 
      } 
    });

    dialogRef.componentInstance.createScheduleOp.subscribe(async (result : BaseResponseModel) => {
      if (result.success) {
        // Close the dialog
        dialogRef.close();

        if(this.isCurrentUserEntityOwner){
          let createScheduleOp = result.result as CreateEntityScheduleDTO;
          createScheduleOp.entityId = this.currentEntityId;
          createScheduleOp.workerId = this.loggedUser.userId;
          
          await this.createSchedule(createScheduleOp);
        }

      }
      else {
        // Close the dialog
        dialogRef.close();
      }
    });

  }

  //#region Create Schedule

  async createSchedule( createScheduleOp : CreateEntityScheduleDTO) {
    
    this.loadingScreenService.changeLoadingState(true);

    let response = await this.scheduleService.createSchedule(createScheduleOp);
    
    // Turn off the loading spinner
    this.loadingScreenService.changeLoadingState(false);

    if (response.success) {
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Schedule created successfully'));

      let schedules = (response.result || []).map((entry : ScheduleEntryDTO) => ({
                ...entry,
                scheduleStartDate: new Date(entry.scheduleStartDate),
                scheduleEndDate: new Date(entry.scheduleEndDate),
                shiftDTO: {
                    ...entry.shiftDTO,
                    shiftStartHour: new Date(`1970-01-01T${entry.shiftDTO.shiftStartHour}:00Z`),
                    shiftDuration: new Date(`1970-01-01T${entry.shiftDTO.shiftDuration}:00Z`)
                },
            }));

      this.scheduleEntries = schedules;// response.result as ScheduleEntryDTO[];

      this.buildViews();
    } else {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5,'Failed to create schedule'));
    }
  }

  //#endregion

  //#region Format Date String

  formatDateString(dateString: string): string {
    const date = new Date(dateString);
    // Convert to local time
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    
    return localDate.toISOString().split('T')[0];
  }

  //#endregion

  //#region Show Event 

  /// <summary>
  /// Shows the event clicked event
  /// </summary>
  showEvent($event: { event: CalendarEvent; sourceEvent: MouseEvent|KeyboardEvent; }) {
    console.log($event.event);

    if($event.event != null && $event.event.id != null){
      let scheduleEntry = this.scheduleEntries.find(x => x.scheduleEntryId === $event.event.id);

      if(scheduleEntry != null){
        
        const dialogRef = this.dialog.open(ScheduleEventViewComponent, {
              width: '500px',
              data: { scheduleEntry: scheduleEntry, isCurrentUserEntityOwner: this.isCurrentUserEntityOwner } 
        });

        dialogRef.componentInstance.closeOp.subscribe((result : boolean) => {
          if (result) {
            // Close the dialog
            dialogRef.close();
          }
        });
      }
    }

  }

  //#endregion

  //#region Day Clicked

  /// <summary>
  /// Handles when the day is clicked
  /// </summary>
  dayClicked($event: { day: MonthViewDay; sourceEvent: MouseEvent|KeyboardEvent; }) {
    console.log($event.day.date);
    console.log($event.day.events);
    console.log($event.sourceEvent);
  }

  //#endregion

  //#region On View Change

  /// <summary>
  /// Handles when the user changes the view
  /// </summary>
  onViewChange($event: MatButtonToggleChange) {
    switch ($event.value) {
      case 'calendar':
        this.isCalendarView = true;
        this.isListView = false;
        break;

      case 'list':
        this.isCalendarView = false;
        this.isListView = true;
        break;

      default:
        this.isCalendarView = true;
        this.isListView = false;
        break;
    }
  }

  //#endregion

  //#region Build Views

  buildViews() {
    this.buildTable();
    this.buildCalendar();
  }

  //#endregion

  //#region Build Calendar

  buildCalendar() {
    this.events = this.scheduleEntries.map(schedule => ({
        id: schedule.scheduleEntryId,
        start: new Date(schedule.scheduleStartDate),
        end: new Date(schedule.scheduleEndDate),
        title: schedule.shiftDTO.shiftName,
        color: { primary: schedule.shiftDTO.shiftColorHex, secondary: schedule.shiftDTO.shiftColorHex },
        allDay: true
      }));
  }

  //#endregion

  



  //#region Build Table

  buildTable() {

    // Clear the calendar list columns
    this.calendarListColumns = [];
    this.scheduleList = [];

    // Add the employee column
    this.calendarListColumns.push(this.EMPLOYEE_COLUMN);
    
    // Add the date columns
    // Loop through the start date to the end date and add the date columns
    let dateMonitor = new Date(this.startDate);
    while (dateMonitor <= this.endDate) {
      this.calendarListColumns.push(this.formatDateString(dateMonitor.toISOString()));
      dateMonitor.setDate(dateMonitor.getDate() + 1);
    }

    // Add the time column
    this.calendarListColumns.push(this.TIME_COLUMN);

    // For each worker member, create a new object with the worker name, the date and time columns
    this.scheduleViewModel.entityWorkerMembers.forEach((workerMember) => {
      let workerData = {
        id : workerMember.workerId,
        isBot: workerMember.isBot,
        employee: workerMember.partOfRotation ? workerMember.workerName + ' (RT)' : workerMember.workerName,
        time: 0
      };

      // Loop through the start date to the end date and add the date columns
      let dateMonitor = new Date(this.startDate);
      while (dateMonitor <= this.endDate) {
        let date = this.formatDateString(dateMonitor.toISOString());
        let assignment = '';
        let color = '#FFFFFF';
        // Filter the schedule entries for the current date
        let filteredScheduleEntries = this.scheduleEntries.filter((scheduleEntry) => 
          new Date(scheduleEntry.scheduleStartDate).toISOString().split('T')[0] === date
        );

        if(filteredScheduleEntries.length > 0){
          // Loop through the filtered schedule entries and check if the worker is assigned
          filteredScheduleEntries.forEach((scheduleEntry) => {
            if(scheduleEntry.scheduleParticipants.length > 0){
              scheduleEntry.scheduleParticipants.forEach((participant) => {
                // Check if the participant is the current worker member
                if(participant.workerId === workerMember.workerId){

                  // If the worker is assigned, add the shift alias to the assignment
                  assignment += ' ' + scheduleEntry.shiftDTO.shiftAlias + ' ';

                  if(scheduleEntry.shiftDTO.shiftAlias != ''){
                    color = scheduleEntry.shiftDTO.shiftColorHex || '#FFFFFF';
                  }
                  
                  // Assuming shiftDuration is a Date object representing the duration, calculate hours
                  let duration : Date = scheduleEntry.shiftDTO.shiftDuration;
                  let hours = 0;
                  if (duration instanceof Date) {
                    hours = duration.getUTCHours() + duration.getUTCMinutes() / 60;
                  } else if (typeof duration === 'number') {
                    hours = duration;
                  }

                  // Add the hours to the worker data
                  workerData.time += hours;
                }
              });
            }
          });
        }

        if (!assignment.trim()) {
          assignment = 'NA';
        }

        workerData = {... workerData, 
          [date]: {
            alias: assignment.trim() || 'NA',
            color: color
          }
        };
        // this.dataSource.push(workerData);
        dateMonitor.setDate(dateMonitor.getDate() + 1);
      }

      this.scheduleList = [...this.scheduleList, workerData];
    });

  }

  getCellStyle(column: string, cellValue: any): { [klass: string]: any } {
  // Skip special columns
  if (column === this.EMPLOYEE_COLUMN || column === this.TIME_COLUMN) {
    return {};
  }

  // If cellValue is an object with a color, use it
  if (cellValue && typeof cellValue === 'object' && cellValue.color) {
    return {
      'background-color': cellValue.color
    };
  }

  return {};
}


  //#endregion

  //#endregion

}
