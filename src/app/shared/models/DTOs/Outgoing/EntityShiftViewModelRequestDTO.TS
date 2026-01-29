export class EntityShiftViewModelRequestDTO {
    entityId: string;
    workerId: string;

    constructor(entityId: string, workerId: string) {
        this.entityId = entityId;
        this.workerId = workerId;
    }
}
