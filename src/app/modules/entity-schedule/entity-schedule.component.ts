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
import { ScheduleActionMenuComponent } from './schedule-action-menu/schedule-action-menu.component';
import { CANCEL_ICON, CLOSE_ICON, DONE_ICON, MAT_EDIT_ICON, SCHEDULE_ICON, SWAP_ICON } from '../../shared/constants/IconNamesConstants';
import { EntityWorkerMemberDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';
import { ScheduleEventViewHolderComponent } from './schedule-event-view-holder/schedule-event-view-holder.component';
import { ScheduleAuxService } from '../../core/services/schedule-aux.service';
import { formatDate } from '@angular/common';
import { ScheduleEntryParticipantDTO } from '../../shared/models/DTOs/Incoming/ScheduleEntryParticipantDTO';
import { AssignEntryDTO } from '../../shared/models/DTOs/Outgoing/AssignEntryDTO';
import { ApplyRotationCycleDTO } from '../../shared/models/DTOs/Outgoing/ApplyRotationCycleDTO';
import { DELETE_ALL_WORKER_SCHEDULE_CONTENT, DELETE_DAILY_WORKER_SCHEDULE_CONTENT, DELETE_SCHEDULE_ENTRIES_CONTENT, DELETE_WORKER_SCHEDULE_TITLE } from '../../shared/constants/UITextConstants';
import { DeleteIntervalWorkerScheduleEntriesDTO } from '../../shared/models/DTOs/Outgoing/DeleteIntervalWorkerScheduleEntriesDTO';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as htmlToImage from 'html-to-image';
import * as XLSX from 'xlsx';
import { GenericWarningDialogComponent } from '../../shared/components/generic-warning-dialog/generic-warning-dialog.component';
import { AuthService } from '../../core/services/api/AuthService';

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
  SCHEDULE_ICON: string = SCHEDULE_ICON;
  SWAP_ICON: string = SWAP_ICON;
  MAT_EDIT_ICON: string = MAT_EDIT_ICON;
  CANCEL_ICON: string = CANCEL_ICON;
  DONE_ICON: string = DONE_ICON;
  CLOSE_ICON: string = CLOSE_ICON;
  
  DELETE_WORKER_SCHEDULE_TITLE: string = DELETE_WORKER_SCHEDULE_TITLE;
  DELETE_DAILY_WORKER_SCHEDULE_CONTENT: string = DELETE_DAILY_WORKER_SCHEDULE_CONTENT
  DELETE_ALL_WORKER_SCHEDULE_CONTENT: string = DELETE_ALL_WORKER_SCHEDULE_CONTENT;

  //#endregion

  //#region Properties

  /// <summary>
  /// Logged user object
  /// </summary>
  public loggedUser: UserDTO | null = null;
  
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
  private _scheduleViewModel : EntityScheduleViewModel = new EntityScheduleViewModel([], false, [], [], []);

  public get scheduleViewModel() : EntityScheduleViewModel {
    return this._scheduleViewModel;
  }
  public set scheduleViewModel(v : EntityScheduleViewModel) {
    // Sort Workers and Shifts by shiftStartHour
    v.entityWorkerMembers = v.entityWorkerMembers.sort((a, b) => a.workerName.localeCompare(b.workerName));
    v.shifts = v.shifts.sort((a, b) => {
          const [aHours, aMinutes] = a?.shiftStartHour.toString().split(':').map(Number) || [0, 0];
          const [bHours, bMinutes] = b?.shiftStartHour.toString().split(':').map(Number) || [0, 0];
          // Assumes shiftStartHour is a Date object
          const aHour = aHours;
          const aMin = aMinutes;
          const bHour = bHours;
          const bMin = bMinutes;
          return aHour !== bHour ? aHour - bHour : aMin - bMin;
        });
    this._scheduleViewModel = v;
  }

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

  isCycleTracking : boolean = false;

  workerCycleTracking: EntityWorkerMemberDTO = EntityWorkerMemberDTO.newInstance();

  cycleStartDate: Date = new Date();

  //#endregion

  //#region Constructor
  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private scheduleService: ScheduleService,
    private scheduleAuxService: ScheduleAuxService,
    private authService: AuthService) {
      this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
      this.scheduleList = [];
  }

  //#endregion

  //#region Methods

  //#region On Init

  async ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.loggedUser = currentUser;
    }

    if (!this.loggedUser) {
      return;
    }

    this.setDates();

    // Turn on the loading spinner
    this.loadingScreenService.changeLoadingState(true);

    let entityScheduleViewModelRequestDTO = new ScheduleViewModelRequestDTO(this.currentEntityId, this.loggedUser.userId, '', this.startDate, this.endDate );

    // Get the schedule view model
    this.scheduleViewModel = await this.scheduleService.getScheduleViewModel(entityScheduleViewModelRequestDTO);

    this.scheduleEntries = this.scheduleViewModel.scheduleEntries;

    this.isCurrentUserEntityOwner = this.scheduleViewModel.allowEdit;

    // Turn off the loading spinner
    this.loadingScreenService.changeLoadingState(false);

    this.buildViews();
  }

  //#endregion

  private setDates() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth();

    this.startDate = new Date(Date.UTC(year, month, 1)); // midnight UTC
    this.endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59)); // last day at 23:59:59 UTC
  }

  //#endregion

  //#region On Create Schedule

  async onCreateSchedule(){
    if (!this.loggedUser) {
      return;
    }

    // Open the schedule creator menu
    const dialogRef = this.dialog.open(ScheduleCreatorMenuComponent, {
      width: '800px',
      height: '800px',
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

        if(this.isCurrentUserEntityOwner && this.loggedUser){
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

  //#endregion

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
        
        let scheduleArray: ScheduleEntryDTO[] = [scheduleEntry];
        const dialogRef = this.dialog.open(ScheduleEventViewHolderComponent, {
              width: '500px',
              data: { scheduleEntries: scheduleArray, isCurrentUserEntityOwner: this.isCurrentUserEntityOwner } 
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
    // console.log($event.day.date);
    // console.log($event.day.events);
    // console.log($event.sourceEvent);
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
    this.loadingScreenService.changeLoadingState(true);
    this.buildTable();
    this.buildCalendar();
    this.loadingScreenService.changeLoadingState(false);
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
        allDay: false
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
      // + ' (' + this.returnDayOfWeek(dateMonitor) + ')')
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
        isPartOfRotation: workerMember.partOfRotation,
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
                if(participant.worker.workerId === workerMember.workerId){

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

  //#endregion

  //#region Get Cell Style

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

  //#region On Open Entry

  onOpenEntry(element: any,date: string) {
    let id = element.id;
    let worker = this.scheduleViewModel.entityWorkerMembers.find(x => x.workerId === id);
    
    if(worker != null){

      let workerDayEntries = this.scheduleEntries.filter(x => this.formatDate(x.scheduleStartDate) === this.formatDate(new Date(date)) && x.scheduleParticipants.some(p => p.worker.workerId === id));
      
      if(workerDayEntries != null){
        const dialogRef = this.dialog.open(ScheduleEventViewHolderComponent, {
          width: '500px',
          data: { scheduleEntries: workerDayEntries, isCurrentUserEntityOwner: this.isCurrentUserEntityOwner } 
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

  //#region On Manage Day Schedule

  onManageDaySchedule(id: string, date: string) {
    let worker = this.scheduleViewModel.entityWorkerMembers.find(x => x.workerId === id);

    if(worker != null) {
      let dayEntries = this.scheduleEntries.filter(x => this.formatDate(x.scheduleStartDate) === this.formatDate(new Date(date)));

      if(dayEntries != null){
        const dialogRef = this.dialog.open(ScheduleActionMenuComponent, {
          width: '1280px',
          height: '720px',
          data: { 
            workingDate: new Date(date),
            scheduleEntries: dayEntries, 
            entityMembers : this.scheduleViewModel.entityWorkerMembers,
            entityShifts : this.scheduleViewModel.shifts,
            entityRules : this.scheduleViewModel.entityRules,
          } 
        });

        // Entry created event
        dialogRef.componentInstance.newScheduleEntryOp.subscribe((result : ScheduleEntryDTO) => {
          if (result != null) {
            this.scheduleEntries.push(result);
          }
        });
        
        // Schedule action completed event
        dialogRef.componentInstance.onScheduleActionOp.subscribe((result : BaseResponseModel) => {
          if (result.success) {
            let newUpdatedEntries = result.result as ScheduleEntryDTO[];

            newUpdatedEntries.forEach(scheduleEntry => {
              let entry = this.scheduleEntries.find(x => x.scheduleEntryId === scheduleEntry.scheduleEntryId 
                && x.shiftDTO.shiftId === scheduleEntry.shiftDTO.shiftId);
              if (entry) {
                // Update the existing entry
                Object.assign(entry, scheduleEntry);
              } else {
                // Add the new entry
                this.scheduleEntries.push(scheduleEntry);
              }
            });

            // Close the dialog
            this.buildViews();
          }
          this.loadingScreenService.changeLoadingState(false);
          dialogRef.close();
        });
      }
    }
  }

  //#endregion

  //#region Assign Shift to Employee

  async assignShiftToEmployee(workerId: string, date: string, shiftId: string){
    // Find the worker in the entity members
    let worker = this.scheduleViewModel.entityWorkerMembers.find(x => x.workerId === workerId);

    // Worker not found
    if(worker == null) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Worker not found'));
      return;
    }

    // Find the shift to make sure it exists
    let shift = this.scheduleViewModel.shifts.find(x => x.shiftId === shiftId);

    // Shift not found
    if(shift == null) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Shift not found'));
      return;
    }

    let scheduleEntryId : string = '';
    let dayEntryDate : Date = new Date(date);

    let dayEntries = this.scheduleEntries.filter(x => this.formatDate(x.scheduleStartDate) === this.formatDate(new Date(date)));

    // If there are no entries for the selected date, we can create a new entry
    if(dayEntries == null || dayEntries.length === 0) {
      // Create a new schedule entry for the worker on the selected date
      scheduleEntryId = '';
    }
    // If there are entries for the selected date, we need to check if the shift already exists
    else{
      // Check if there is already an entry for this shift on this date
      let dayShiftEntry = dayEntries.find(x => x.shiftDTO.shiftId === shiftId);

      if(dayShiftEntry != null)
        scheduleEntryId = dayShiftEntry.scheduleEntryId;
    }

    let assignEntryDTO : AssignEntryDTO = new AssignEntryDTO(worker.workerId, this.currentEntityId, '', worker.isBot, scheduleEntryId, shift.shiftId, dayEntryDate);
  
    this.loadingScreenService.changeLoadingState(true);

    let apiResponse = await this.scheduleService.assignEntry(assignEntryDTO);
  
    this.loadingScreenService.changeLoadingState(false);

    if(apiResponse.success){
      let scheduleEntry : ScheduleEntryDTO = apiResponse.result;

      let index = this.scheduleEntries.findIndex(x => x.scheduleEntryId === scheduleEntry.scheduleEntryId);
      if (index !== -1) {
        this.scheduleEntries[index] = scheduleEntry;
      }
      else{
        this.scheduleEntries = [... this.scheduleEntries, scheduleEntry];
      }

      this.buildViews();
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Unable to assign entry'));
      return;
    }
  }

  //#endregion

  // #region Assign Shift To Employee V1 NOT USED
  async _assignShiftToEmployee(workerId: string, date: string, shiftId: string) {
    console.log(`Assigning shift ${shiftId} to worker ${workerId} on date ${date}`);

    // Find the worker in the entity members
    let worker = this.scheduleViewModel.entityWorkerMembers.find(x => x.workerId === workerId);

    // Worker not found
    if(worker == null) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Worker not found'));
      return;
    }

    this.loadingScreenService.changeLoadingState(true);
    // Find existing schedule entries for the selected date
    let dayEntries = this.scheduleEntries.filter(x => this.formatDate(x.scheduleStartDate) === this.formatDate(new Date(date)));

    let entry : ScheduleEntryDTO | null = null;
    let createNewEntry = false;

    // If there are no entries for the selected date, we can create a new entry
    if(dayEntries == null || dayEntries.length === 0) {
      // Create a new schedule entry for the worker on the selected date
      createNewEntry = true;
    }
    // If there are entries for the selected date, we need to check if the shift already exists
    else{
      // Check if there is already an entry for this shift on this date
      let dayShiftEntry = dayEntries.find(x => x.shiftDTO.shiftId === shiftId);
      
      // If there is an entry for this shift, we can add the worker to the existing entry
      if(dayShiftEntry != null) {
        // Check if the worker is already assigned to this shift
        if(dayShiftEntry.scheduleParticipants.some(p => p.worker.workerId === workerId)) {
          this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Worker already assigned to this shift'));
          this.loadingScreenService.changeLoadingState(false);
          return;
        }
        else {
          // If the worker is not assigned, we can add the worker to the existing entry
          entry = dayShiftEntry;
        }
      }
      else {
        // If there is no entry for this shift, we can create a new entry
        createNewEntry = true;
      }
    }

    // Create a new entry if needed
    if(createNewEntry) {
      let shift = this.scheduleViewModel.shifts.find(x => x.shiftId === shiftId);

      if(shift == null) {
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Shift not found'));
        this.loadingScreenService.changeLoadingState(false);
        return;
      }
      // Create a new schedule entry
      entry = this.scheduleAuxService.createNewScheduleEntry(new Date(date), shift);
    }

    // Add the worker to the entry
    let schedulePartipant : ScheduleEntryParticipantDTO = new ScheduleEntryParticipantDTO(worker, false, worker.skillSet);
    entry?.scheduleParticipants.push(schedulePartipant);

    if(createNewEntry && entry != null) {
      // If we created a new entry, we need to add it to the schedule entries
      this.scheduleEntries.push(entry);
      this.buildViews();
    }
    else if(entry != null) {
      // If we updated an existing entry, we need to update the schedule entries
      let index = this.scheduleEntries.findIndex(x => x.scheduleEntryId === entry?.scheduleEntryId);
      if(index !== -1) {
        this.scheduleEntries[index] = entry;
      }
      else {
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Entry not found'));
        this.loadingScreenService.changeLoadingState(false);
        return;
      }

      this.buildViews();
    }
    this.loadingScreenService.changeLoadingState(false);
  }

  //#endregion

  //#region On End Rotation Cycle

  async onEndRotationCycle(workerId: string, date: string) {
    if(workerId != null && workerId !== this.workerCycleTracking.workerId){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Wrong worker selected for rotation cycle end'));
      return;
    }

    let endDate = new Date(date);
    if(endDate < this.cycleStartDate){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'End date cannot be before start date'));
      return;
    }

    this.loadingScreenService.changeLoadingState(true);

    let applyRotationCycleDTO : ApplyRotationCycleDTO = new ApplyRotationCycleDTO(
      this.currentEntityId,
      this.workerCycleTracking.workerId,
      this.workerCycleTracking.isBot,
      '',
      this.cycleStartDate,
      endDate);


    let response = await this.scheduleService.ApplyRotationCycle(applyRotationCycleDTO);

    this.loadingScreenService.changeLoadingState(false);

    if(response.success){

      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Rotation cycle applied successfully'));

      // Reset the cycle tracking
      this.onCancelCycleOp();

      // this.scheduleEntries = response.result as ScheduleEntryDTO[];

      let previousEntries = this.scheduleEntries.filter(x => new Date(x.scheduleStartDate) < this.cycleStartDate || new Date(x.scheduleEndDate) > endDate);

      this.scheduleEntries = [
        ...previousEntries,
        ...response.result as ScheduleEntryDTO[],
      ];
      
      this.buildViews();
    }

    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Failed to apply rotation cycle'));
    }


  }

  //#endregion

  //#region On Cancel Cycle Op

  onCancelCycleOp() {
    // Cancel the cycle tracking
    this.isCycleTracking = false;
    this.workerCycleTracking = EntityWorkerMemberDTO.newInstance();
    this.cycleStartDate = new Date();
  }

  //#endregion

  //#region On Start Rotation Cycle

  onStartRotationCycle(workerId: string, date: string) {
  
    if(!this.isCycleTracking){
      // Start the cycle tracking
      this.isCycleTracking = true;
      this.cycleStartDate = new Date(date);
      this.workerCycleTracking = this.scheduleViewModel.entityWorkerMembers.find(x => x.workerId === workerId) || EntityWorkerMemberDTO.newInstance();
      if(this.workerCycleTracking == null || this.workerCycleTracking.workerId === ''){
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Worker not found'));
        this.isCycleTracking = false;
        return;
      }
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, "Select the end date for the rotation cycle."));
    }
  }

  //#endregion

  //#region On Apply Search

  async onApplySearch() {
    if (!this.loggedUser) {
      return;
    }

    // Get the start and end dates from the input fields
    // const startDateInput = (document.querySelector('input[name="schedule-start-date"]') as HTMLInputElement).value;
    // const endDateInput = (document.querySelector('input[name="schedule-end-date"]') as HTMLInputElement).value;

    // Parse the dates
    // this.startDate = new Date(startDateInput);
    //this.endDate = new Date(endDateInput);

    // Validate the dates
    if (this.startDate > this.endDate) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Start date cannot be after end date'));
      return;
    }

    this.loadingScreenService.changeLoadingState(true);

    let scheduleRequestDTO = new ScheduleViewModelRequestDTO(
      this.currentEntityId,
      this.loggedUser.userId,
      '',
      this.startDate,
      this.endDate
    );

    this.scheduleEntries = await this.scheduleService.getSchedules(scheduleRequestDTO);

    this.loadingScreenService.changeLoadingState(false);

    // Rebuild the views with the new dates
    this.buildViews();
  }

  //#endregion

  //#region On Clear Daily Employee Assignments

  onClearDailyEmployeeAssignments(workerId: string, date: string) {

    // Check if worker exists
    let worker = this.scheduleViewModel.entityWorkerMembers.find(x => x.workerId === workerId);
    if(worker == null){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Worker not found'));
      return;
    }

    // Filter for schedule entries where worker is assigned on that date
    let startDate = new Date(date);
    startDate.setHours(0,0,0,0);
    let endDate = new Date(date);
    endDate.setHours(23,59,59,999);

    if(startDate > this.endDate){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Start date cannot be after end date'));
      return;
    }

    let dateWorkerEntries = this.scheduleEntries.filter(i => this.formatDate(i.scheduleStartDate) === date && i.scheduleParticipants.some(p => p.worker.workerId === workerId));
    
    // If there are entries for that date, show confirmation dialog
    if(dateWorkerEntries != null && dateWorkerEntries.length > 0){
      let enterAnimationDuration = '5000';
      let exitAnimationDuration = '5000';
      const dialogRef = this.dialog.open(GenericWarningDialogComponent, {
            width: '500px',
            data: { enterAnimationDuration, exitAnimationDuration, warningTitle: DELETE_WORKER_SCHEDULE_TITLE, warningMessage: DELETE_DAILY_WORKER_SCHEDULE_CONTENT, isDeleteWarning: true }
          });
      
          dialogRef.afterClosed().subscribe(async result =>{
            // If user confirms deletion
            if(result){
              await this.clearWorkerParticipationFromEntries(dateWorkerEntries, workerId, startDate, endDate);
            };
          });
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'No schedule entries found for the selected worker on the specified date'));
    }
  }
  
  //#endregion

  //#region On Clear All Employee Assignments

  async onClearEmployeeAssignments(workerId: string, column: string) {

    let worker = this.scheduleViewModel.entityWorkerMembers.find(x => x.workerId === workerId);
    if(worker == null){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Worker not found'));
      return;
    }

    // Check for the current interval of the schedule entries
    let workerEntries = this.scheduleEntries.filter(i => i.scheduleParticipants.some(p => p.worker.workerId === workerId));
    
    if(workerEntries != null && workerEntries.length > 0){
      let enterAnimationDuration = '5000';
      let exitAnimationDuration = '5000';
      const dialogRef = this.dialog.open(GenericWarningDialogComponent, {
            width: '500px',
            data: { enterAnimationDuration, exitAnimationDuration, warningTitle: DELETE_WORKER_SCHEDULE_TITLE, warningMessage: DELETE_ALL_WORKER_SCHEDULE_CONTENT, isDeleteWarning: true }
          });

          dialogRef.afterClosed().subscribe(async result =>{
            // If user confirms deletion
            if(result){
              await this.clearWorkerParticipationFromEntries(workerEntries, workerId, this.startDate, this.endDate);
            }
          });
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'No schedule entries found for the selected worker on the specified interval'));
    }
  }

  //#endregion

  //#region Clear Worker Participation From Entries


  /**
   * Removes a worker's participation from the provided schedule entries within a specified date range.
   * 
   * Sends a request to delete the worker's schedule entries for the current entity and updates the UI accordingly.
   * Displays a success message upon successful deletion and rebuilds the schedule views.
   * 
   * @param entries - The list of schedule entries to update.
   * @param workerId - The ID of the worker whose participation is to be cleared.
   * @param startDate - The start date of the interval for which to clear participation.
   * @param endDate - The end date of the interval for which to clear participation.
   */
  async clearWorkerParticipationFromEntries(entries : ScheduleEntryDTO[], workerId: string, startDate: Date, endDate: Date){ 
  
    // SEND : EntityId, WorkerId, Start Date and End Date
    let deleteIntervalRequest : DeleteIntervalWorkerScheduleEntriesDTO = new DeleteIntervalWorkerScheduleEntriesDTO(
      this.currentEntityId,
      workerId,
      startDate,
      endDate);

    this.loadingScreenService.changeLoadingState(true);
    
    let response = await this.scheduleService.deleteWorkerEntries(deleteIntervalRequest);
    
    this.loadingScreenService.changeLoadingState(false);

    if(response.success){
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, response.message || 'Worker schedule participation entries deleted successfully'));
      
      entries.forEach(entry => {
        entry.scheduleParticipants = entry.scheduleParticipants.filter(p => p.worker.workerId !== workerId);
      });

      this.buildViews();
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message || 'Failed to delete worker schedule participation entries'));
    }   
  }

  //#endregion

  //#region On Delete Schedule

  onDeleteSchedule() {
    
    if(this.startDate > this.endDate){
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Start date cannot be after end date'));
      return;
    }

    // If there are entries for that date, show confirmation dialog
    if(this.scheduleEntries != null && this.scheduleEntries.length > 0){
      let enterAnimationDuration = '5000';
      let exitAnimationDuration = '5000';
      const dialogRef = this.dialog.open(GenericWarningDialogComponent, {
            width: '500px',
            data: { enterAnimationDuration, exitAnimationDuration, warningTitle: DELETE_WORKER_SCHEDULE_TITLE, warningMessage: DELETE_SCHEDULE_ENTRIES_CONTENT, isDeleteWarning: true }
          });
      
          dialogRef.afterClosed().subscribe(async result =>{
            // If user confirms deletion
            if(result){
              await this.clearAllScheduleEntries(this.startDate, this.endDate);
            };
          });
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'No schedule entries found on the specified dates'));
    }
  }

  //#endregion

  //#region Clear All Schedule Entries

  async clearAllScheduleEntries(startDate: Date, endDate: Date){

    let intervalRequest : DeleteIntervalWorkerScheduleEntriesDTO = new DeleteIntervalWorkerScheduleEntriesDTO(
      this.currentEntityId,
      '',
      startDate,
      endDate);

    this.loadingScreenService.changeLoadingState(true);

    let response = await this.scheduleService.deleteScheduleEntries(intervalRequest);

    this.loadingScreenService.changeLoadingState(false);

    if(response.success){
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, response.message || 'All schedule entries deleted successfully'));
      this.scheduleEntries = [];
      this.buildViews();
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message || 'Failed to delete all schedule entries'));
    }
  }

  //#endregion

  //#region On Start Date Change

  onStartDateChange(event: MatDatepickerInputEvent<Date>) {
    let input = event.value;
    input = input ? new Date(Date.UTC(input.getFullYear(), input.getMonth(), input.getDate())) : new Date();
    this.startDate = input;
  }

  //#endregion

  //#region On End Date Change

  onEndDateChange(event: MatDatepickerInputEvent<Date>) {
    let input = event.value;
    input = input ? new Date(Date.UTC(input.getFullYear(), input.getMonth(), input.getDate())) : new Date();
    this.endDate = input;
  }

  //#endregion

  //#region Format Date

  formatDate = (d: Date | string) => {
    const date = new Date(d);
    return date.toISOString().split('T')[0]; // Retorna 'yyyy-mm-dd'
  };

  //#endregion

  //#region Export Schedule to Excel
  async exportScheduleToExcel() {

    this.loadingScreenService.changeLoadingState(true);

    const tableElement = document.getElementById('schedule-list'); // table container

    /*
    if (!element) return;

    htmlToImage.toPng(element, { backgroundColor: '#FFFFFF' })
      .then((dataUrl) => {
        // Now insert this PNG into Excel
        this.insertImageIntoExcel(dataUrl);
      })
      .catch((error) => {
        console.error('Error capturing table as image:', error);
      });
    */

    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tableElement);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Schedule');

    XLSX.writeFile(workbook, 'schedule.xlsx');

    this.loadingScreenService.changeLoadingState(false);
  }

  private insertImageIntoExcel(base64Image: string): void {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Schedule');

    // Add the image to Excel
    const imageId = workbook.addImage({
      base64: base64Image,
      extension: 'png',
    });

    // Position image in the worksheet
    worksheet.addImage(imageId, {
      tl: { col: 0, row: 0 }, // top-left corner
      ext: { width: 1500, height: 800 }, // size (adjust to your table size)
    });

    // Export Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      fs.saveAs(new Blob([buffer]), 'schedule.xlsx');
    });
  }

  private returnDayOfWeek(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  //#endregion
}
