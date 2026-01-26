export class EntityPublicProfileDTO {
    entityId: string;
    entityName: string;
    entityTypeLocalized: string;
    description: string;

    constructor(
        entityId: string = '',
        entityName: string = '',
        entityTypeLocalized: string = '',
        description: string = ''
    ) {
        this.entityId = entityId;
        this.entityName = entityName;
        this.entityTypeLocalized = entityTypeLocalized;
        this.description = description;
    }
}
