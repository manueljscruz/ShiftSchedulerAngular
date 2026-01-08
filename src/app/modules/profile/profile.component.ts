import { Component } from '@angular/core';
import { EDIT_ICON } from '../../shared/constants/IconNamesConstants';
import { GenderLocalizedDTO } from '../../shared/models/DTOs/Incoming/GenderLocalizedDTO';
import { HomeService } from '../../core/services/api/HomeService';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { BaseResponseModel } from '../../shared/models/baseResponseModel';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { LoadingSpinnerManagerService } from '../../core/services/ui/loading-spinner-manager.service';
import { WorkerService } from '../../core/services/api/WorkerService';
import { LocalService } from '../../core/services/local.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent{

  EDIT_ICON: string = EDIT_ICON;

  public gendersLocalized: GenderLocalizedDTO[] = [];
  selectedGender? : GenderLocalizedDTO;
  loggedUser: UserDTO = new UserDTO();
  backupUser: UserDTO = new UserDTO();

  isEditing: boolean = false;

  // Mobile actions menu toggle
  public isMobileActionsOpen: boolean = false;

  constructor(private auxDataService: HomeService, 
    private snackbarManagerService: SnackbarManagerService, 
    private loadingScreenService: LoadingSpinnerManagerService,
    private workerService : WorkerService,
    private localStore: LocalService) 
    { }

  async ngOnInit() {
    // Load the logged user
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    this.backupUser = { ...this.loggedUser };
    
    // Load the
    this.gendersLocalized = await this.auxDataService.getGenders();
    if (this.backupUser != null && this.backupUser.genderId != null) {
      
      this.selectedGender = this.gendersLocalized.find(g => g.genderId == this.backupUser?.genderId);
    }
  }

  toggleEditProfile() {
    this.isEditing = !this.isEditing;
  }

  async saveProfile() {

    let validationResult: BaseResponseModel = this.validateProfileInput();

    if(validationResult.result){

      this.backupUser.genderId = this.selectedGender?.genderId || 0;
      // Save the profile
      this.loadingScreenService.changeLoadingState(true);

      // Call the API to save the profile
      let response : BaseResponseModel = await this.workerService.updateWorker(this.backupUser);

      this.loadingScreenService.changeLoadingState(false);

      if(response.result){
        this.toggleEditProfile();
        this.localStore.saveData("loggedUser", JSON.stringify(this.backupUser));
        this.loggedUser = { ...this.backupUser };
        this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(5, 'Profile saved successfully'));
      }
      else{
        this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, response.message));
      }
      
    }
    else{
      this.snackbarManagerService.showFailSnackbar(new SnackbarUIModel(5, validationResult.message));
    }
  }

  private validateProfileInput() : BaseResponseModel {
    let emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    let response = new BaseResponseModel(false, '', null);

    if(this.backupUser.userDisplayName.trim().length === 0)
    {
      response.message = 'A name is required';
      return response;
    }

    else if(this.selectedGender === undefined){
      response.message = 'Gender is required';
      return response;
    }

    else if(this.backupUser.email.trim().length === 0){
      response.message = 'Email is required';
      return response;
    }

    else if(!emailRegex.test(this.backupUser.email)){
      response.message = 'Invalid Email address';
      return response;
    }

    else response.result = true;

    return response;
  }
}
