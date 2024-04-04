export class EntityTypeLocalizedDTO {
    entityTypeId: number;
    entityTypeLocalizedName: string;

    constructor(entityTypeId: number, entityTypeLocalizedName: string) {
        this.entityTypeId = entityTypeId;
        this.entityTypeLocalizedName = entityTypeLocalizedName;
    }
}