export class FormEntityDTO {
    EntityId? : string;
    EntityName: string;
    EntityTypeId: number;
    EntityDescription: string;
    WorkerId: string;

    constructor(
        EntityId: string | undefined,
        EntityName: string,
        EntityTypeId: number,
        EntityDescription: string,
        WorkerId: string
    ) {
        this.EntityId = EntityId;
        this.EntityName = EntityName;
        this.EntityTypeId = EntityTypeId;
        this.EntityDescription = EntityDescription;
        this.WorkerId = WorkerId;
    }
}