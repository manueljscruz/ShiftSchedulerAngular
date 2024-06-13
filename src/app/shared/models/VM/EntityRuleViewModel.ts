import { BusinessAspectLocalizedDTO } from "../DTOs/Incoming/BusinessAspectLocalizedDTO";
import { EntityRuleDTO } from "../DTOs/Incoming/EntityRuleDTO";
import { RuleTypeLocalizedDTO } from "../DTOs/Incoming/RuleTypeLocalizedDTO";

export class EntityRuleViewModel{
    entityRules: EntityRuleDTO[];
    allowEdit: boolean;
    businessAspectsLocalizeds: BusinessAspectLocalizedDTO[];
    ruleTypeLocalizeds: RuleTypeLocalizedDTO[];

    constructor(entityRules: EntityRuleDTO[], allowEdit: boolean = false, businessAspectsLocalizeds: BusinessAspectLocalizedDTO[] = [], ruleTypesLocalizeds: RuleTypeLocalizedDTO[] = []){
        this.entityRules = entityRules;
        this.allowEdit = allowEdit;
        this.businessAspectsLocalizeds = businessAspectsLocalizeds;
        this.ruleTypeLocalizeds = ruleTypesLocalizeds;
    }
}