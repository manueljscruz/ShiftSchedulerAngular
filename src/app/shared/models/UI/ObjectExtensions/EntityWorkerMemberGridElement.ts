import { EntityWorkerMemberDTO } from "../../DTOs/Incoming/EntityWorkerMemberDTO";

export class EntityWorkerMemberGridElement extends EntityWorkerMemberDTO {
	isSelected: boolean;

    constructor(isSelected: boolean) {
        super("", "", false, false, false, [], false, false, false, []);
        this.isSelected = isSelected;
    }
}