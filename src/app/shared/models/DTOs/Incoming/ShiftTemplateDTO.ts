import { ShiftBreakTemplateDTO } from "./ShiftBreakTemplateDTO";

export class ShiftTemplateDTO{
    shiftTemplateId: number;
    shiftTemplateName: string;
    shiftTemplateAlias: string;
    shiftStartHour: Date;
    shiftDuration: Date;
    isPopular: boolean;
    shiftBreakTemplates: ShiftBreakTemplateDTO [] = [];

    constructor(shiftTemplateId: number, shiftTemplateName: string, shiftTemplateAlias: string, shiftStartHour: Date, shiftDuration: Date, isPopular: boolean, shiftBreakTemplates: ShiftBreakTemplateDTO[] = []){
        this.shiftTemplateId = shiftTemplateId;
        this.shiftTemplateName = shiftTemplateName;
        this.shiftTemplateAlias = shiftTemplateAlias;
        this.shiftStartHour = shiftStartHour;
        this.shiftDuration = shiftDuration;
        this.isPopular = isPopular;
        this.shiftBreakTemplates = shiftBreakTemplates;
    }
}