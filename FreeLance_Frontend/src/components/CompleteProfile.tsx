import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

type Role = "FREELANCER" | "CLIENT" | null;

const styles: { [key: string]: React.CSSProperties } = {
    page: {
        minHeight: "100vh",
        width: "100vw",
        background: "#eef0f3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    card: {
        background: "white",
        borderRadius: "20px",
        padding: "64px 56px",
        width: "100%",
        maxWidth: "660px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        boxSizing: "border-box",
    },
    title: {
        margin: "0 0 16px",
        fontSize: "28px",
        fontWeight: 700,
        color: "#0f172a",
        textAlign: "center",
    },
    subtitle: {
        margin: "0 0 48px",
        fontSize: "15px",
        color: "#94a3b8",
        textAlign: "center",
    },
    roleGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
    },
    roleCard: {
        border: "1.5px solid #e2e8f0",
        borderRadius: "14px",
        padding: "28px 24px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        background: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
    },
    roleCardSelected: {
        border: "1.5px solid #2563eb",
        background: "#eff6ff",
    },
    roleIcon: {
        fontSize: "28px",
        lineHeight: 1,
    },
    roleTitle: {
        margin: 0,
        fontSize: "16px",
        fontWeight: 700,
        color: "#0f172a",
    },
    roleDesc: {
        margin: 0,
        fontSize: "13px",
        color: "#64748b",
        lineHeight: 1.5,
    },
    continueBtn: {
        marginTop: "36px",
        width: "100%",
        padding: "14px",
        borderRadius: "10px",
        border: "none",
        background: "#0f172a",
        color: "white",
        fontSize: "15px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.2s",
    },
    continueBtnDisabled: {
        background: "#cbd5e1",
        cursor: "not-allowed",
    },
    errorMsg: {
        marginTop: "16px",
        textAlign: "center",
        fontSize: "13px",
        color: "#ef4444",
    },
};

function CompleteProfile() {
    const [selectedRole, setSelectedRole] = useState<Role>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { updateUser } = useContext(AuthContext);

    const handleContinue = async () => {
        if (!selectedRole) return;

        setLoading(true);
        setError(null);

        try {
            const res = await api.patch("/auth/update-role", { role: selectedRole });

            // Update the user in AuthContext with the new role returned from backend
            updateUser(res.data);

            // Let RoleCheckpoint decide where to go based on the new role
            navigate("/role-checkpoint", { replace: true });

        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h1 style={styles.title}>Choose your role</h1>
                <p style={styles.subtitle}>How do you plan to use FreelancerHub?</p>

                <div style={styles.roleGrid}>
                    {/* Freelancer Card */}
                    <div
                        style={{
                            ...styles.roleCard,
                            ...(selectedRole === "FREELANCER" ? styles.roleCardSelected : {}),
                        }}
                        onClick={() => setSelectedRole("FREELANCER")}
                    >
                        <span style={styles.roleIcon}>💻</span>
                        <p style={styles.roleTitle}>I am a Freelancer</p>
                        <p style={styles.roleDesc}>I want to find work and manage my projects.</p>
                    </div>

                    {/* Client Card */}
                    <div
                        style={{
                            ...styles.roleCard,
                            ...(selectedRole === "CLIENT" ? styles.roleCardSelected : {}),
                        }}
                        onClick={() => setSelectedRole("CLIENT")}
                    >
                        <span style={styles.roleIcon}>🚀</span>
                        <p style={styles.roleTitle}>I am a Client</p>
                        <p style={styles.roleDesc}>I want to hire talent and manage contracts.</p>
                    </div>
                </div>

                <button
                    style={{
                        ...styles.continueBtn,
                        ...(!selectedRole || loading ? styles.continueBtnDisabled : {}),
                    }}
                    onClick={handleContinue}
                    disabled={!selectedRole || loading}
                >
                    {loading ? "Saving..." : "Continue"}
                </button>

                {error && <p style={styles.errorMsg}>{error}</p>}
            </div>
        </div>
    );
}

export default CompleteProfile;