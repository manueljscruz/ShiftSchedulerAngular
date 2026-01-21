export class ResetPasswordRequestDTO {
    Email: string;
    Token: string;
    NewPassword: string;
    ConfirmPassword: string;

    constructor(email: string, token: string, newPassword: string, confirmPassword: string) {
        this.Email = email;
        this.Token = token;
        this.NewPassword = newPassword;
        this.ConfirmPassword = confirmPassword;
    }
}
