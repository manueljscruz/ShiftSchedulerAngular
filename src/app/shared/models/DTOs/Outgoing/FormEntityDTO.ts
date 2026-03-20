export class FormEntityDTO {
    EntityId? : string;
    EntityName: string;
    EntityTypeId: number;
    EntityDescription: string;
    WorkerId: string;
    ParentEntityId?: string;

    constructor(
        EntityId: string | undefined,
        EntityName: string,
        EntityTypeId: number,
        EntityDescription: string,
        WorkerId: string,
        ParentEntityId?: string
    ) {
        this.EntityId = EntityId;
        this.EntityName = EntityName;
        this.EntityTypeId = EntityTypeId;
        this.EntityDescription = EntityDescription;
        this.WorkerId = WorkerId;
        this.ParentEntityId = ParentEntityId;
    }
}