export class NewWorkerDTO {
    workerName: string;
    genderId : number;
    email: string;
    password: string;

    constructor(name: string, selectedGender : number, email: string, password: string){
        this.workerName = name;
        this.genderId = selectedGender;
        this.email = email;
        this.password = password;
    }
}