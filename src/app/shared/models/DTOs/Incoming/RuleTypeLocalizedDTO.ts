import { BusinessAspectLocalizedDTO } from "./BusinessAspectLocalizedDTO";

export class RuleTypeLocalizedDTO {
    
    ruleTypeId: number;
    ruleTypeLocalizedName: string;
    multipleSpecification: boolean;
    isSpecValuesBoolean: boolean;
    businessAspectLocalizedDTOs: BusinessAspectLocalizedDTO[];

    constructor(ruleTypeId: number, ruleTypeLocalizedName: string, multipleSpecification: boolean, isSpecValuesBoolean: boolean, businessAspectLocalizedDTOs: BusinessAspectLocalizedDTO[]){
        this.ruleTypeId = ruleTypeId;
        this.ruleTypeLocalizedName = ruleTypeLocalizedName;
        this.multipleSpecification = multipleSpecification;
        this.isSpecValuesBoolean = isSpecValuesBoolean;
        this.businessAspectLocalizedDTOs = businessAspectLocalizedDTOs;
    }

}