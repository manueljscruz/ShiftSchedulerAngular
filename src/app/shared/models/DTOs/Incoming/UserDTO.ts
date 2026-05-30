export class UserDTO {
    userId: string;
    userDisplayName: string;
    genderId: number;
    email: string;
    isAdmin: boolean;

    constructor(userId: string = '', userDisplayName: string = '', genderId: number = 0, email: string = '', isAdmin: boolean = false) {
        this.userId = userId;
        this.userDisplayName = userDisplayName;
        this.genderId = genderId;
        this.email = email;
        this.isAdmin = isAdmin;
    }
}