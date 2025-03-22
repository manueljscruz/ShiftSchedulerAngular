export class AddShiftRotationDTO{
    entityId: string;
    shiftId: string;
    isLeave: boolean;
    leaveDuration: Date;
    
    constructor(entityId: string, shiftId: string, isLeave: boolean, leaveDuration: Date){
        this.entityId = entityId;
        this.shiftId = shiftId;
        this.isLeave = isLeave;
        this.leaveDuration = leaveDuration;
    }
}