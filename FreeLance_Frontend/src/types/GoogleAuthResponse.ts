import type {LoginResponse} from "./auth.ts";

export interface GoogleLoginResponse {
    token: string;
    user: {
        email: string;
        name: string;
    };
}
export type GoogleLoginResponse = LoginResponse;