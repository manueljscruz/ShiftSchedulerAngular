import { DeleteEntityObjectDTO } from "./DeleteEntityObjectDTO";

export class DeleteEntityRuleSpecDTO extends DeleteEntityObjectDTO {
    ruleSpecId: number;

    constructor(entityId: string, entityRuleId: string, specId: number) {
        super(entityId, entityRuleId);
        this.ruleSpecId = specId;
    }
}