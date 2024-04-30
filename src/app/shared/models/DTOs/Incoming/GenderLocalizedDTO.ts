export class GenderLocalizedDTO {

    GenderId: number;
    GenderLocalizedName: string;

    constructor(id: number, name: string) {
        this.GenderId = id;
        this.GenderLocalizedName = name;
    }
}