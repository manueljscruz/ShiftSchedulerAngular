import { Component } from '@angular/core';
import { FILTER_ICON } from '../../shared/constants/IconNamesConstants';
import { EntityMembersViewModel } from '../../shared/models/UI/EntityMembersViewModel';
import { EntityService } from '../../core/services/api/EntityService';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { ActivatedRoute } from '@angular/router';
import { SkillDTO } from '../../shared/models/DTOs/Incoming/SkillDTO';
import { WorkerDTO } from '../../shared/models/DTOs/Incoming/WorkerDTO';
import { LocalService } from '../../core/services/local.service';
import { EntityWorkerMemberDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerMemberDTO';
import { MatDialog } from '@angular/material/dialog';
import { AddMemberDialogComponent } from './add-member-dialog/add-member-dialog.component';


@Component({
  selector: 'app-entity-workers',
  templateUrl: './entity-workers.component.html',
  styleUrl: './entity-workers.component.css'
})
export class EntityWorkersComponent {

  /// <summary>
  /// Constant filter icon name
  /// </summary>
  public FILTER_ICON: string = FILTER_ICON;

  /// <summary>
  /// View model object for the entity workers page
  /// </summary>
  public entityMembersViewModel: EntityMembersViewModel;

  /// <summary>
  /// Selected skill filter object
  /// </summary>
  public selectedSkill? : SkillDTO;

  /// <summary>
  /// Logged user object
  /// </summary>
  public loggedUser: WorkerDTO = new WorkerDTO();

  /// <summary>
  /// Current entity id
  /// </summary>
  private currentEntityId: string = '';

  /// <summary>
  /// Filter active flag
  /// </summary>
  public isFilterActive: boolean = false;

  /// <summary>
  /// Name filter
  /// </summary>
  public nameFilter: string = '';

  /// <summary>
  /// Is current user entity owner flag
  /// </summary>
  public isCurrentUserEntityOwner: boolean = false;
  
  
  /// Constructor
  constructor(private entityService : EntityService,
    private localStore: LocalService,
    private snackManagerService: SnackbarManagerService,
    private loadingScreenService: LoadingSpinnerManagerService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.entityMembersViewModel = new EntityMembersViewModel("", [], []);
    this.currentEntityId = this.route.snapshot.paramMap.get('entityId') || '';
  }

  /// Methods
  async ngOnInit() {
    this.loadingScreenService.changeLoadingState(true);
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.entityMembersViewModel = await this.entityService.getEntityMembersViewModel(this.currentEntityId);

    this.prepareViewModel();
    this.isCurrentUserEntityOwner = this.entityMembersViewModel.EntityOwnerId === this.loggedUser.WorkerId ? true : false;
    this.loadingScreenService.changeLoadingState(false);
  }

  /// <summary>
  /// Method that activates or deactivates the filter options
  /// </summary>
  toggleFilters() {
    this.isFilterActive = !this.isFilterActive;
  }

  /// <summary>
  /// Method that readjusts the view model object to the correct format
  /// </summary>
  prepareViewModel(){
    let members : any = this.entityMembersViewModel.EntityMembers;
    let memberArray = members.$values as EntityWorkerMemberDTO[];
    this.entityMembersViewModel.EntityMembers = memberArray;
    
    let skills : any = this.entityMembersViewModel.Skills;
    let skillArray = skills.$values as SkillDTO[];
    this.entityMembersViewModel.Skills = skillArray;

    this.entityMembersViewModel.EntityMembers.forEach(member => {
      let memberSkills : any = member.SkillSet;
      let memberSkillsArray = memberSkills.$values as SkillDTO[];
      member.SkillSet = memberSkillsArray;
    });
  }

  /// <summary>
  /// Method that opens the add member dialog
  /// </summary>
  openAddMemberDialog(enterAnimationDuration: string, exitAnimationDuration: string, skillList: SkillDTO[]){
    const dialogRef = this.dialog.open(AddMemberDialogComponent, {
      width: '500px',
      data: { enterAnimationDuration, exitAnimationDuration, skillList }
    });

    dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.addMember();
      };
    });
  }

  addMember(){
    
  }
}
