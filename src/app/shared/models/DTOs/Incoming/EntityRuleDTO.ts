import { EntityRuleSpecificationDTO } from "./EntityRuleSpecificationDTO";

export class EntityRuleDTO{
    entityRuleId: string;
    ruleTypeId: number;
    isSpecValueBoolean: boolean;
    ruleTypeDisplayValue: string;
    ruleTypeDescription: string;
    entityId: string;
    isSelected: boolean = false;
    entityRuleSpecificationDTOs: EntityRuleSpecificationDTO[];

    constructor(entityRuleId: string, ruleTypeId: number, isSpecValueBoolean: boolean, ruleTypeDisplayValue: string, ruleTypeDescription: string, entityId: string, isSelected : boolean, entityRuleSpecificationDTOs: EntityRuleSpecificationDTO[] = []){
        this.entityRuleId = entityRuleId;
        this.ruleTypeId = ruleTypeId;
        this.isSpecValueBoolean = isSpecValueBoolean;
        this.ruleTypeDisplayValue = ruleTypeDisplayValue;
        this.ruleTypeDescription = ruleTypeDescription;
        this.entityId = entityId;
        this.isSelected = isSelected;
        this.entityRuleSpecificationDTOs = entityRuleSpecificationDTOs;
    }

    public static newEntityRuleDTO(): EntityRuleDTO{
        return new EntityRuleDTO('', 0, false, '', '', '', false, []);
    }
}