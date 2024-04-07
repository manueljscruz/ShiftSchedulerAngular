export class EntityWorkerDTO {
    entityId: string;
    entityName: string;
    entityDescription: string;
    canCreateSchedules: boolean;
    isOwner: boolean;

    constructor(
        entityId: string,
        entityName: string,
        entityDescription: string,
        canCreateSchedules: boolean,
        isOwner: boolean
    ) {
        this.entityId = entityId;
        this.entityName = entityName;
        this.entityDescription = entityDescription;
        this.canCreateSchedules = canCreateSchedules;
        this.isOwner = isOwner;
    }
}