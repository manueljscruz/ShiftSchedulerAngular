import { Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
import { ADD_ICON, CANCEL_ICON, CLOSE_ICON, SAVE_ICON } from '../../../shared/constants/IconNamesConstants';
import { SkillDTO } from '../../../shared/models/DTOs/Incoming/SkillDTO';
import { ADD_SKILL } from '../../../shared/constants/DataConstants';
import { WorkerSkillSelectorComponent } from '../worker-skill-selector/worker-skill-selector.component';
import { ScheduleEntryParticipantDTO } from '../../../shared/models/DTOs/Incoming/ScheduleEntryParticipantDTO';
import { LoadingSpinnerManagerService } from '../../../core/services/ui/loading-spinner-manager.service';
import { ScheduleAuxService } from '../../../core/services/schedule-aux.service';

@Component({
  selector: 'schedule-action-menu',
  templateUrl: './schedule-action-menu.component.html',
  styleUrl: './schedule-action-menu.component.css'
})

export class ScheduleActionMenuComponent {

  CLOSE_ICON : string = CLOSE_ICON;
  SAVE_ICON: string = SAVE_ICON;
  CANCEL_ICON : string = CANCEL_ICON;
  ADD_ICON: string = ADD_ICON;
  ADD_SKILL: SkillDTO = ADD_SKILL;

  //#region Properties

  workingDate: Date = new Date();

  /// <summary>
  /// List of entity workers this entity has.
  /// </summary>
  readonly entityWorkers: EntityWorkerMemberDTO[] = [];

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
  private _selectedScheduleEntry : ScheduleEntryDTO | null = null;

  public get selectedScheduleEntry() : ScheduleEntryDTO {
    return this._selectedScheduleEntry? this._selectedScheduleEntry : ScheduleEntryDTO.newScheduleEntryDTO();
  }

  public set selectedScheduleEntry(v : ScheduleEntryDTO) {
    if(this.selectedScheduleEntry != null)
    {
      this.saveScheduleDataInternally();
      this.selectedWorkers = [];
    }
    this._selectedScheduleEntry = v;
  }

  /// <summary>
  /// The selected shift for the action.
  /// </summary>
  /// <remarks>
  /// This is used to select a shift for a new schedule entry.
  /// </remarks>
  selectedShift: ShiftDTO | null = null;

  /// <summary>
  /// List of shifts that are not already scheduled for the selected date.
  /// </summary>
  /// <remarks>
  /// This is used to filter the shifts that are available for selection.
  /// </remarks>
  filteredShifts: ShiftDTO[] = [];

  /// <summary>
  /// List of workers not selected for the schedule entry.
  /// </summary>
  notSelectedWorkers: EntityWorkerMemberDTO[] = [];

  /// <summary>
  /// List of workers selected for the schedule entry.
  /// </summary>
  selectedWorkers: ScheduleEntryParticipantDTO[] = [];

  entity: Entity | null = null;

  /// <summary>
  /// Not selected workers table reference
  /// </summary>
  @ViewChild(MatTable) notSelectedTable!: MatTable<any>;

  /// <summary>
  /// Selected workers table reference
  /// </summary>
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
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private scheduleAuxService: ScheduleAuxService) {
    // Initialization logic can go here if needed
    this.workingDate = data.workingDate || new Date();
    this.entityWorkers = data.entityMembers || [];
    this.scheduleEntries = data.scheduleEntries || [];
    this.entityShifts = data.entityShifts || [];
    this.entityRules = data.entityRules || [];
  }

  //#endregion

  //#region Methods

  ngOnInit() {
    this.initialUi();
  }

  //#region Initial UI

  initialUi() {
    if(this.scheduleEntries.length > 0) {
      this.selectedScheduleEntry = this.scheduleEntries[0];
      this.loadScheduleEntry(this.selectedScheduleEntry);
    }

    this.filterShifts();
  }

  //#endregion

  //#region Filter Shifts

  filterShifts() {
    this.filteredShifts = this.entityShifts
      .filter(shift => {
        return !this.scheduleEntries.some(entry => entry.shiftId === shift.shiftId);
      })
      .sort((a, b) => {
        const [aHours, aMinutes] = a?.shiftStartHour.toString().split(':').map(Number) || [0, 0];
        const [bHours, bMinutes] = b?.shiftStartHour.toString().split(':').map(Number) || [0, 0];
        // Assumes shiftStartHour is a Date object
        const aHour = aHours;
        const aMin = aMinutes;
        const bHour = bHours;
        const bMin = bMinutes;
        return aHour !== bHour ? aHour - bHour : aMin - bMin;
      });
  }

  //#endregion

  //#region Filter Workers

  filterWorkers() {
    this.notSelectedWorkers = this.entityWorkers
      .filter(worker => {
        return !this.selectedWorkers.some(selected => selected.worker.workerId === worker.workerId);
      })
      .sort((a, b) => a.workerName.localeCompare(b.workerName));
  }

  //#endregion

  //#region On Close

  onClose() {
    this.onScheduleActionOp.emit(new BaseResponseModel(false, "Canceled", null));
  }

  //#endregion

  //#region On Save

  async onSave() {
    if(this.scheduleEntries.length === 0) {
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'No schedule entries to save'));
      return;
    }

    this.loadingScreenService.changeLoadingState(true);

    this.saveScheduleDataInternally();

    // TO DO: MAKE API CALL TO SAVE SCHEDULE ENTRIES
    this.onScheduleActionOp.emit(new BaseResponseModel(true, "Schedule entries saved successfully", this.scheduleEntries));
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

    let newScheduleEntry = this.scheduleAuxService.createNewScheduleEntry(this.workingDate, this.selectedShift)
    
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
      this.notSelectedWorkers = [...this.notSelectedWorkers, worker.worker]; // Add the worker to the not selected workers list
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

      let worker = this.entityWorkers.find(w => w.workerId === element.worker.workerId);

      if (worker) {
        this.notSelectedWorkers = [...this.notSelectedWorkers, worker]; // Add the worker to the not selected workers list
        worker.isSelected = false; // Uncheck the worker after adding to not selected workers
      }

      // Remove the worker from the selected workers list
      let index = this.selectedWorkers.indexOf(element);  
      if(index > -1) {
        this.selectedWorkers.splice(index, 1); // Remove from selected workers
      }
    });

    this.selectedWorkers = [...this.selectedWorkers]; 

    this.selectedTable.renderRows();
    this.notSelectedTable.renderRows(); 

    this.filterWorkers();
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
      let newParticipant = new ScheduleEntryParticipantDTO(worker, false, [...worker.skillSet]); // Create a new participant with the worker and their skills
      this.selectedWorkers = [...this.selectedWorkers, newParticipant]; // Add the worker to the selected workers list
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
      let newParticipant = new ScheduleEntryParticipantDTO(element, false, [...element.skillSet]); // Create a new participant with the worker and their skills

      this.selectedWorkers = [...this.selectedWorkers, newParticipant]; // Add the worker to the selected workers list

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

  //#region Toggle Worker Assignment

  toggleWorkerAssignment(worker: EntityWorkerMemberDTO) {
    worker.isSelected = !worker.isSelected;
  }

  //#endregion

  //#region On Schedule Entry Change

  onScheduleEntryChange(scheduleEntry: any) {
    this.loadScheduleEntry(scheduleEntry);
  }

  //#endregion

  //#region Load Schedule Entry

  loadScheduleEntry(scheduleEntry: ScheduleEntryDTO) {
    this.notSelectedWorkers = this.entityWorkers.filter(worker => {
      return !scheduleEntry.scheduleParticipants.some(selected => selected.worker.workerId === worker.workerId);
    });

    this.selectedWorkers = [...scheduleEntry.scheduleParticipants];

    // this.selectedTable.renderRows();
    // this.notSelectedTable.renderRows();
  }

  //#endregion

  //#region On Skill Clicked

  onSkillClicked(worker: ScheduleEntryParticipantDTO, skill: SkillDTO) {

    if(skill.skillId === ADD_SKILL.skillId) {
      // If the skill is the ADD_SKILL
      
      let availableSkills = worker.worker.skillSet.filter(s => !worker.assignedSkills.some(selected => selected.skillId === s.skillId));

      const dialogRef = this.dialog.open(WorkerSkillSelectorComponent, {
        data: { workerSkills: availableSkills },
      });

      dialogRef.componentInstance.onSkillSelectedOp.subscribe((result: BaseResponseModel) => {

        if (result && result.success) {
          let selectedSkill = result.result as SkillDTO;
          if(selectedSkill != null)
          {
            if(worker.assignedSkills.some(s => s.skillId === selectedSkill.skillId)) {
              this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Skill already selected'));
              return;
            }

            worker.assignedSkills = [...worker.assignedSkills, selectedSkill]; // Add the selected skill to the worker's selected skills

            // If all skills are selected, remove the ADD_SKILL from the selected skills
            if(worker.assignedSkills.some(s => s.skillId === ADD_SKILL.skillId) && worker.assignedSkills.length-1 === worker.worker.skillSet.length) {
              // If all skills are selected, remove the ADD_SKILL from the selected skills
              let indexOfAddSkill = worker.assignedSkills.findIndex(s => s.skillId === ADD_SKILL.skillId);
              if (indexOfAddSkill > -1) {
                worker.assignedSkills.splice(indexOfAddSkill, 1); // Remove the ADD_SKILL from the selected skills
              }
            }
          }
        }

        dialogRef.close();
      });

      return;
    }

    else {
      let indexOfSkill = worker.assignedSkills.findIndex(s => s.skillId === skill.skillId);
      if (indexOfSkill > -1) {
        worker.assignedSkills.splice(indexOfSkill, 1); // Remove the skill from the selected skills
      } else {
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, 'Skill not found in selected skills'));
        return;
      }
    }

    // If not all skills are selected and the ADD_SKILL is NOT present, remove it
    if(worker.assignedSkills.length != worker.worker.skillSet.length && !worker.assignedSkills.some(s => s.skillId === ADD_SKILL.skillId)) {
      worker.assignedSkills = [...worker.assignedSkills, ADD_SKILL]; // Add the ADD_SKILL to the selected skills
    }

  }

  //#endregion

  //#region Save Schedule Data Internally

  saveScheduleDataInternally(){
    if(this.selectedWorkers.length != 0){
      if(this.selectedScheduleEntry != null) {
        this.selectedScheduleEntry.scheduleParticipants = [...this.selectedWorkers];
      }
    }
  }

  //#endregion

  //#region Toggle Worker for Unassignment

  toggleWorkerForUnassignment(participant: ScheduleEntryParticipantDTO) {
    participant.isSelected = !participant.isSelected;
  }

  //#endregion

  //#endregion

}
