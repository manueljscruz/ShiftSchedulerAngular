import { BaseViewModelRequestDTO } from "./BaseViewModelRequestDTO";

export class PagedModelRequest extends BaseViewModelRequestDTO {

    currentPage : number = 0;
    nextPage : number = 0;
    itemsPerPage: number = 0;
    showInactive: boolean = false;
    /**
     *
     */
    constructor(entityId: string, workerId: string, currentPage: number, nextPage: number, itemsPerPage: number, showInactive: boolean) {
        super(entityId, workerId);
        this.currentPage = currentPage;
        this.nextPage = nextPage;
        this.itemsPerPage = itemsPerPage;
        this.showInactive = showInactive;
    }
}
