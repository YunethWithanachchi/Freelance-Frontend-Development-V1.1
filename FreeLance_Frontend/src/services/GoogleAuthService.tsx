import type { GoogleLoginResponse } from "../types/GoogleAuthResponse";

const BASE_URL = "https://freelance-backend-development.onrender.com/api/auth";
export const loginWithGoogle = async (
    idToken: string
): Promise<GoogleLoginResponse> => {
    const response = await fetch(`${BASE_URL}/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
    });

    if (!response.ok) {
        throw new Error("Google login failed");
    }

    return response.json();
};
