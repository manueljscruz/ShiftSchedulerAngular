export interface AddEntityHolidayDTO {
    entityId: string;
    holidayCatalogId: number | null;
    holidayBehaviourId: number;
    isCustom: boolean;
    customHolidayName: string;
    customDay: number;
    customMonth: number;
    operatingStartTime: string | null;  // "HH:mm:ss" format
    operatingEndTime: string | null;
    notes: string;
}
