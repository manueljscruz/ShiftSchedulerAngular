export class PendingInvitationDTO {
    entityId: string = '';
    entityName: string = '';
    inviteDate: Date = new Date();
    entityPermissionRoleId: number = 0;

    get roleName(): string {
        switch (this.entityPermissionRoleId) {
            case 1: return 'General Manager';
            case 2: return 'Manager';
            default: return 'Viewer';
        }
    }
}
