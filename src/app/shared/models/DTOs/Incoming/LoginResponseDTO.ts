import { UserDTO } from "./UserDTO";

export class LoginResponseDTO {
    user: UserDTO;
    emailConfirmed?: boolean; // Optional for backward compatibility

    constructor(user: UserDTO, emailConfirmed?: boolean) {
        this.user = user;
        this.emailConfirmed = emailConfirmed;
    }
}