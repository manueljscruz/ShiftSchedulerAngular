import { AbsenceTypeLocalizedDTO } from "../DTOs/Incoming/AbsenceTypeLocalizedDTO";
import { EntityWorkerAbsenceDTO } from "../DTOs/Incoming/EntityWorkerAbsenceDTO";

export class EntityWorkerAbsenceViewModel {
    isOwner: boolean;
    entityWorkerAbsences: EntityWorkerAbsenceDTO[];
    absenceTypeLocalizeds: AbsenceTypeLocalizedDTO[];

    constructor(isOwner: boolean, entityWorkerAbsences: EntityWorkerAbsenceDTO[], absenceTypeLocalizeds: AbsenceTypeLocalizedDTO[]) {
        this.isOwner = isOwner;
        this.entityWorkerAbsences = entityWorkerAbsences;
        this.absenceTypeLocalizeds = absenceTypeLocalizeds;
    }
}