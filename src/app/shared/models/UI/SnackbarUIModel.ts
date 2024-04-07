export class SnackbarUIModel {
    duration: number;
    message: string;

    constructor(duration: number, message: string) {
        this.duration = duration;
        this.message = message;
    }
}