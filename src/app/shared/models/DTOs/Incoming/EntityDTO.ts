export class EntityDTO{
    entityId: string;
    entityName: string;
    entityDescription: string;
    entityTypeLocalized: string;
    entityWorkersCount: number;

    constructor(entityId: string, entityName: string, entityDescription: string, entityTypeLocalized: string, entityWorkersCount: number) {
        this.entityId = entityId;
        this.entityName = entityName;
        this.entityDescription = entityDescription;
        this.entityTypeLocalized = entityTypeLocalized;
        this.entityWorkersCount = entityWorkersCount;
    }
}