export class EntityStatisticsDTO{
    numberOfMembers: number;
    numberOfRules: number;
    numberOfShifts: number;

    constructor(numberOfMembers: number, numberOfRules: number, numberOfShifts: number){
        this.numberOfMembers = numberOfMembers;
        this.numberOfRules = numberOfRules;
        this.numberOfShifts = numberOfShifts;
    }

    static newEntityStatisticsDTO() : EntityStatisticsDTO {
        return new EntityStatisticsDTO(
            0,
            0,
            0
        );
    }
}