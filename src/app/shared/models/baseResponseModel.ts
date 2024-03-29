export class BaseResponseModel{
    success: boolean;
    message: string;
    result: any;

    constructor(success: boolean, message: string, result: any){
        this.success = success;
        this.message = message;
        this.result = result;
    }
}