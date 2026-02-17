import React from "react";

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#1e293b",
        lineHeight: 1.6,
        width: "100%",
        overflowX: "hidden",
        backgroundColor: "#f8fafc",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
    },
    logo: {
        fontSize: "20px",
        fontWeight: 700,
        color: "#0f172a",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    logoIcon: {
        width: "28px",
        height: "28px",
        background: "#0f172a",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "14px",
        fontWeight: "bold",
    },
    navLinks: {
        display: "flex",
        gap: "32px",
        alignItems: "center",
    },
    link: {
        textDecoration: "none",
        color: "#475569",
        fontWeight: 500,
        fontSize: "14px",
        transition: "color 0.2s",
        cursor: "pointer",
    },
    authButtons: {
        display: "flex",
        gap: "16px",
    },
    loginBtn: {
        padding: "8px 16px",
        borderRadius: "8px",
        border: "none",
        background: "transparent",
        color: "#334155",
        fontWeight: 600,
        cursor: "pointer",
        fontSize: "14px",
    },
    signupBtn: {
        padding: "8px 20px",
        borderRadius: "8px",
        border: "none",
        background: "#0f172a",
        color: "white",
        fontWeight: 500,
        cursor: "pointer",
        fontSize: "14px",
        transition: "background 0.2s",
    },
    hero: {
        textAlign: "center",
        padding: "120px 20px 100px",
        maxWidth: "900px",
        margin: "0 auto",
    },
    heroTitle: {
        fontSize: "56px",
        fontWeight: 800,
        color: "#0f172a",
        marginBottom: "24px",
        lineHeight: 1.15,
        letterSpacing: "-0.03em",
    },
    heroSubtitle: {
        fontSize: "18px",
        color: "#64748b",
        marginBottom: "48px",
        maxWidth: "600px",
        marginLeft: "auto",
        marginRight: "auto",
        lineHeight: 1.6,
    },
    ctaContainer: {
        display: "flex",
        gap: "16px",
        justifyContent: "center",
        marginBottom: "80px",
    },
    primaryCta: {
        padding: "16px 36px",
        borderRadius: "12px",
        border: "none",
        background: "#2563eb",
        color: "white",
        fontSize: "15px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "transform 0.1s",
    },
    secondaryCta: {
        padding: "16px 36px",
        borderRadius: "12px",
        border: "1px solid #cbd5e1",
        background: "white",
        color: "#334155",
        fontSize: "15px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "background 0.1s",
    },
    statsSection: {
        display: "flex",
        justifyContent: "center",
        gap: "80px",
        padding: "40px 0",
        borderTop: "1px solid #f1f5f9",
        borderBottom: "1px solid #f1f5f9",
        background: "#ffffff",
    },
    statItem: {
        textAlign: "center",
    },
    statValue: {
        fontSize: "32px",
        fontWeight: 700,
        color: "#0f172a",
        display: "block",
        marginBottom: "4px",
    },
    statLabel: {
        fontSize: "13px",
        fontWeight: 500,
        color: "#64748b",
    },
    featuresSection: {
        padding: "100px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    sectionHeader: {
        textAlign: "center",
        marginBottom: "80px",
    },
    sectionTitle: {
        fontSize: "32px",
        fontWeight: 700,
        color: "#0f172a",
        marginBottom: "16px",
        letterSpacing: "-0.02em",
    },
    sectionSubtitle: {
        fontSize: "16px",
        color: "#64748b",
        maxWidth: "600px",
        margin: "0 auto",
    },
    featuresGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "40px",
    },
    featureCard: {
        padding: "40px",
        borderRadius: "24px",
        background: "white",
        border: "1px solid #e2e8f0",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    featureIcon: {
        width: "56px",
        height: "56px",
        borderRadius: "16px",
        background: "#eff6ff",
        color: "#3b82f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
        marginBottom: "24px",
    },
    featureTitle: {
        fontSize: "20px",
        fontWeight: 700,
        color: "#0f172a",
        marginBottom: "12px",
    },
    featureText: {
        color: "#64748b",
        lineHeight: 1.6,
        fontSize: "16px",
    },
    footer: {
        background: "#0f172a",
        color: "white",
        padding: "80px 20px 40px",
        marginTop: "auto",
    },
    footerContent: {
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "60px",
        marginBottom: "60px",
    },
    footerBrand: {
        fontSize: "24px",
        fontWeight: 800,
        marginBottom: "20px",
        display: "block",
        color: "white",
        textDecoration: "none",
    },
    footerText: {
        color: "#94a3b8",
        maxWidth: "320px",
        lineHeight: 1.6,
        fontSize: "15px",
    },
    footerColTitle: {
        fontSize: "14px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        marginBottom: "24px",
        color: "white",
    },
    footerLink: {
        display: "block",
        color: "#94a3b8",
        textDecoration: "none",
        marginBottom: "16px",
        fontSize: "15px",
        transition: "color 0.2s",
    },
    copyright: {
        textAlign: "center",
        color: "#64748b",
        paddingTop: "40px",
        borderTop: "1px solid #1e293b",
        fontSize: "14px",
    },
    splitWrapper: {
        display: "flex",
        alignItems: "center",
        gap: "80px",
        flexWrap: "wrap",
        padding: "100px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        boxSizing: "border-box",
    },
    splitContent: {
        flex: 1,
        minWidth: "300px",
    },
    splitVisual: {
        flex: 1,
        minWidth: "300px",
        height: "400px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "64px",
        border: "1px solid #f1f5f9",
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
    },
    sectionTag: {
        color: "#2563eb",
        fontWeight: 600,
        fontSize: "13px",
        marginBottom: "16px",
        display: "block",
    },
    sectionHeading: {
        fontSize: "36px",
        fontWeight: 700,
        color: "#0f172a",
        marginBottom: "24px",
        lineHeight: 1.2,
        letterSpacing: "-0.03em",
    },
    sectionText: {
        fontSize: "16px",
        color: "#64748b",
        lineHeight: 1.7,
        marginBottom: "32px",
    },
    checkList: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        marginBottom: "40px",
    },
    checkItem: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontSize: "15px",
        color: "#334155",
        fontWeight: 500,
    },
};

interface LandingPageProps {
    onSignup?: () => void;
}

export function LandingPage({ onSignup }: LandingPageProps) {
    return (
        <div style={styles.container}>
            <nav style={styles.nav}>
                <a href="/" style={styles.logo}>
                    <div style={styles.logoIcon}>FL</div>
                    FreelancerHub
                </a>
                <div style={styles.navLinks}>
                    <a href="#jobs" style={styles.link}>Jobs</a>
                    <a href="#talent" style={styles.link}>Talent</a>
                    <a href="#features" style={styles.link}>Features</a>
                    <a href="#enterprise" style={styles.link}>Enterprise</a>
                </div>
                <div style={styles.authButtons}>
                    <button style={styles.loginBtn}>Log In</button>
                    <button style={styles.signupBtn} onClick={onSignup}>Sign Up</button>
                </div>
            </nav>

            <header style={styles.hero}>
                <h1 style={styles.heroTitle}>
                    Hire expert freelancers<br />
                    <span style={{ color: "#2563eb" }}>for any job, online.</span>
                </h1>
                <p style={styles.heroSubtitle}>
                    Millions of people use FreelancerHub to turn their ideas into reality.
                    Connect with top talent, manage projects, and pay securely.
                </p>
                <div style={styles.ctaContainer}>
                    <button style={styles.primaryCta} onClick={onSignup}>Hire Talent</button>
                    <button style={styles.secondaryCta} onClick={onSignup}>Find Work</button>
                </div>
            </header>

            <section style={styles.statsSection}>
                <div style={styles.statItem}>
                    <span style={styles.statValue}>50k+</span>
                    <span style={styles.statLabel}>Active Freelancers</span>
                </div>
                <div style={styles.statItem}>
                    <span style={styles.statValue}>$120M+</span>
                    <span style={styles.statLabel}>Paid to Talent</span>
                </div>
                <div style={styles.statItem}>
                    <span style={styles.statValue}>98%</span>
                    <span style={styles.statLabel}>Satisfaction Rate</span>
                </div>
                <div style={styles.statItem}>
                    <span style={styles.statValue}>24/7</span>
                    <span style={styles.statLabel}>Support</span>
                </div>
            </section>

            <section id="talent" style={styles.splitWrapper}>
                <div style={styles.splitContent}>
                    <span style={styles.sectionTag}>For Clients</span>
                    <h2 style={styles.sectionHeading}>Find talent your way</h2>
                    <p style={styles.sectionText}>
                        Work with the largest network of independent professionals and get things done—from quick turnarounds to big transformations.
                    </p>
                    <div style={styles.checkList}>
                        <div style={styles.checkItem}><span>✓</span> Post a job and hire a pro</div>
                        <div style={styles.checkItem}><span>✓</span> Browse and buy projects</div>
                        <div style={styles.checkItem}><span>✓</span> Get advice from an industry expert</div>
                    </div>
                    <button style={styles.primaryCta} onClick={onSignup}>Post a Job</button>
                </div>
                <div style={styles.splitVisual}>
                    👩‍💻
                </div>
            </section>

            <section id="jobs" style={{ ...styles.splitWrapper, flexDirection: "row-reverse" }}>
                <div style={styles.splitContent}>
                    <span style={styles.sectionTag}>For Talent</span>
                    <h2 style={styles.sectionHeading}>Find great work</h2>
                    <p style={styles.sectionText}>
                        Meet clients you’re excited to work with and take your career or business to new heights.
                    </p>
                    <div style={styles.checkList}>
                        <div style={styles.checkItem}><span>✓</span> Find opportunities for every stage of your freelance career</div>
                        <div style={styles.checkItem}><span>✓</span> Control when, where, and how you work</div>
                        <div style={styles.checkItem}><span>✓</span> Explore different ways to earn</div>
                    </div>
                    <button style={styles.primaryCta} onClick={onSignup}>Find Opportunities</button>
                </div>
                <div style={styles.splitVisual}>
                    🎨
                </div>
            </section>

            <section id="features" style={styles.featuresSection}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>Everything you need to succeed</h2>
                    <p style={styles.sectionSubtitle}>
                        Powerful tools to help you manage your work and get paid on time.
                    </p>
                </div>

                <div style={styles.featuresGrid}>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>🛡️</div>
                        <h3 style={styles.featureTitle}>Secure Payments</h3>
                        <p style={styles.featureText}>
                            Funds are held in escrow until work is approved. Get paid on time, every time, with multiple withdrawal options including PayPal and Bank Transfer.
                        </p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>💬</div>
                        <h3 style={styles.featureTitle}>Seamless Chat</h3>
                        <p style={styles.featureText}>
                            Collaborate efficiently with built-in messaging, file sharing, and video calls. Keep all your project communications in one secure place.
                        </p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>📊</div>
                        <h3 style={styles.featureTitle}>Project Tracking</h3>
                        <p style={styles.featureText}>
                            Monitor progress with intuitive dashboards, milestones, and time tracking tools designed for modern freelance workflows.
                        </p>
                    </div>
                </div>
            </section>

            <footer style={styles.footer}>
                <div style={styles.footerContent}>
                    <div>
                        <a href="/" style={styles.footerBrand}>FreelancerHub</a>
                        <p style={styles.footerText}>
                            The world's most trusted marketplace for digital freelance talent. Built for the future of work.
                        </p>
                    </div>
                    <div>
                        <h4 style={styles.footerColTitle}>For Talent</h4>
                        <a href="#" style={styles.footerLink}>Find Jobs</a>
                        <a href="#" style={styles.footerLink}>Create Profile</a>
                        <a href="#" style={styles.footerLink}>Success Stories</a>
                        <a href="#" style={styles.footerLink}>Resources</a>
                    </div>
                    <div>
                        <h4 style={styles.footerColTitle}>For Clients</h4>
                        <a href="#" style={styles.footerLink}>Post a Job</a>
                        <a href="#" style={styles.footerLink}>Find Freelancers</a>
                        <a href="#" style={styles.footerLink}>Enterprise Solutions</a>
                        <a href="#" style={styles.footerLink}>Trust & Safety</a>
                    </div>
                    <div>
                        <h4 style={styles.footerColTitle}>Company</h4>
                        <a href="#" style={styles.footerLink}>About Us</a>
                        <a href="#" style={styles.footerLink}>Careers</a>
                        <a href="#" style={styles.footerLink}>Support</a>
                        <a href="#" style={styles.footerLink}>Contact</a>
                    </div>
                </div>
                <div style={styles.copyright}>
                    © 2026 FreelancerHub Inc. All rights reserved.
                </div>
            </footer>
        </div>
    );
}