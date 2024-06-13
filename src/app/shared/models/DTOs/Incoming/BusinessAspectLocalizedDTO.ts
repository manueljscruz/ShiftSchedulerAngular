export class BusinessAspectLocalizedDTO{
    businessAspectId: number;
    businessAspectLocalizedName: string;
    
    constructor(businessAspectId: number, businessAspectLocalizedName: string){
        this.businessAspectId = businessAspectId;
        this.businessAspectLocalizedName = businessAspectLocalizedName;
    }
}