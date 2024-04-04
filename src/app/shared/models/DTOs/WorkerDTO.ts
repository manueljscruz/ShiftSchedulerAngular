export class WorkerDTO {
    workerId: string;
    workerName: string;
    genderId: number;
    workerEmail: string;

    constructor(workerId: string, workerName: string, genderId: number, workerEmail: string) {
        this.workerId = workerId;
        this.workerName = workerName;
        this.genderId = genderId;
        this.workerEmail = workerEmail;
    }
}