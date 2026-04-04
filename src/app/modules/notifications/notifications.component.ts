import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../core/services/api/AuthService';
import { NotificationService } from '../../core/services/api/NotificationService';
import { UserNotificationDTO } from '../../shared/models/DTOs/Incoming/UserNotificationDTO';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { SnackbarManagerService } from '../../core/services/ui/snackbar-manager.service';
import { SnackbarUIModel } from '../../shared/models/UI/SnackbarUIModel';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnDestroy {

  //#region Properties

  loggedUser: UserDTO | null = null;
  notifications: UserNotificationDTO[] = [];
  isLoading: boolean = false;

  // Pagination
  pageIndex: number = 0;
  pageSize: number = 20;
  totalCount: number = 0;

  private destroy$ = new Subject<void>();

  //#endregion

  //#region Constructor

  constructor(
    private authService: AuthService,
    public notificationService: NotificationService,
    private snackbarManagerService: SnackbarManagerService
  ) {}

  //#endregion

  //#region Lifecycle

  async ngOnInit() {
    await this.authService.waitForInitialization();

    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async user => {
        this.loggedUser = user;
        if (this.loggedUser) {
          await this.loadNotifications();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //#endregion

  //#region Load Notifications

  async loadNotifications(): Promise<void> {
    this.isLoading = true;
    try {
      this.notifications = await this.notificationService.getMyNotifications(this.pageIndex + 1, this.pageSize);
    } catch {
      this.notifications = [];
    }
    this.isLoading = false;
  }

  //#endregion

  //#region Pagination

  async onPageChange(event: PageEvent): Promise<void> {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    await this.loadNotifications();
  }

  //#endregion

  //#region Actions

  get hasUnread(): boolean {
    return this.notifications.some(n => !n.isRead);
  }

  async markAsRead(notification: UserNotificationDTO): Promise<void> {
    if (notification.isRead) return;
    const success = await this.notificationService.markAsRead(notification.id);
    if (success) {
      notification.isRead = true;
    }
  }

  async markAllAsRead(): Promise<void> {
    const success = await this.notificationService.markAllAsRead();
    if (success) {
      this.notifications.forEach(n => n.isRead = true);
      this.snackbarManagerService.showSuccessSnackbar(new SnackbarUIModel(3, 'All notifications marked as read.'));
    }
  }

  //#endregion

  //#region Helpers

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  }

  //#endregion
}
