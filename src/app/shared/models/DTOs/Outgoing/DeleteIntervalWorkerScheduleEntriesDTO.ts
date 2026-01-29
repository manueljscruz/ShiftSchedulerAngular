import { BaseViewModelRequestDTO } from "./BaseViewModelRequestDTO";

export class DeleteIntervalWorkerScheduleEntriesDTO extends BaseViewModelRequestDTO{
    startDate: Date;
    endDate: Date;

    constructor(entityId: string, workerId: string, startDate: Date, endDate: Date){
        super(entityId, workerId);
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
