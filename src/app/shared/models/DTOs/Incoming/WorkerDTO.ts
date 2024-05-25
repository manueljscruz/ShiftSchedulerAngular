export class WorkerDTO {
    workerId: string;
    workerName: string;
    genderId: number;
    email: string;

    constructor(workerId: string = '', workerName: string = '', genderId: number = 0, workerEmail: string = '') {
        this.workerId = workerId;
        this.workerName = workerName;
        this.genderId = genderId;
        this.email = workerEmail;
    }
}