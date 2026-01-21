export class ConfirmEmailRequestDTO {
    Email: string;
    Token: string;

    constructor(email: string, token: string) {
        this.Email = email;
        this.Token = token;
    }
}
