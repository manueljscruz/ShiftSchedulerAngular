import { HolidayBehaviourLocalizedDTO } from './HolidayBehaviourLocalizedDTO';
import { HolidayTypeLocalizedDTO } from './HolidayTypeLocalizedDTO';

export interface HolidayCatalogLocalizedDTO {
    holidayCatalogId: number;
    holidayTypeLocalized: HolidayTypeLocalizedDTO;
    holidayBehaviourLocalized: HolidayBehaviourLocalizedDTO;
    holidayCatalogLocalizedName: string;
    holidayCatalogLocalizedDescription: string;
    isRecurring: boolean;
    recurrenceDay: number;
    recurrenceMonth: number;
    isActive: number;
}
