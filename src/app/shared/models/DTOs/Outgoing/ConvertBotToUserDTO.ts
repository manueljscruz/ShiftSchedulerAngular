export class ConvertBotToUserDTO {
    entityId: string;
    userBotId: string;
    applicationUserIdTarget: string;

    constructor(entityId: string, userBotId: string, workerIdToConvertTo: string) {
        this.entityId = entityId;
        this.userBotId = userBotId;
        this.applicationUserIdTarget = workerIdToConvertTo;
    }
}