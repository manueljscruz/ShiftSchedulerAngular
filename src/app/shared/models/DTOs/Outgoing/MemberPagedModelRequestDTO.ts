import { PagedModelRequest } from './PagedModelRequest';
import { MemberListFilterDTO } from '../Outgoing/MemberListFilterDTO';

export class MemberPagedModelRequestDTO extends PagedModelRequest {
    memberFilters: MemberListFilterDTO;

    constructor(entityId: string, workerId: string, currentPage: number, nextPage: number, itemsPerPage: number, memberFilters: MemberListFilterDTO, showInactive: boolean = false) {
        super(entityId, workerId, currentPage, nextPage, itemsPerPage, showInactive);
        this.memberFilters = memberFilters;
    }
}