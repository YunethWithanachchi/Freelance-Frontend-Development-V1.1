import React, {useMemo, useState, useEffect, useContext, useCallback} from "react";
import { signupUser, signupWithGoogle } from "../services/signupService";
import {useNavigate} from "react-router-dom";
import type { SignupErrors } from "../types/signup";
import {login} from "../services/AuthService.ts";
import {AuthContext} from "../context/AuthContext.tsx";

declare global {
    interface Window {
        google?: any;
    }
}

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accepted, setAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<SignupErrors>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [googleLoaded, setGoogleLoaded] = useState(false);
    const validateEmail = (value: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const validatePassword = (value: string) =>
        /(?=.{8,})(?=.*\d)/.test(value);

    const formErrors = useMemo(() => {
        const e: SignupErrors = {};

        if (!name.trim()) e.name = "Please enter your full name.";
        if (!email.trim() || !validateEmail(email))
            e.email = "Enter a valid email address.";
        if (!validatePassword(password))
            e.password = "Password must be 8+ characters and include a number.";
        if (password !== confirmPassword)
            e.confirmPassword = "Passwords do not match.";
        if (!accepted)
            e.accepted = "You must accept the terms to continue.";

        return e;
    }, [name, email, password, confirmPassword, accepted]);

    const isFormValid = useMemo(
        () => Object.keys(formErrors).length === 0,
        [formErrors]
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setSuccess(null);

        if (!isFormValid) {
            setErrors(formErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await signupUser({ name, email, password });
            login(response);
            setSuccess("Account created successfully.");
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setAccepted(false); // sets token and fetches user
        } catch (err: any) {
            setErrors({ submit: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleCredentialResponse =useCallback(async (resp: any) => {
        const idToken = resp?.credential;

        if (!idToken) {
            setErrors({ submit: "Google sign-in failed." });
            return;
        }

        setLoading(true);
        setErrors({});
        setSuccess(null);

        try {
            const response = await signupWithGoogle(idToken);
            login(response)
            setSuccess("Signed up successfully with Google.");
            //navigate("/role-checkpoint");
        } catch (err: any) {
            setErrors({ submit: err.message });
        } finally {
            setLoading(false);
        }
    },[login]);

    useEffect(() => {
        const loadGoogleScript = () => {
            // Check if script already exists
            if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
                // Script exists, just wait for it to load
                if (window.google?.accounts?.id) {
                    setGoogleLoaded(true);
                } else {
                    setTimeout(loadGoogleScript, 100);
                }
                return;
            }

            // Create and load script
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            script.onload = () => {
                setGoogleLoaded(true);
            };
            script.onerror = () => {
                console.error('Failed to load Google Sign-In script');
                setErrors({ submit: "Failed to load Google Sign-In" });
            };
            document.head.appendChild(script);
        };

        loadGoogleScript();
    }, []);

    useEffect(() => {
        if (!googleLoaded) return;

        const clientId = "962166256032-k7ihoni7cj63qtmnbpqg8cs2b3sap5qn.apps.googleusercontent.com";

        try {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleGoogleCredentialResponse,
                auto_select: false,
            });
        } catch (error) {
            console.error("Google initialization error:", error);
        }
    }, [googleLoaded, handleGoogleCredentialResponse]);

    const triggerGoogleSignIn = () => {
        if (!googleLoaded || !window.google?.accounts?.id) {
            setErrors({ submit: "Google Sign-In is still loading, please wait..." });
            return;
        }

        try {
            window.google.accounts.id.prompt((notification: any) => {
                if (notification.isNotDisplayed()) {
                    console.log("Prompt not displayed");
                    // Fallback: try to show it anyway
                    window.google.accounts.id.prompt();
                }
                if (notification.isSkippedMoment()) {
                    console.log("User closed the prompt");
                }
            });
        } catch (error) {
            console.error("Error triggering Google prompt:", error);
            setErrors({ submit: "Failed to open Google sign-in" });
        }
    };


    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form} noValidate aria-labelledby="signup-heading">
                <h2 id="signup-heading" style={styles.heading}>Create your account</h2>

                {success && <div role="status" style={styles.success}>{success}</div>}
                {errors.submit && <div role="alert" style={styles.error}>{errors.submit}</div>}

                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="name">Full name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ ...styles.input, borderColor: errors.name ? "#e53e3e" : "#d1d5db" }}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && <small id="name-error" style={styles.fieldError}>{errors.name}</small>}
                    </div>
                </div>

                <div style={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ ...styles.input, borderColor: errors.email ? "#e53e3e" : "#d1d5db" }}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && <small id="email-error" style={styles.fieldError}>{errors.email}</small>}
                </div>

                <div style={styles.row}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password">Password</label>
                        <div style={styles.passwordWrap}>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ ...styles.input, borderColor: errors.password ? "#e53e3e" : "#d1d5db" }}
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? "password-error" : undefined}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                aria-pressed={showPassword}
                                style={styles.showBtn}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && <small id="password-error" style={styles.fieldError}>{errors.password}</small>}
                    </div>

                    <div style={styles.inputGroup}>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Repeat password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ ...styles.input, borderColor: errors.confirmPassword ? "#e53e3e" : "#d1d5db" }}
                            aria-invalid={!!errors.confirmPassword}
                            aria-describedby={errors.confirmPassword ? "confirm-error" : undefined}
                        />
                        {errors.confirmPassword && <small id="confirm-error" style={styles.fieldError}>{errors.confirmPassword}</small>}
                    </div>
                </div>

                <div style={styles.termsRow}>
                    <label style={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            style={styles.checkbox}
                        />
                        I agree to the Terms of Service and Privacy Policy
                    </label>
                    {errors.accepted && <small style={styles.fieldError}>{errors.accepted}</small>}
                </div>

                <button type="submit" style={{ ...styles.button, opacity: loading ? 0.7 : 1 }} disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                </button>

                <div style={styles.orRow} aria-hidden>
                    <span style={styles.separator} />
                    <span style={styles.orText}>or</span>
                    <span style={styles.separator} />
                </div>

                <button
                    type="button"
                    style={{
                        ...styles.oauthBtn,
                        opacity: googleLoaded ? 1 : 0.5, // ✅ Disabled look when loading
                        cursor: googleLoaded ? "pointer" : "not-allowed",
                    }}
                    onClick={() => triggerGoogleSignIn()}
                    disabled={!googleLoaded}
                    aria-label="Sign up with Google"
                >
                    <svg style={styles.oauthIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.9 0 7.2 1.4 9.9 3.9l7.4-7.4C36.6 2.9 30.7 0.5 24 0.5 14 0.5 5.5 6.6 1.9 14.9l8.8 6.8C12.9 15.1 18 9.5 24 9.5z"/>
                        <path fill="#34A853" d="M46.3 24.5c0-1.6-.1-3.1-.4-4.5H24v8.6h12.6c-.5 2.9-2.1 5.3-4.5 6.9l7 5.3c4.1-3.8 6.5-9.3 6.5-16.3z"/>
                        <path fill="#4A90E2" d="M10.7 29.7c-1.1-3.2-1.1-6.7 0-9.9L1.9 13c-2.8 5.4-2.8 11.7 0 17.1l8.8-6.4z"/>
                        <path fill="#FBBC05" d="M24 48c6.7 0 12.6-2.2 17-6l-8.2-6.3c-2.3 1.6-5.2 2.6-8.8 2.6-6 0-11.1-5.6-12.4-13.1L1.9 34.1C5.5 42.4 14 48 24 48z"/>
                    </svg>
                    <span>Sign up with Google</span>
                </button>

                <div style={styles.footerNote}>
                    Already have an account?{" "}
                    <span
                        style={{color:"blue",cursor:"pointer"}}
                        onClick={() => navigate("/login")}
                        >
                        Sign in
                    </span>
                </div>
            </form>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center", // Centers the form horizontally
        alignItems: "center",     // Centers the form vertically
        backgroundColor: "#f7fafc",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
    },
    form: {
        backgroundColor: "#ffffff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        width: "100%",
        maxWidth: "500px",        // Slightly narrower for a cleaner look
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        margin: "0 auto",
        gap: "20px",
    },
    heading: {
        margin: "0 0 10px 0",
        fontSize: "24px",
        fontWeight: "bold",
        color: "#111827",
        textAlign: "left",
    },
    row: {
        display: "flex",
        gap: "16px",
        width: "100%",            // Ensures rows take full width of the card
    },
    inputGroup: {
        flex: 1,                  // Allows inputs in a row to share space equally
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "14px",
        width: "100%",            // Makes sure inputs fill their group
        boxSizing: "border-box",  // Prevents padding from breaking width
    },
    select: {
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        fontSize: "14px",
        background: "white",
        width: "100%",
    },
    passwordWrap: {
        display: "flex",
        gap: "8px",
    },
    showBtn: {
        padding: "8px 10px",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        background: "#f3f4f6",
        cursor: "pointer",
        fontSize: "13px",
    },
    checkboxLabel: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        color: "#374151",
    },
    checkbox: {
        width: "16px",
        height: "16px",
    },
    termsRow: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    button: {
        padding: "12px 16px",
        backgroundColor: "#0f172a",
        color: "white",
        border: "none",
        borderRadius: "10px",
        fontSize: "15px",
        cursor: "pointer",
        fontWeight: 600,
    },
    fieldError: {
        color: "#b91c1c",
        fontSize: "12px",
    },
    error: {
        background: "#fff1f2",
        color: "#991b1b",
        padding: "10px",
        borderRadius: "8px",
    },
    success: {
        background: "#ecfdf5",
        color: "#064e3b",
        padding: "10px",
        borderRadius: "8px",
    },
    footerNote: {
        fontSize: "13px",
        color: "#6b7280",
        marginTop: "6px",
        textAlign: "center",
    },
    orRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        marginTop: "4px",
        marginBottom: "4px",
    },
    separator: {
        flex: 1,
        height: "1px",
        background: "#e6e9ef",
    },
    orText: {
        fontSize: "13px",
        color: "#9ca3af",
        padding: "0 6px",
    },
    oauthBtn: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "10px 14px",
        borderRadius: "10px",
        border: "1px solid #e6e9ef",
        background: "#ffffff",
        cursor: "pointer",
        width: "100%",
        color: "#111827",
        fontSize: "14px",
    },
    oauthIcon: {
        width: "18px",
        height: "18px",
    },
};

export default Signup;
