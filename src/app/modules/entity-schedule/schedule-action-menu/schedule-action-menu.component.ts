import { Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { EntityWorkerMemberDTO } from '../../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';
import { ScheduleEntryDTO } from '../../../shared/models/DTOs/Incoming/ScheduleEntryDTO';
import { ShiftDTO } from '../../../shared/models/DTOs/Incoming/ShiftDTO';
import { EntityRuleDTO } from '../../../shared/models/DTOs/Incoming/EntityRuleDTO';
import { init } from 'emailjs-com';
import { SnackbarManagerService } from '../../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../../shared/models/UI/SnackbarUIModel';
import { Entity } from '../../../shared/models/database/entity';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'schedule-action-menu',
  templateUrl: './schedule-action-menu.component.html',
  styleUrl: './schedule-action-menu.component.css'
})

export class ScheduleActionMenuComponent {

  //#region Properties

  workingDate: Date = new Date();

  /// <summary>
  /// List of entity workers this entity has.
  /// </summary>
  entityWorkers: EntityWorkerMemberDTO[] = [];

  /// <summary>
  /// List of schedule entries for the entity on this day.
  /// </summary>
  scheduleEntries: ScheduleEntryDTO[] = [];

  /// <summary>
  /// List of shifts available for the entity.
  /// </summary>
  entityShifts: ShiftDTO[] = [];

  /// <summary>
  /// List of entity rules that apply to the entity.
  /// </summary>
  entityRules: EntityRuleDTO[] = [];

  /// <summary>
  /// The selected schedule entry for the action.
  /// </summary>
  selectedScheduleEntry: ScheduleEntryDTO | null = null;

  /// <summary>
  /// The selected shift for the action.
  /// </summary>
  /// <remarks>
  /// This is used to select a shift for a new schedule entry.
  /// </remarks>
  selectedShift: ShiftDTO | null = null;

  filteredShifts: ShiftDTO[] = [];

  selectedWorker: EntityWorkerMemberDTO | null = null;

  notSelectedWorkers: EntityWorkerMemberDTO[] = [];

  selectedWorkers: EntityWorkerMemberDTO[] = [];

  @ViewChild(MatTable) notSelectedTable!: MatTable<any>;

  @ViewChild(MatTable) selectedTable!: MatTable<any>;

  /// <summary>
  /// Event emitter for schedule action operations.
  /// </summary>
  /// <remarks>
  /// This is used to emit the result of the action performed in this menu.
  /// </remarks>
  @Output() onScheduleActionOp = new EventEmitter<BaseResponseModel>();

  //#endregion

  //#region Constructor

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarManagerService: SnackbarManagerService) {
    // Initialization logic can go here if needed
    this.workingDate = data.workingDate || new Date();
    this.entityWorkers = data.entityMembers || [];
    this.scheduleEntries = data.scheduleEntries || [];
    this.entityShifts = data.entityShifts || [];
    this.entityRules = data.entityRules || [];

    this.initialUi();
  }

  //#endregion

  //#region Methods

  //#region Initial UI

  initialUi() {
    if(this.scheduleEntries.length > 0) {
      this.selectedScheduleEntry = this.scheduleEntries[0];
    }

    this.filterShifts();
  }

  //#endregion

  //#region Filter Shifts

  filterShifts() {
    this.filteredShifts = this.entityShifts.filter(shift => {
      return !this.scheduleEntries.some(entry => entry.shiftId === shift.shiftId);
    });
  }

  //#endregion

  //#region Filter Workers

  filterWorkers() {
    this.notSelectedWorkers = this.entityWorkers.filter(worker => {
      return !this.selectedWorkers.some(selected => selected.workerId === worker.workerId);
    });
  }

  //#endregion

  //#region On Close

  onClose() {
    this.onScheduleActionOp.emit(new BaseResponseModel(false, "Canceled", null));
  }

  //#endregion

  //#region On Save

  onSave() {
  throw new Error('Method not implemented.');
  }

  //#endregion

  //#region On Add Entry

  onAddEntry() {
    // Validate if a shift was selected
    if(this.selectedShift == null) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Shift required'));
      return;
    }

    // Validate if there is a schedule entry for the selected shift
    if(this.scheduleEntries.some(entry => entry.shiftId === this.selectedShift?.shiftId)) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Shift already scheduled'));
      return;
    }

    // Set the start date and end date based on the selected shift
    let startDate = this.workingDate;
    // Extract hours and minutes from the shift start hour
    // Note: The shiftStartHour is expected to be in the format "HH:mm".
    const [hours, minutes] = this.selectedShift?.shiftStartHour.toString().split(':').map(Number) || [0, 0];
    startDate.setHours(hours, minutes, 0, 0);

    let endDate = new Date(startDate);
    // Extract hours and minutes from the shift duration
    // Note: The shiftDuration is expected to be in the format "HH:mm".
    const [durationHours, durationMinutes] = this.selectedShift?.shiftDuration.toString().split(':').map(Number) || [0, 0];
    endDate.setHours(endDate.getHours() + (durationHours));
    endDate.setMinutes(endDate.getMinutes() + (durationMinutes));

    // Create a new schedule entry with the selected shift and calculated start and end dates
    // Note: The scheduleEntryId is set to an empty string as it will be generated by the backend.
    let newScheduleEntry = new ScheduleEntryDTO("", this.selectedShift.shiftId, startDate, endDate, this.selectedShift, []);

    // Add the new schedule entry to the list of schedule entries
    // and set it as the selected schedule entry.
    // Note: This will not persist the entry to the backend, it is just for UI purposes.
    this.scheduleEntries.push(newScheduleEntry);
    this.selectedScheduleEntry = newScheduleEntry;

    // Filter the shifts to remove the selected shift from the list of available shifts
    this.selectedShift = null;
    this.filterShifts();
    this.filterWorkers();

    this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Schedule entry added successfully'));
  }

  //#endregion

  //#region On Remove All Workers

  onRemoveAllWorkers() {
    let allSelectedWorkers = this.selectedWorkers;

    if(allSelectedWorkers.length === 0) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'No workers to remove'));
      return;
    }

    allSelectedWorkers.forEach(worker => {
      this.notSelectedWorkers = [...this.notSelectedWorkers, worker]; // Add the worker to the not selected workers list
      worker.isSelected = false; // Uncheck the worker after adding to not selected workers
    });

    this.selectedWorkers = [];

    this.selectedTable.renderRows();
    this.notSelectedTable.renderRows();
  }
    
  //#endregion

  //#region On Remove Worker

  onRemoveWorker() {
    let checkedWorkers = this.selectedWorkers.filter(worker => worker.isSelected);
    if(checkedWorkers.length === 0) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'No workers selected'));
      return;
    }

    checkedWorkers.forEach(element => {
      this.notSelectedWorkers = [...this.notSelectedWorkers, element]; // Add the worker to the not selected workers list
      element.isSelected = false; // Uncheck the worker after adding to not selected workers

      // Remove the worker from the selected workers list
      let index = this.selectedWorkers.indexOf(element);  
      if(index > -1) {
        this.selectedWorkers.splice(index, 1); // Remove from selected workers
      }
    });

    this.selectedTable.renderRows();
    this.notSelectedTable.renderRows(); 
  }
  
  //#endregion

  //#region On Assign All Workers

  onAssignAllWorkers() {
    let allRemaingWorkers = this.notSelectedWorkers;

    if(allRemaingWorkers.length === 0) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'No workers to assign'));
      return;
    }

    allRemaingWorkers.forEach(worker => {
      this.selectedWorkers = [...this.selectedWorkers, worker]; // Add the worker to the selected workers list
      worker.isSelected = false; // Uncheck the worker after adding to selected workers

    });

    this.notSelectedWorkers = [];

    this.selectedTable.renderRows();
    this.notSelectedTable.renderRows();
  }
    
  //#endregion

  //#region On Assign Worker

  onAssignWorker() {
    let checkedWorkers = this.notSelectedWorkers.filter(worker => worker.isSelected);
    if(checkedWorkers.length === 0) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'No workers selected'));
      return;
    }

    checkedWorkers.forEach(element => {
      this.selectedWorkers = [...this.selectedWorkers, element]; // Add the worker to the selected workers list

      element.isSelected = false; // Uncheck the worker after adding to selected workers

      // Remove the worker from the not selected workers list
      let index = this.notSelectedWorkers.indexOf(element);
      if(index > -1) {
        this.notSelectedWorkers.splice(index, 1); // Remove from not selected workers
      }
    });

    this.selectedTable.renderRows();
    this.notSelectedTable.renderRows();

    this.filterWorkers();
  }

  //#endregion

  toggleWorkerAssignment(worker: EntityWorkerMemberDTO) {
    worker.isSelected = !worker.isSelected;
  }


  //#endregion

}
