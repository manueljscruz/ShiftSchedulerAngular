import { Component } from '@angular/core';
import { EDIT_ICON } from '../../shared/constants/IconNamesConstants';
import { GenderLocalizedDTO } from '../../shared/models/DTOs/Incoming/GenderLocalizedDTO';
import { AuxiliaryDataService } from '../../core/services/api/AuxiliaryDataService';
import { WorkerDTO } from '../../shared/models/DTOs/Incoming/WorkerDTO';
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
  loggedUser: WorkerDTO = new WorkerDTO();
  backupUser: WorkerDTO = new WorkerDTO();

  isEditing: boolean = false;

  constructor(private auxDataService: AuxiliaryDataService, 
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
    let gendersLocalized = await this.auxDataService.getGenders();
    //let genderArray = gendersLocalized.$values;
    this.gendersLocalized = gendersLocalized.$values;
    if (this.loggedUser != null && this.loggedUser.genderId != null) {
      
      this.selectedGender = this.gendersLocalized.find(g => g.genderId == this.loggedUser?.genderId);
    }
  }

  toggleEditProfile() {
    this.isEditing = !this.isEditing;
  }

  async saveProfile() {

    let validationResult: BaseResponseModel = this.validateProfileInput();

    if(validationResult.result){

      this.loggedUser.genderId = this.selectedGender?.genderId || 0;
      // Save the profile
      this.loadingScreenService.changeLoadingState(true);

      // Call the API to save the profile
      let response : BaseResponseModel = await this.workerService.updateWorker(this.loggedUser);

      this.loadingScreenService.changeLoadingState(false);

      if(response.result){
        this.toggleEditProfile();
        this.localStore.saveData("loggedUser", JSON.stringify(this.loggedUser));
        this.backupUser = { ...this.loggedUser };
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

    if(this.loggedUser.workerName.trim().length === 0)
    {
      response.message = 'A name is required';
      return response;
    }

    else if(this.selectedGender === undefined){
      response.message = 'Gender is required';
      return response;
    }

    else if(this.loggedUser.email.trim().length === 0){
      response.message = 'Email is required';
      return response;
    }

    else if(!emailRegex.test(this.loggedUser.email)){
      response.message = 'Invalid Email address';
      return response;
    }

    else response.result = true;

    return response;
  }
}
