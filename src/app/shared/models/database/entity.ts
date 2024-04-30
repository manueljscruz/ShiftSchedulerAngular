export class Entity{
    EntityId: string;
    EntityName: string;
    EntityDescription: string;
    EntityTypeId: number;

    constructor(entityId: string, entityName: string, entityDescription: string, entityTypeId: number){
        this.EntityId = entityId;
        this.EntityName = entityName;
        this.EntityDescription = entityDescription;
        this.EntityTypeId = entityTypeId;
    }
}