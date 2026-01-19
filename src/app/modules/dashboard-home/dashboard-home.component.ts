import { Component } from '@angular/core';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { EntityService } from '../../core/services/api/EntityService';
import { EntityWorkerDTO } from '../../shared/models/DTOs/Incoming/EntityWorkerDTO';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from '../../core/services/api/AuthService';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {

  loggedUser: UserDTO | null = null;

  selectedTabIndex : number = 0;

  workEntities : EntityWorkerDTO[] = [];

  constructor(private entityService: EntityService,
    private snackbarManagerService: SnackbarManagerService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    this.authService.currentUser$.subscribe(async user => {
      this.loggedUser = user;

      if (this.loggedUser) {
        try {
          this.workEntities = await this.entityService.getEntitiesByWorkerId(this.loggedUser.userId);
        } catch (error) {
          console.error('Failed to load entities:', error);
          // Error will be handled by interceptor
        }
      }
    });
  }
  
  onTabSelected($event: MatTabChangeEvent) {
    this.selectedTabIndex = $event.index;
  }

 

}
