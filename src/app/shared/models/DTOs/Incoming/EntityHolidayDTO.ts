import { HolidayBehaviourLocalizedDTO } from './HolidayBehaviourLocalizedDTO';
import { HolidayCatalogLocalizedDTO } from './HolidayCatalogLocalizedDTO';

export class EntityHolidayDTO {
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

    constructor() {
        this.entityHolidayId = '';
        this.entityId = '';
        this.holidayCatalog = null;
        this.holidayBehaviourLocalized = HolidayBehaviourLocalizedDTO.newHolidayBehaviourLocalizedDTO();
        this.customHolidayName = '';
        this.customDay = 0;
        this.customMonth = 0;
        this.operatingStartTime = null;
        this.operatingEndTime = null;
        this.isActive = false;
        this.notes = '';
    }

    static newEntityHolidayDTO(): EntityHolidayDTO {
        return new EntityHolidayDTO();
    }
}


