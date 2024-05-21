import { ShiftBreakTemplateDTO } from "./ShiftBreakTemplateDTO";

export class ShiftTemplateDTO{
    ShiftTemplateId: number;
    ShiftTemplateName: string;
    ShiftTemplateAlias: string;
    ShiftStartHour: Date;
    ShiftDuration: Date;
    IsPopular: boolean;
    ShiftBreakTemplates: ShiftBreakTemplateDTO [] = [];

    constructor(shiftTemplateId: number, shiftTemplateName: string, shiftTemplateAlias: string, shiftStartHour: Date, shiftDuration: Date, isPopular: boolean, shiftBreakTemplates: ShiftBreakTemplateDTO[] = []){
        this.ShiftTemplateId = shiftTemplateId;
        this.ShiftTemplateName = shiftTemplateName;
        this.ShiftTemplateAlias = shiftTemplateAlias;
        this.ShiftStartHour = shiftStartHour;
        this.ShiftDuration = shiftDuration;
        this.IsPopular = isPopular;
        this.ShiftBreakTemplates = shiftBreakTemplates;
    }
}