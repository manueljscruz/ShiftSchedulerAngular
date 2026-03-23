export class UpdateMemberPermissionDTO {
    workerId: string;
    entityId: string;
    entityPermissionRoleId: number;
    canManageChildren: boolean;
    partOfRoster: boolean;

    constructor(workerId: string, entityId: string, entityPermissionRoleId: number, canManageChildren: boolean, partOfRoster: boolean) {
        this.workerId = workerId;
        this.entityId = entityId;
        this.entityPermissionRoleId = entityPermissionRoleId;
        this.canManageChildren = canManageChildren;
        this.partOfRoster = partOfRoster;
    }
}
