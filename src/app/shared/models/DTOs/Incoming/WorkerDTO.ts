export class WorkerDTO {
    WorkerId: string;
    WorkerName: string;
    GenderId: number;
    Email: string;

    constructor(workerId: string = '', workerName: string = '', genderId: number = 0, workerEmail: string = '') {
        this.WorkerId = workerId;
        this.WorkerName = workerName;
        this.GenderId = genderId;
        this.Email = workerEmail;
    }
}