const BASE_URL = "https://freelance-backend-development.onrender.com/api/auth";
export const signupUser = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({ message: "Signup failed" }));
        throw new Error(body.message);
    }

    return res.json();
};

export const signupWithGoogle = async (idToken: string) => {
    const res = await fetch(`${BASE_URL}/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
        credentials: "include",
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({ message: "Google signup failed" }));
        throw new Error(body.message);
    }

    return res.json();
};
