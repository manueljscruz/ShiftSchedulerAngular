import { PagedModelRequest } from "./PagedModelRequest";

export class SearchRequestDTO extends PagedModelRequest {
    query: string = '';
    resultType?: string;

    constructor(
        entityId: string = '',
        workerId: string = '',
        languageCode: string = '',
        currentPage: number = 0,
        nextPage: number = 1,
        itemsPerPage: number = 10,
        query: string = '',
        resultType?: string
    ) {
        super(entityId, workerId, languageCode, currentPage, nextPage, itemsPerPage);
        this.query = query;
        this.resultType = resultType;
    }
}
