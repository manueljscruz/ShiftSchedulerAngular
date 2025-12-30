export class EntityWorkerDTO {
    entityId: string;
    entityName: string;
    isOwner: boolean;

    constructor(
        entityId: string,
        entityName: string,
        isOwner : boolean
    ) {
        this.entityId = entityId;
        this.entityName = entityName;
        this.isOwner = isOwner;
    }

    static newEntityWorkerDTO(): EntityWorkerDTO {
        return new EntityWorkerDTO(
            '',
            '',
            false
        );
    }
}