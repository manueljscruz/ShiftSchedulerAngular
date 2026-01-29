export class EntityRuleSpecificationDTO{
    entityRuleId: string;
    specificationId: number;
    ruleSpecificationValue: number;
    // <summary>
    // Reference Identifier to the aspect that this rule applies to
    // </summary>
    aspectReferenceId: string;
    referenceName: string;
    businessAspectId: number;
    businessAspectDisplayValue : string;
    aspectReferenceId2: string;
    referenceName2: string;
    businessAspectId2: number;
    businessAspect2DisplayValue : string;

    constructor(entityRuleId: string, specificationId: number, ruleSpecificationValue: number, aspectReferenceId: string, referenceName: string, businessAspectId: number, businessAspectDisplayValue:string, aspectReferenceId2: string, referenceName2: string, businessAspectId2: number, businessAspect2DisplayValue : string){
        this.entityRuleId = entityRuleId;
        this.specificationId = specificationId;
        this.ruleSpecificationValue = ruleSpecificationValue;
        this.aspectReferenceId = aspectReferenceId;
        this.referenceName = referenceName;
        this.businessAspectId = businessAspectId;
        this.businessAspectDisplayValue = businessAspectDisplayValue;
        this.aspectReferenceId2 = aspectReferenceId2;
        this.referenceName2 = referenceName2;
        this.businessAspectId2 = businessAspectId2;
        this.businessAspect2DisplayValue = businessAspect2DisplayValue;
    }
}
