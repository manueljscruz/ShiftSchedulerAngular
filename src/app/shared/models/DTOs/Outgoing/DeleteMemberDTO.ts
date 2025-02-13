export class DeleteMemberDTO{
    workerId: string;
    entityId: string;
    isBot: boolean;

    constructor(workerId: string, entityId: string, isBot: boolean){
        this.workerId = workerId;
        this.entityId = entityId;
        this.isBot = isBot;
    }
}