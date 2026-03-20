import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class DashboardHomeComponent implements OnDestroy {

  loggedUser: UserDTO | null = null;

  selectedTabIndex : number = 0;

  workEntities : EntityWorkerDTO[] = [];

  // Subscription management
  private destroy$ = new Subject<void>();

  constructor(private entityService: EntityService,
    private snackbarManagerService: SnackbarManagerService,
    private authService: AuthService) {
  }

  async ngOnInit() {
    // Wait for auth initialization
    await this.authService.waitForInitialization();

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async user => {
        this.loggedUser = user;

        if (this.loggedUser) {
          try {
            const allEntities = await this.entityService.getEntitiesByWorkerId(this.loggedUser.userId);
            // Only show entities where the user has an explicit role as dashboard tabs.
            // Ancestor path nodes (entityPermissionRoleId === null) are navigation-only.
            this.workEntities = allEntities.filter((dto: EntityWorkerDTO) => dto.entityPermissionRoleId != null);
          } catch (error) {
            console.error('Failed to load entities:', error);
            // Error will be handled by interceptor
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTabSelected($event: MatTabChangeEvent) {
    this.selectedTabIndex = $event.index;
  }



}
