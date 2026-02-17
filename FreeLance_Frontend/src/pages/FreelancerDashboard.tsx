import React, {useContext, useState} from "react";
import { AuthContext} from "../context/AuthContext.tsx";
import { Sidebar, type SectionType } from "../components/Dashboard_Components/Sidebar";
import { DashboardSection } from "../components/Dashboard_Components/DashboardSection";
import { ProjectsSection } from "../components/Dashboard_Components/ProjectsSection";
import { EarningsSection } from "../components/Dashboard_Components/EarningsSection";

type Project = {
    id: number;
    name: string;
    client: string;
    due: string;
    status: "In Progress" | "Pending Review" | "Completed";
    earned: number;
    progress: number;
};

const mockProjects: Project[] = [
    { id: 1, name: "Website Redesign", client: "TechCorp Inc.", due: "Dec 15, 2024", status: "In Progress", earned: 1500, progress: 65 },
    { id: 2, name: "Mobile App Development", client: "StartupXYZ", due: "Jan 5, 2025", status: "In Progress", earned: 3200, progress: 45 },
    { id: 3, name: "Content Writing Package", client: "MediaHub", due: "Dec 20, 2024", status: "Pending Review", earned: 900, progress: 90 },
    { id: 4, name: "Social Media Graphics", client: "BrandCo", due: "Nov 28, 2024", status: "Completed", earned: 650, progress: 100 },
    { id: 5, name: "UI/UX Audit", client: "FinanceApp Co.", due: "Jan 10, 2025", status: "In Progress", earned: 1200, progress: 30 },
];

function FreelancerDashboard(): React.ReactElement {
    const { user, logout } = useContext(AuthContext);
    const [activeSection, setActiveSection] = useState<SectionType>("dashboard");

    if (!user) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', background: "#f8fafc" }}>
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                    <h2 style={{ marginBottom: 10 }}>Not Authenticated</h2>
                    <p style={{ color: "#6b7280" }}>Please sign in to access your dashboard.</p>
                </div>
            </div>
        );
    }

    const mainStyle: React.CSSProperties = {
        flex: 1,
        padding: "48px 40px",
        overflowY: "auto",
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        flexDirection: "column",
    };

    const rootStyle: React.CSSProperties = {
        display: "flex",
        height: "100vh",
        width: "100vw",
        fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        background: "#f8fafc",
        overflow: "hidden",
    };

    return (
        <div style={rootStyle}>
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={logout} />

            <main style={mainStyle}>
                {activeSection === "dashboard" && <DashboardSection projects={mockProjects} freelancerName={user.name} />}
                {activeSection === "jobs" && (
                    <div>
                        <header style={{ marginBottom: 48 }}>
                            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>Find Work</h1>
                            <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>Browse new opportunities matching your skills</p>
                        </header>
                        <div style={{ padding: 40, textAlign: "center", background: "white", borderRadius: 14, border: "1px solid #e2e8f0", color: "#64748b" }}>
                            No jobs available at the moment. Check back later.
                        </div>
                    </div>
                )}
                {activeSection === "contracts" && <ProjectsSection projects={mockProjects} />}
                {activeSection === "earnings" && <EarningsSection projects={mockProjects} />}
            </main>
        </div>
    );
}

export default FreelancerDashboard;