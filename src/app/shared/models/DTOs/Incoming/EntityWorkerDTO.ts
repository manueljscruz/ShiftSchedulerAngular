export class EntityWorkerDTO {
    entityId: string;
    entityName: string;
    parentEntityId: string | null;

    /// Null when this entry is an ancestor included for breadcrumb/path context only.
    /// Non-null when the user holds an explicit permission role at this entity.
    entityPermissionRoleId: number | null;

    constructor(
        entityId: string,
        entityName: string,
        parentEntityId: string | null,
        entityPermissionRoleId: number | null
    ) {
        this.entityId = entityId;
        this.entityName = entityName;
        this.parentEntityId = parentEntityId;
        this.entityPermissionRoleId = entityPermissionRoleId;
    }

    static newEntityWorkerDTO(): EntityWorkerDTO {
        return new EntityWorkerDTO('', '', null, null);
    }
}
