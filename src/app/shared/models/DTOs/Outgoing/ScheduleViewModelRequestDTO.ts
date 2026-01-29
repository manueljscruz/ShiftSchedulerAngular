import { BaseViewModelRequestDTO } from "./BaseViewModelRequestDTO";

export class ScheduleViewModelRequestDTO extends BaseViewModelRequestDTO {
    startDateSearch: Date;
    endDateSearch: Date;

    constructor(entityId: string, workerId: string, startDate: Date, endDate: Date) {
        super(entityId, workerId);
        this.startDateSearch = startDate;
        this.endDateSearch = endDate;
    }
}
