import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RoleCheckpoint = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === "CLIENT") {
        return <Navigate to="/dashboard-client" replace />;
    }

    if (user.role === "FREELANCER") {
        return <Navigate to="/dashboard-freelancer" replace />;
    }

    if (user.role === "PENDING") {
        return <Navigate to="/complete-profile" replace />;
    }

    return null;
};

export default RoleCheckpoint;
