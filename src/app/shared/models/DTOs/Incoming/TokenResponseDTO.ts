export class TokenResponseDTO {
    token: string;
    refreshToken: string;
    expiration: Date;

    constructor(
        public Token: string,
        public RefreshToken: string,
        public Expiration: Date
    ) {
        this.token = Token;
        this.refreshToken = RefreshToken;
        this.expiration = Expiration;
    }
}