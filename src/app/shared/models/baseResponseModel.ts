export class BaseResponseModel{
    Success: boolean;
    Message: string;
    Result: any;

    constructor(success: boolean, message: string, result: any){
        this.Success = success;
        this.Message = message;
        this.Result = result;
    }
}