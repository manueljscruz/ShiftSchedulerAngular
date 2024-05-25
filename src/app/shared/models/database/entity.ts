export class Entity{
    entityId: string;
    entityName: string;
    entityDescription: string;
    entityTypeId: number;

    constructor(entityId: string, entityName: string, entityDescription: string, entityTypeId: number){
        this.entityId = entityId;
        this.entityName = entityName;
        this.entityDescription = entityDescription;
        this.entityTypeId = entityTypeId;
    }
}