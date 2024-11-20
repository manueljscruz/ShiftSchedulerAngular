import { GenderLocalizedDTO } from "../DTOs/Incoming/GenderLocalizedDTO";

export class HomeViewModel {
    genders : GenderLocalizedDTO[]
    // Add properties and methods as needed
    constructor(
        genders : GenderLocalizedDTO[]
    ) {
        this.genders = genders;
    }
}