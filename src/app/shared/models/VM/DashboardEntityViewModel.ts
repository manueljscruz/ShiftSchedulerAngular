import { EntityDTO } from "../DTOs/Incoming/EntityDTO";
import { EntityFinancialStatusDTO } from "../DTOs/Incoming/EntityFinancialStatusDTO";
import { EntityStatisticsDTO } from "../DTOs/Incoming/EntityStatisticsDTO";
import { EntityWorkerAbsenceDTO } from "../DTOs/Incoming/EntityWorkerAbsenceDTO";
import { PagedList } from "../DTOs/Incoming/PagedList";
import { ScheduleEntryDTO } from "../DTOs/Incoming/ScheduleEntryDTO";
import { SkillDTO } from "../DTOs/Incoming/SkillDTO";

export class DashboardEntityViewModel {
    entityDTO : EntityDTO;
    assignedEntitySkills : SkillDTO[];
    scheduleEntries: ScheduleEntryDTO[];
    entityWorkerAbsenceEntries: PagedList<EntityWorkerAbsenceDTO>;
    entityStatistics: EntityStatisticsDTO;
    entityFinancialStatusDTO: EntityFinancialStatusDTO;

    constructor(entityDTO : EntityDTO, 
        assignedEntitySkills : SkillDTO[], 
        scheduleEntries: ScheduleEntryDTO[], 
        entityWorkerAbsenceEntries: PagedList<EntityWorkerAbsenceDTO>, 
        entityStatistics: EntityStatisticsDTO, 
        entityFinancialStatusDTO: EntityFinancialStatusDTO){
        this.entityDTO = entityDTO;
        this.assignedEntitySkills = assignedEntitySkills;
        this.scheduleEntries = scheduleEntries;
        this.entityWorkerAbsenceEntries = entityWorkerAbsenceEntries;
        this.entityStatistics = entityStatistics;
        this.entityFinancialStatusDTO = entityFinancialStatusDTO;
    }

    static newDashboardEntityViewModel() : DashboardEntityViewModel {
        return new DashboardEntityViewModel(
            EntityDTO.newEntityDTO(),
            [],
            [],
            PagedList.Empty<EntityWorkerAbsenceDTO>(),
            EntityStatisticsDTO.newEntityStatisticsDTO(),
            EntityFinancialStatusDTO.newEntityFinancialStatusDTO()
        );
    }
}