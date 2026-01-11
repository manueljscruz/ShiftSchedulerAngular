import { UserDTO } from "./UserDTO";

export class LoginResponseDTO {
    user: UserDTO;

    constructor(user: UserDTO) {
        this.user = user;
    }
}