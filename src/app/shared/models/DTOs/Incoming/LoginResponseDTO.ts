import { UserDTO } from "./UserDTO";

export class LoginResponseDTO {
    user: UserDTO;
    emailConfirmed?: boolean;
    isAdmin?: boolean;

    constructor(user: UserDTO, emailConfirmed?: boolean, isAdmin?: boolean) {
        this.user = user;
        this.emailConfirmed = emailConfirmed;
        this.isAdmin = isAdmin;
    }
}