export class AbsenceTypeLocalizedDTO {
    absenceTypeId: number;
    absenceTypeLocalizedName : string;

    constructor(absenceTypeId: number, absenceTypeLocalizedName: string) {
        this.absenceTypeId = absenceTypeId;
        this.absenceTypeLocalizedName = absenceTypeLocalizedName;
    }
}