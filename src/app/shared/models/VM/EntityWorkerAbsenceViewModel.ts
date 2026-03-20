import { AbsenceTypeLocalizedDTO } from "../DTOs/Incoming/AbsenceTypeLocalizedDTO";
import { EntityWorkerAbsenceDTO } from "../DTOs/Incoming/EntityWorkerAbsenceDTO";
import { PagedList } from "../DTOs/Incoming/PagedList";

export class EntityWorkerAbsenceViewModel {
    allowEdit: boolean;
    entityWorkerAbsences: PagedList<EntityWorkerAbsenceDTO>;
    absenceTypeLocalizeds: AbsenceTypeLocalizedDTO[];

    constructor(allowEdit: boolean, entityWorkerAbsences: PagedList<EntityWorkerAbsenceDTO>, absenceTypeLocalizeds: AbsenceTypeLocalizedDTO[]) {
        this.allowEdit = allowEdit;
        this.entityWorkerAbsences = entityWorkerAbsences;
        this.absenceTypeLocalizeds = absenceTypeLocalizeds;
    }
}