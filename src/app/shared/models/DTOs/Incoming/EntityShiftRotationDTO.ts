export class EntityShiftRotationDTO{
    entityId: string;
    orderNo: number;
    isLeave: boolean;
    shiftId: string;
    displayName: string;
    alias: string;
    leaveDuration: Date;
    
    constructor(entityId: string, orderNo: number, isLeave: boolean, shiftId: string, displayName: string, alias: string, leaveDuration: Date){
        this.entityId = entityId;
        this.orderNo = orderNo;
        this.isLeave = isLeave;
        this.shiftId = shiftId;
        this.displayName = displayName;
        this.alias = alias;
        this.leaveDuration = leaveDuration;
    }
}