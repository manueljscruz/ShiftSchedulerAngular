import { MemberListFilterDTO } from "./MemberListFilterDTO";
import { PagedModelRequest } from "./PagedModelRequest";

export class MemberListRequestDTO extends PagedModelRequest {
    memberFilters: MemberListFilterDTO;

    /**
     *
     */
    constructor(entityId: string, workerId: string, languageCode: string, currentPage: number, nextPage: number, itemsPerPage: number, memberFilters: MemberListFilterDTO) {
        super(entityId, workerId, languageCode, currentPage, nextPage, itemsPerPage);
        this.memberFilters = memberFilters;
    }
}
