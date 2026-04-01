export class MemberExitDTO {
    workerId: string = '';
    entityId: string = '';
    isBot: boolean = false;
    dateToExit: string | null = null;

    constructor(workerId: string = '', entityId: string = '', isBot: boolean = false) {
        this.workerId = workerId;
        this.entityId = entityId;
        this.isBot = isBot;
    }
}
