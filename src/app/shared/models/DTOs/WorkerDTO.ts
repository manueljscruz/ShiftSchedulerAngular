export class WorkerDTO {
    workerId: number;
    workerName: string;
    genderId: number;
    workerEmail: string;

    constructor(workerId: number, workerName: string, genderId: number, workerEmail: string) {
        this.workerId = workerId;
        this.workerName = workerName;
        this.genderId = genderId;
        this.workerEmail = workerEmail;
    }
}