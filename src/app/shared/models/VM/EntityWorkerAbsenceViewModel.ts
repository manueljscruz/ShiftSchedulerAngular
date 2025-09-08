import { AbsenceTypeLocalizedDTO } from "../DTOs/Incoming/AbsenceTypeLocalizedDTO";
import { EntityWorkerAbsenceDTO } from "../DTOs/Incoming/EntityWorkerAbsenceDTO";
import { PagedList } from "../DTOs/Incoming/PagedList";

export class EntityWorkerAbsenceViewModel {
    isOwner: boolean;
    entityWorkerAbsences: PagedList<EntityWorkerAbsenceDTO>;
    absenceTypeLocalizeds: AbsenceTypeLocalizedDTO[];

    constructor(isOwner: boolean, entityWorkerAbsences: PagedList<EntityWorkerAbsenceDTO>, absenceTypeLocalizeds: AbsenceTypeLocalizedDTO[]) {
        this.isOwner = isOwner;
        this.entityWorkerAbsences = entityWorkerAbsences;
        this.absenceTypeLocalizeds = absenceTypeLocalizeds;
    }
}