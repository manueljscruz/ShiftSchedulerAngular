import { EntityHolidayDTO } from '../DTOs/Incoming/EntityHolidayDTO';
import { HolidayBehaviourLocalizedDTO } from '../DTOs/Incoming/HolidayBehaviourLocalizedDTO';
import { HolidayCatalogLocalizedDTO } from '../DTOs/Incoming/HolidayCatalogLocalizedDTO';
import { HolidayTypeLocalizedDTO } from '../DTOs/Incoming/HolidayTypeLocalizedDTO';
import { PagedList } from '../DTOs/Incoming/PagedList';

export class EntityHolidaysViewModel {
    allowEdit: boolean;
    isOwner: boolean = false;
    parentEntityId: string | null = null;
    holidayCatalogDTOs: HolidayCatalogLocalizedDTO[];
    holidayBehaviourDTOs: HolidayBehaviourLocalizedDTO[];
    holidayTypeDTOs: HolidayTypeLocalizedDTO[];
    entityHolidayDTOs: PagedList<EntityHolidayDTO>;

    constructor(
        allowEdit: boolean = false,
        holidayCatalogDTOs: HolidayCatalogLocalizedDTO[] = [],
        holidayBehaviourDTOs: HolidayBehaviourLocalizedDTO[] = [],
        holidayTypeDTOs: HolidayTypeLocalizedDTO[] = [],
        entityHolidayDTOs: PagedList<EntityHolidayDTO> = PagedList.Empty()
    ) {
        this.allowEdit = allowEdit;
        this.holidayCatalogDTOs = holidayCatalogDTOs;
        this.holidayBehaviourDTOs = holidayBehaviourDTOs;
        this.holidayTypeDTOs = holidayTypeDTOs;
        this.entityHolidayDTOs = entityHolidayDTOs;
    }
}
