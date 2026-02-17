import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, LoginResponse } from "../types/auth";
import {useNavigate} from "react-router-dom";
import api from "../services/api.ts";
import type {GoogleLoginResponse} from "../types/GoogleAuthResponse.ts";

type AuthContextType = {
    user: User | null;
    token: string | null;
    loading:boolean;
    login: (data: GoogleLoginResponse) => void;
    logout: () => void;
    updateUser: (user:User) => void;
};

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

type Props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            api.get<User>("/auth/me")
                .then((res) => setUser(res.data))
                .catch(() => {
                    // invalid token
                    logout();
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);
    const login = async (data: LoginResponse) => {
        setToken(data.token);
        localStorage.setItem("token",data.token);

        if (data.user) {
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
        } else {
            // fetch user object
            try {
                const res = await api.get<User>("/auth/me");
                setUser(res.data);
                localStorage.setItem("user", JSON.stringify(res.data));
            } catch (err) {
                console.error("Failed to fetch user:", err);
                logout();
            }
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const updateUser = (updatedUser: User)=>{
        setUser(updatedUser);
        localStorage.setItem("user",JSON.stringify(updatedUser));
    }

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};
