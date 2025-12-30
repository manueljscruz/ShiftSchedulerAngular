import { Component, Inject } from '@angular/core';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { LocalService } from '../../core/services/local.service';
import { EntityService } from '../../core/services/api/EntityService';
import { EntityWorkerDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerDTO';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {

  loggedUser: UserDTO;

  selectedTabIndex : number = 0;

  workEntities : EntityWorkerDTO[] = [];

  constructor(@Inject(LocalService) private localStore: LocalService,
    private entityService: EntityService,
    private snackbarManagerService: SnackbarManagerService) {
    this.loggedUser = JSON.parse(this.localStore.getData("loggedUser"));
  }

  async ngOnInit() {
    this.workEntities = await this.entityService.getEntitiesByWorkerId(this.loggedUser.userId);
  }
  
  onTabSelected($event: MatTabChangeEvent) {
    this.selectedTabIndex = $event.index;
  }

 

}
