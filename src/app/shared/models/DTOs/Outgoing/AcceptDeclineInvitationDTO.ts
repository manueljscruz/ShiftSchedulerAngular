export class AcceptDeclineInvitationDTO {
    workerId: string;
    entityId: string;

    constructor(workerId: string, entityId: string) {
        this.workerId = workerId;
        this.entityId = entityId;
    }
}
