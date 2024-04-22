export class NewEntityDTO {
    EntityName: string;
    EntityTypeId: number;
    EntityDescription: string;
    WorkerId: string;

    constructor(
        EntityName: string,
        EntityTypeId: number,
        EntityDescription: string,
        WorkerId: string
    ) {
        this.EntityName = EntityName;
        this.EntityTypeId = EntityTypeId;
        this.EntityDescription = EntityDescription;
        this.WorkerId = WorkerId;
    }
}