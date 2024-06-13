import { AddEntityRuleSpecificationDTO } from "./AddEntityRuleSpecificationDTO";

export class AddEntityRuleDTO{
    ruleTypeId: number;
    ruleTypeDescription: string;
    entityId: string;
    entityRuleSpecifications: AddEntityRuleSpecificationDTO[];

    constructor(ruleTypeId: number, ruleTypeDescription: string, entityId: string, entityRuleSpecifications: AddEntityRuleSpecificationDTO[]){
        this.ruleTypeId = ruleTypeId;
        this.ruleTypeDescription = ruleTypeDescription;
        this.entityId = entityId;
        this.entityRuleSpecifications = entityRuleSpecifications;
    }
}