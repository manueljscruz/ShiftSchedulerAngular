import { Component } from '@angular/core';
import { WorkerDTO } from '../../shared/models/DTOs/Incoming/WorkerDTO';
import { ActivatedRoute } from '@angular/router';
import { ShiftDTO } from '../../shared/models/DTOs/Incoming/ShiftDTO';
import { ShiftBreakDTO } from '../../shared/models/DTOs/Incoming/ShiftBreakDTO';
import { ShiftBreakDialogFormComponent } from './shift-break-dialog-form/shift-break-dialog-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ShiftViewModel } from '../../shared/models/VM/ShiftViewModel';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { ShiftService } from '../../core/services/api/ShiftService';
import { EntityShiftViewModelRequestDTO } from '../../shared/models/DTOs/Outgoing/EntityShiftViewModelRequestDTO';

@Component({
  selector: 'app-entity-shifts',
  templateUrl: './entity-shifts.component.html',
  styleUrl: './entity-shifts.component.css'
})
export class EntityShiftsComponent {

  /// <summary>
  /// Logged user object
  /// </summary>
  public loggedUser: WorkerDTO = new WorkerDTO();
  
  /// <summary>
  /// Current entity id
  /// </summary>
  private currentEntityId: string = '';
  
  /// <summary>
  /// Is current user entity owner flag
  /// </summary>
  public isCurrentUserEntityOwner: boolean = false;

  /// <summary>
  /// Is the form visible at this moment
  /// </summary>
  public isFormActive : boolean = true;

  /// <summary>
  /// Signaling if the user is editing the shift
  /// </summary>
  public isEditing: boolean = false;

  /// <summary>
  /// Selected shift object
  /// </summary>
  public SelectedShift: ShiftDTO = ShiftDTO.newShiftDTO();

  /// <summary>
  /// Selected shift breaks
  /// </summary>
  public SelectedShiftBreaks: ShiftBreakDTO[] = [];

  /// <summary>
  /// Shift view model object
  /// </summary>
  ShiftViewModel: ShiftViewModel = new ShiftViewModel([], [], false, []);

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackbarManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private shiftService: ShiftService
  ) 
  { 
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
  }

  async ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.isCurrentUserEntityOwner = true;

    // Turn on the loading spinner
    this.loadingScreenService.changeLoadingState(true);

    // Get the shifts View Model
    let entityShiftVWRequest = new EntityShiftViewModelRequestDTO(this.currentEntityId, this.loggedUser.WorkerId, '');
    this.ShiftViewModel = await this.shiftService.getShiftViewModel(entityShiftVWRequest);

    // Turn off the loading spinner
    this.loadingScreenService.changeLoadingState(false);
  }

  toggleForm(isEditing: boolean) {
    this.isFormActive = !this.isFormActive;
    this.isEditing = isEditing;
  }

  onStartTimerChange($event: any) {
    // const formattedTime = this.formatTime(event);
    console.log(this.SelectedShift.ShiftStartHour);
  }

  saveShift() {
    
  }

  openShiftBreakDialogForm(enterAnimationDuration: string, exitAnimationDuration: string, isAddingShiftBreak : boolean, shiftBreakDTO: ShiftBreakDTO) {
    const dialogRef = this.dialog.open(ShiftBreakDialogFormComponent, {
      width: '600px',
      data: { 
        enterAnimationDuration, 
        exitAnimationDuration, 
        isAddingShiftBreak, 
        currentShiftId: this.SelectedShift.ShiftId, 
        shiftBreakTypes: this.ShiftViewModel.ShiftBreakTypeLocalizeds, 
        shiftBreakDTO : shiftBreakDTO,
        shiftBreakTemplateDTOs: this.ShiftViewModel.ShiftBreakTemplates}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.SelectedShiftBreaks.push(result);
      }
    });
  }

  newShiftBreak() {
    this.openShiftBreakDialogForm('5000', '5000', true, ShiftBreakDTO.newShiftBreakDTO());
  }
}
