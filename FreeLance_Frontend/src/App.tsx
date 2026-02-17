import {BrowserRouter, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import type { JSX } from "react";
import { AuthContext } from "./context/AuthContext";

// Pages / Components
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import RoleCheckpoint from "./components/RoleCheckpoint.tsx";


// Temporary Dashboard Components
const ClientDashboard = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div>
            <h2>Client Dashboard</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
const CompleteProfile = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div>
            <h2> Complete Profile</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
};
const FreelancerDashboard = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div>
            <h2> FreelancerDashboard</h2>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { token } = useContext(AuthContext); //checks if the user is logged in

    if (!token) {
        return <Navigate to="/login" />;
    }
    // the protection offered by ProtectRoute is anyone could type localhost:5173/dashboard and log into the dashbard,
    // it is blocked by the ProtectRoute

    return children;
};



function App() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    // Safe redirect if token exists (after login/signup)
    useEffect(() => {
        if (!token) return;

        const currentPath = window.location.pathname;
        if (currentPath === "/login" || currentPath === "/signup") {
            navigate("/role-checkpoint", { replace: true });
        }
    }, [token]);


    return (
        <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Role Checkpoint */}
            <Route
                path="/role-checkpoint"
                element={
                    <ProtectedRoute>
                        <RoleCheckpoint />
                    </ProtectedRoute>
                }
            />

            {/* Dashboards */}
            <Route
                path="/dashboard-client"
                element={
                    <ProtectedRoute>
                        <ClientDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/dashboard-freelancer"
                element={
                    <ProtectedRoute>
                        <FreelancerDashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/complete-profile"
                element={
                    <ProtectedRoute>
                        <CompleteProfile />
                    </ProtectedRoute>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<SignIn />} />
        </Routes>
    );
}
export default App;
