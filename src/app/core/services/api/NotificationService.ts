import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, Subject, Subscription } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { BaseResponseModel } from '../../../shared/models/baseResponseModel';
import { UserNotificationDTO } from '../../../shared/models/DTOs/Incoming/UserNotificationDTO';
import {
    GET_MY_NOTIFICATIONS_URL,
    GET_UNREAD_COUNT_URL,
    MARK_NOTIFICATION_READ_URL,
    MARK_ALL_READ_URL
} from '../../../shared/constants/APIPathsConstants';

@Injectable({
    providedIn: 'root'
})
export class NotificationService implements OnDestroy {

    private unreadCount$ = new BehaviorSubject<number>(0);
    unreadCount = this.unreadCount$.asObservable();

    private pollingSubscription: Subscription | null = null;
    private destroy$ = new Subject<void>();

    constructor(private http: HttpClient) {}

    // ─── Polling ────────────────────────────────────────────────────────────────

    startPolling(): void {
        if (this.pollingSubscription) return;

        this.pollingSubscription = interval(30000).pipe(
            startWith(0),
            switchMap(() => this.fetchUnreadCount()),
            takeUntil(this.destroy$)
        ).subscribe(count => this.unreadCount$.next(count));
    }

    stopPolling(): void {
        if (this.pollingSubscription) {
            this.pollingSubscription.unsubscribe();
            this.pollingSubscription = null;
        }
        this.unreadCount$.next(0);
    }

    // ─── API Methods ─────────────────────────────────────────────────────────────

    private async fetchUnreadCount(): Promise<number> {
        try {
            const response = await this.http
                .get<BaseResponseModel<number>>(GET_UNREAD_COUNT_URL)
                .toPromise();
            return response?.result ?? 0;
        } catch {
            return this.unreadCount$.getValue();
        }
    }

    async getMyNotifications(page: number = 1, pageSize: number = 20): Promise<UserNotificationDTO[]> {
        try {
            const response = await this.http
                .get<BaseResponseModel<UserNotificationDTO[]>>(
                    `${GET_MY_NOTIFICATIONS_URL}?page=${page}&pageSize=${pageSize}`
                )
                .toPromise();
            return response?.result ?? [];
        } catch {
            return [];
        }
    }

    async markAsRead(id: string): Promise<boolean> {
        try {
            const response = await this.http
                .put<BaseResponseModel<boolean>>(`${MARK_NOTIFICATION_READ_URL}/${id}`, {})
                .toPromise();
            if (response?.success) {
                const current = this.unreadCount$.getValue();
                if (current > 0) this.unreadCount$.next(current - 1);
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }

    async markAllAsRead(): Promise<boolean> {
        try {
            const response = await this.http
                .put<BaseResponseModel<boolean>>(MARK_ALL_READ_URL, {})
                .toPromise();
            if (response?.success) {
                this.unreadCount$.next(0);
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }

    // ─── Lifecycle ────────────────────────────────────────────────────────────────

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
