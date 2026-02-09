import { EntityHolidayDTO } from '../DTOs/Incoming/EntityHolidayDTO';
import { HolidayBehaviourLocalizedDTO } from '../DTOs/Incoming/HolidayBehaviourLocalizedDTO';
import { HolidayCatalogLocalizedDTO } from '../DTOs/Incoming/HolidayCatalogLocalizedDTO';
import { HolidayTypeLocalizedDTO } from '../DTOs/Incoming/HolidayTypeLocalizedDTO';

export class EntityHolidaysViewModel {
    isOwner: boolean;
    holidayCatalogDTOs: HolidayCatalogLocalizedDTO[];
    holidayBehaviourDTOs: HolidayBehaviourLocalizedDTO[];
    holidayTypeDTOs: HolidayTypeLocalizedDTO[];
    entityHolidayDTOs: EntityHolidayDTO[];

    constructor(
        isOwner: boolean = false,
        holidayCatalogDTOs: HolidayCatalogLocalizedDTO[] = [],
        holidayBehaviourDTOs: HolidayBehaviourLocalizedDTO[] = [],
        holidayTypeDTOs: HolidayTypeLocalizedDTO[] = [],
        entityHolidayDTOs: EntityHolidayDTO[] = []
    ) {
        this.isOwner = isOwner;
        this.holidayCatalogDTOs = holidayCatalogDTOs;
        this.holidayBehaviourDTOs = holidayBehaviourDTOs;
        this.holidayTypeDTOs = holidayTypeDTOs;
        this.entityHolidayDTOs = entityHolidayDTOs;
    }
}
