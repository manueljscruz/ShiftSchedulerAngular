export class EntityWorkerDTO {
    entityId: string;
    entityName: string;

    constructor(
        entityId: string,
        entityName: string
        
    ) {
        this.entityId = entityId;
        this.entityName = entityName;
    }
}