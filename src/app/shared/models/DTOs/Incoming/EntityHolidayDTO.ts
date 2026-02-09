import { HolidayBehaviourLocalizedDTO } from './HolidayBehaviourLocalizedDTO';
import { HolidayCatalogLocalizedDTO } from './HolidayCatalogLocalizedDTO';

export interface EntityHolidayDTO {
    entityHolidayId: string;
    entityId: string;
    holidayCatalog: HolidayCatalogLocalizedDTO | null;
    holidayBehaviourLocalized: HolidayBehaviourLocalizedDTO;
    customHolidayName: string;
    customDay: number;
    customMonth: number;
    operatingStartTime: string | null;  // TimeSpan serializes as "HH:mm:ss"
    operatingEndTime: string | null;
    isActive: boolean;
    notes: string;
}
