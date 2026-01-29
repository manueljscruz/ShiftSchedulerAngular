import { BaseViewModelRequestDTO } from "./BaseViewModelRequestDTO";

export class PagedModelRequest extends BaseViewModelRequestDTO {

    currentPage : number = 0;
    nextPage : number = 0;
    itemsPerPage: number = 0;

    /**
     *
     */
    constructor(entityId: string, workerId: string, currentPage: number, nextPage: number, itemsPerPage: number) {
        super(entityId, workerId);
        currentPage = currentPage;
        nextPage = nextPage;
        itemsPerPage = itemsPerPage;
    }
}
