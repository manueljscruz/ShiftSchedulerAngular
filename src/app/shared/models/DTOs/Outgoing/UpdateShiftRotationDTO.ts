export class UpdateShiftRotationDTO{
    entityId: string;
    orderNo: number;
    isLeave: boolean;
    newOrderNo: number;

    constructor(entityId: string, orderNo: number, isLeave: boolean, newOrderNo: number){
        this.entityId = entityId;
        this.orderNo = orderNo;
        this.isLeave = isLeave;
        this.newOrderNo = newOrderNo;
    }
}
