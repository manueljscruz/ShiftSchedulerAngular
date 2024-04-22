export class EntityProfileViewModelRequestDTO {

    entityId: string;
    workerId: string;
    languageCode: string;

    constructor(entityId: string, workerId: string, languageCode: string) {
        this.entityId = entityId;
        this.workerId = workerId;
        this.languageCode = languageCode;
    }
}