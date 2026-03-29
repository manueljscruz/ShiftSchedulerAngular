import { MemberTransferItemDTO } from './MemberTransferItemDTO';

export class TransferMembersDTO {
    sourceEntityId: string = '';
    destinationEntityId: string = '';
    /** true = move (remove from source), false = copy (stay in source) */
    isTransfer: boolean = false;
    members: MemberTransferItemDTO[] = [];
}
