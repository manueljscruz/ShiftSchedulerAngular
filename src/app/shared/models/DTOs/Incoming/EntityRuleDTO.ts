import { EntityRuleSpecificationDTO } from "./EntityRuleSpecificationDTO";

export class EntityRuleDTO{
    entityRuleId: string;
    ruleTypeId: number;
    ruleTypeDisplayValue: string;
    ruleTypeDescription: string;
    entityId: string;
    entityRuleSpecificationDTOs: EntityRuleSpecificationDTO[];

    constructor(entityRuleId: string, ruleTypeId: number, ruleTypeDisplayValue: string, ruleTypeDescription: string, entityId: string, entityRuleSpecificationDTOs: EntityRuleSpecificationDTO[] = []){
        this.entityRuleId = entityRuleId;
        this.ruleTypeId = ruleTypeId;
        this.ruleTypeDisplayValue = ruleTypeDisplayValue;
        this.ruleTypeDescription = ruleTypeDescription;
        this.entityId = entityId;
        this.entityRuleSpecificationDTOs = entityRuleSpecificationDTOs;
    }

    public static newEntityRuleDTO(): EntityRuleDTO{
        return new EntityRuleDTO('', 0, '', '', '', []);
    }
}