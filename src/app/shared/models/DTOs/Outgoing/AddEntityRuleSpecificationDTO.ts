export class AddEntityRuleSpecificationDTO{
    entityRuleId: string;
    specificationId: number;
    ruleSpecificationValue: number;
    aspectReferenceId: string;
    referenceName: string;
    businessAspectId: number;
    aspectReferenceId2: string;
    referenceName2: string;
    businessAspectId2: number;
    languageCode: string;

    constructor(entityRuleId: string, specificationId: number, ruleSpecificationValue: number, aspectReferenceId: string, referenceName: string, businessAspectId: number, aspectReferenceId2: string, referenceName2: string, businessAspectId2: number, languageCode: string){
        this.entityRuleId = entityRuleId;
        this.specificationId = specificationId;
        this.ruleSpecificationValue = ruleSpecificationValue;
        this.aspectReferenceId = aspectReferenceId;
        this.referenceName = referenceName;
        this.businessAspectId = businessAspectId;
        this.aspectReferenceId2 = aspectReferenceId2;
        this.referenceName2 = referenceName2;
        this.businessAspectId2 = businessAspectId2;
        this.languageCode = languageCode;
    }
}