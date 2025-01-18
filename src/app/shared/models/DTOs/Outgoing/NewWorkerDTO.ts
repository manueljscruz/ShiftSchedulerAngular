export class NewUserDTO {
    name: string;
    genderId : number;
    email: string;
    password: string;

    constructor(name: string, selectedGender : number, email: string, password: string){
        this.name = name;
        this.genderId = selectedGender;
        this.email = email;
        this.password = password;
    }
}