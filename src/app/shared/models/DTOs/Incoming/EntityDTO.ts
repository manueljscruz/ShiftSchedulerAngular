export class EntityDTO{
    EntityId: string;
    EntityName: string;
    EntityDescription: string;
    EntityTypeLocalized: string;
    EntityWorkersCount: number;

    constructor(entityId: string, entityName: string, entityDescription: string, entityTypeLocalized: string, entityWorkersCount: number) {
        this.EntityId = entityId;
        this.EntityName = entityName;
        this.EntityDescription = entityDescription;
        this.EntityTypeLocalized = entityTypeLocalized;
        this.EntityWorkersCount = entityWorkersCount;
    }
}