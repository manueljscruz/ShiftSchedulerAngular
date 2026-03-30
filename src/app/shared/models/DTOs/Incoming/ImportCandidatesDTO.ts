export interface ShiftSimpleDTO {
    shiftId: string;
    shiftName: string;
}

export interface EntityRuleSimpleDTO {
    entityRuleId: string;
    ruleTypeId: number;
    ruleTypeName: string;
}

export interface EntityHolidaySimpleDTO {
    entityHolidayId: string;
    holidayDisplayName: string;
    holidayCatalogId: number | null;
    customDay: number;
    customMonth: number;
}

export interface ImportCandidatesDTO {
    shifts: ShiftSimpleDTO[];
    rules: EntityRuleSimpleDTO[];
    holidays: EntityHolidaySimpleDTO[];
}
