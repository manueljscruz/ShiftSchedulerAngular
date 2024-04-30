export class EntityWorkerDTO {
    EntityId: string;
    EntityName: string;

    constructor(
        entityId: string,
        entityName: string
        
    ) {
        this.EntityId = entityId;
        this.EntityName = entityName;
    }
}