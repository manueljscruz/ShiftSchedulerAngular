import { MemberListFilterDTO } from "./MemberListFilterDTO";
import { PagedModelRequest } from "./PagedModelRequest";

export class MemberListRequestDTO extends PagedModelRequest {
    memberFilters: MemberListFilterDTO;

    /**
     *
     */
    constructor(entityId: string, workerId: string, currentPage: number, nextPage: number, itemsPerPage: number, memberFilters: MemberListFilterDTO, showInactive: boolean = false) {
        super(entityId, workerId, currentPage, nextPage, itemsPerPage, showInactive);
        this.memberFilters = memberFilters;
    }
}
