export class AddShiftRotationDTO{
    entityId: string;
    shiftId: string;
    isLeave: boolean;
    leaveDuration: string;
    
    constructor(entityId: string, shiftId: string, isLeave: boolean, leaveDuration: string){
        this.entityId = entityId;
        this.shiftId = shiftId;
        this.isLeave = isLeave;
        this.leaveDuration = leaveDuration;
    }
}