export class BaseResponseModel{
    result: boolean;
    successMessage: string;
    errorMessage: string;
    data: any;

    constructor(result: boolean, successMessage: string, errorMessage: string, data: any){
        this.result = result;
        this.successMessage = successMessage;
        this.errorMessage = errorMessage;
        this.data = data;
    }
}