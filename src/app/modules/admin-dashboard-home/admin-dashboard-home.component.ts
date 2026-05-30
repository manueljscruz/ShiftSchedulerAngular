import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../core/services/api/AuthService';
import { UserDTO } from '../../shared/models/DTOs/Incoming/UserDTO';
import { AdminDashboardViewModel } from '../../shared/models/DTOs/admin/AdminDashboardViewModel';
import { GET_ADMIN_DASHBOARD_URL } from '../../shared/constants/APIPathsConstants';

@Component({
    selector: 'app-admin-dashboard-home',
    templateUrl: './admin-dashboard-home.component.html',
    styleUrl: './admin-dashboard-home.component.css'
})
export class AdminDashboardHomeComponent implements OnInit {

    loggedUser: UserDTO | null = null;
    viewModel: AdminDashboardViewModel | null = null;
    isLoading: boolean = false;

    readonly recentEntityColumns = ['entityName', 'entityTypeName', 'createdAt'];
    readonly recentMemberColumns = ['userDisplayName', 'entityName', 'joinedAt'];

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {}

    async ngOnInit(): Promise<void> {
        this.loggedUser = this.authService.getCurrentUser();
        await this.loadStats();
    }

    private async loadStats(): Promise<void> {
        this.isLoading = true;
        try {
            this.viewModel = await firstValueFrom(
                this.http.get<AdminDashboardViewModel>(GET_ADMIN_DASHBOARD_URL)
            );
        } catch (error: any) {
            console.error('Error loading admin dashboard stats:', error.message);
        } finally {
            this.isLoading = false;
        }
    }
}
