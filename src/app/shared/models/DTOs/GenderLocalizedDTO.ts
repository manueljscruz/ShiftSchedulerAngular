export class GenderLocalizedDTO {

    genderId: number;
    genderLocalizedName: string;

    constructor(id: number, name: string) {
        this.genderId = id;
        this.genderLocalizedName = name;
    }
}