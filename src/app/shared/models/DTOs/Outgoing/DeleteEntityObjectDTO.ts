export class DeleteEntityObjectDTO {
    entityId: string;
    objectId: string;
    
    constructor(entityId: string, objectId: string) {
        this.entityId = entityId;
        this.objectId = objectId;
    }
}