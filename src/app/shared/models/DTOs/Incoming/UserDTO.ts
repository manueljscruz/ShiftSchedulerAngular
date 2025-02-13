export class UserDTO {
    userId: string;
    userDisplayName: string;
    genderId: number;
    email: string;

    constructor(userId: string = '', userDisplayName: string = '', genderId: number = 0, email: string = '') {
        this.userId = userId;
        this.userDisplayName = userDisplayName;
        this.genderId = genderId;
        this.email = email;
    }
}