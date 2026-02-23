export class HolidayBehaviourLocalizedDTO {
    holidayBehaviourId: number;
    holidayBehaviourLocalizedName: string;
    allowsOperatingTimes: boolean;

    constructor(holidayBehaviourId: number, holidayBehaviourLocalizedName: string, allowsOperatingTimes: boolean) {
        this.holidayBehaviourId = holidayBehaviourId;
        this.holidayBehaviourLocalizedName = holidayBehaviourLocalizedName;
        this.allowsOperatingTimes = allowsOperatingTimes;
    }

    public static newHolidayBehaviourLocalizedDTO() : HolidayBehaviourLocalizedDTO {
        return new HolidayBehaviourLocalizedDTO(0, '', false);
    }
}
