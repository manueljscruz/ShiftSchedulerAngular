import { PagedModelRequest } from "./PagedModelRequest";

export class SearchRequestDTO extends PagedModelRequest {
    query: string = '';
    resultType?: string;

    constructor(
        entityId: string = '',
        workerId: string = '',
        currentPage: number = 0,
        nextPage: number = 1,
        itemsPerPage: number = 10,
        query: string = '',
        resultType?: string,
        showInactive: boolean = false
    ) {
        super(entityId, workerId, currentPage, nextPage, itemsPerPage, showInactive);
        this.query = query;
        this.resultType = resultType;
    }
}
