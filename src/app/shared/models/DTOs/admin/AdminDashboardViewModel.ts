export interface RecentEntityDTO {
    entityName: string;
    entityTypeName: string;
    createdAt: string;
}

export interface RecentMemberDTO {
    userDisplayName: string;
    entityName: string;
    joinedAt: string;
}

export interface AdminDashboardViewModel {
    totalUsers: number;
    totalEntities: number;
    activeMembers: number;
    recentEntities: RecentEntityDTO[];
    recentMembers: RecentMemberDTO[];
}
