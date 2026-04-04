export class ChangePasswordRequestDTO {
    CurrentPassword: string;
    NewPassword: string;
    ConfirmPassword: string;

    constructor(currentPassword: string, newPassword: string, confirmPassword: string) {
        this.CurrentPassword = currentPassword;
        this.NewPassword = newPassword;
        this.ConfirmPassword = confirmPassword;
    }
}
