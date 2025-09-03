export class EntityShiftRotationDTO{
    entityId: string;
    orderNo: number;
    isLeave: boolean;
    shiftId: string;
    displayName: string;
    alias: string;
    leaveDurationText: string;
    
    constructor(entityId: string, orderNo: number, isLeave: boolean, shiftId: string, displayName: string, alias: string, leaveDurationText: string){
        this.entityId = entityId;
        this.orderNo = orderNo;
        this.isLeave = isLeave;
        this.shiftId = shiftId;
        this.displayName = displayName;
        this.alias = alias;
        this.leaveDurationText = leaveDurationText;
    }

    static newEntityShiftRotationDTO() : EntityShiftRotationDTO {
        return new EntityShiftRotationDTO("", 0, false, "", "", "", new Date(0).toString());
    }
}