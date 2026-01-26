export class WorkerPublicProfileDTO {
    workerId: string;
    displayName: string;
    genderLocalized: string;

    constructor(
        workerId: string = '',
        displayName: string = '',
        genderLocalized: string = ''
    ) {
        this.workerId = workerId;
        this.displayName = displayName;
        this.genderLocalized = genderLocalized;
    }
}
