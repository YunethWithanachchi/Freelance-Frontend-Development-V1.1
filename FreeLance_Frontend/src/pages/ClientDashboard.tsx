import React, {useContext, useState} from "react";
import { AuthContext } from "../context/AuthContext.tsx";
import { Sidebar, type SectionType } from "../components/Dashboard_Components/Sidebar";
import { StatCard } from "../components/Dashboard_Components/StatCard";
import { StatusBadge } from "../components/Dashboard_Components/StatusBadge";

// --- Mock Data ---
const activeJobs = [
    { id: 101, title: "Senior React Developer", posted: "2 days ago", proposals: 12, status: "Open" },
    { id: 102, title: "UI/UX Designer for SaaS", posted: "5 days ago", proposals: 8, status: "Open" },
    { id: 103, title: "Python Scripting", posted: "1 week ago", proposals: 24, status: "Closed" },
];

const activeContracts = [
    { id: 201, freelancer: "Alice Freeman", project: "Website Redesign", amount: 1500, paid: 500, status: "In Progress", due: "Dec 15, 2024" },
    { id: 202, freelancer: "Bob Smith", project: "Mobile App MVP", amount: 3200, paid: 3200, status: "Completed", due: "Nov 20, 2024" },
];

// --- Styles ---
const styles: { [k: string]: React.CSSProperties } = {
    root: { display: "flex", height: "100vh", width: "100vw", fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif', background: "#f8fafc", overflow: "hidden" },
    main: { flex: 1, padding: "48px 40px", overflowY: "auto", boxSizing: "border-box", width: "100%", display: "flex", flexDirection: "column" },
    header: { marginBottom: 40 },
    heading: { margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" },
    subHeading: { margin: "6px 0 0", color: "#6b7280", fontSize: 14 },
    statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginBottom: 40 },
    card: { background: "white", borderRadius: 14, padding: 32, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0", marginBottom: 32 },
    cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
    cardTitle: { margin: 0, fontSize: 18, fontWeight: 700, color: "#1e293b" },
    primaryBtn: { background: "#0f172a", color: "white", border: "none", padding: "10px 20px", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 14 },
    secondaryBtn: { background: "white", color: "#334155", border: "1px solid #cbd5e1", padding: "8px 16px", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 },
    table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
    th: { textAlign: "left", padding: "12px 16px", borderBottom: "1px solid #e2e8f0", color: "#64748b", fontWeight: 600, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" },
    td: { padding: "16px", borderBottom: "1px solid #f1f5f9", color: "#334155" },
};

function ClientDashboard() {
    const { user, logout } = useContext(AuthContext);
    const [activeSection, setActiveSection] = useState<SectionType>("dashboard");

    if (!user) return null;

    const renderDashboardOverview = () => (
        <>
            <header style={styles.header}>
                <h1 style={styles.heading}>Client Overview</h1>
                <p style={styles.subHeading}>Welcome back, {user.name}.</p>
            </header>

            <div style={styles.statsGrid}>
                <StatCard label="Total Spent" value="$4,700" subtext="Lifetime" />
                <StatCard label="Active Jobs" value={activeJobs.filter(j => j.status === "Open").length} subtext="Receiving proposals" />
                <StatCard label="Active Contracts" value={activeContracts.length} subtext="Freelancers working" />
            </div>

            <div style={styles.card}>
                <div style={styles.cardHeader}>
                    <h2 style={styles.cardTitle}>Recent Job Postings</h2>
                    <button style={styles.secondaryBtn} onClick={() => setActiveSection("my-jobs")}>View All</button>
                </div>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>Job Title</th>
                        <th style={styles.th}>Posted</th>
                        <th style={styles.th}>Proposals</th>
                        <th style={styles.th}>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activeJobs.slice(0, 3).map(job => (
                        <tr key={job.id}>
                            <td style={{ ...styles.td, fontWeight: 500 }}>{job.title}</td>
                            <td style={styles.td}>{job.posted}</td>
                            <td style={styles.td}>{job.proposals}</td>
                            <td style={styles.td}>
                  <span style={{
                      padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600,
                      background: job.status === "Open" ? "#dbeafe" : "#f1f5f9",
                      color: job.status === "Open" ? "#1e40af" : "#64748b"
                  }}>
                    {job.status}
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );

    const renderMyJobs = () => (
        <>
            <header style={{ ...styles.header, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                    <h1 style={styles.heading}>Job Management</h1>
                    <p style={styles.subHeading}>Manage your listings and review proposals</p>
                </div>
                <button style={styles.primaryBtn}>+ Post New Job</button>
            </header>
            <div style={styles.card}>
                <div style={{ padding: 40, textAlign: "center", color: "#64748b" }}>Job management interface goes here</div>
            </div>
        </>
    );

    const renderContracts = () => (
        <>
            <header style={styles.header}>
                <h1 style={styles.heading}>Contracts</h1>
                <p style={styles.subHeading}>Track ongoing projects and milestones</p>
            </header>

            <div style={styles.card}>
                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.th}>Freelancer</th>
                        <th style={styles.th}>Project</th>
                        <th style={styles.th}>Due Date</th>
                        <th style={styles.th}>Total Budget</th>
                        <th style={styles.th}>Paid</th>
                        <th style={styles.th}>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activeContracts.map(contract => (
                        <tr key={contract.id}>
                            <td style={{ ...styles.td, fontWeight: 600 }}>{contract.freelancer}</td>
                            <td style={styles.td}>{contract.project}</td>
                            <td style={styles.td}>{contract.due}</td>
                            <td style={styles.td}>${contract.amount.toLocaleString()}</td>
                            <td style={{ ...styles.td, color: "#059669" }}>${contract.paid.toLocaleString()}</td>
                            <td style={styles.td}>
                                <StatusBadge status={contract.status} />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );

    const renderFinancials = () => (
        <>
            <header style={styles.header}>
                <h1 style={styles.heading}>Financials</h1>
                <p style={styles.subHeading}>Track your expenditure and invoices</p>
            </header>
            <div style={{ ...styles.statsGrid, gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ ...styles.card, marginBottom: 0, background: "#0f172a", color: "white", border: "none" }}>
                    <p style={{ margin: 0, opacity: 0.8, fontSize: 14 }}>Total Expenditure</p>
                    <h2 style={{ margin: "10px 0 0", fontSize: 36 }}>$4,700</h2>
                </div>
                <div style={{ ...styles.card, marginBottom: 0 }}>
                    <p style={{ margin: 0, color: "#64748b", fontSize: 14 }}>Pending Milestones</p>
                    <h2 style={{ margin: "10px 0 0", fontSize: 36, color: "#0f172a" }}>$1,000</h2>
                </div>
            </div>
        </>
    );

    return (
        <div style={styles.root}>
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={logout} />
            <main style={styles.main}>
                {activeSection === "dashboard" && renderDashboardOverview()}
                {activeSection === "my-jobs" && renderMyJobs()}
                {activeSection === "contracts" && renderContracts()}
                {activeSection === "financials" && renderFinancials()}
            </main>
        </div>
    );
}

export default ClientDashboard;