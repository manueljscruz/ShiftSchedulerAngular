export class EntityTypeLocalizedDTO {
    EntityTypeId: number;
    EntityTypeLocalizedName: string;

    constructor(entityTypeId: number, entityTypeLocalizedName: string) {
        this.EntityTypeId = entityTypeId;
        this.EntityTypeLocalizedName = entityTypeLocalizedName;
    }
}