import Link from "next/link";
import { listTicketRecords } from "@/lib/support-engine";

export default function DashboardPage() {
  const tickets = listTicketRecords();
  const openTickets = tickets.filter((ticket) => ticket.status === "open" || ticket.status === "pending");
  const highPriority = tickets.filter((ticket) => ticket.ai.priority === "high");
  const escalations = tickets.filter((ticket) => ticket.status === "escalated");
  const avgResponseTime = "12m";

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="title-block">
          <p className="eyebrow">SupportOps AI</p>
          <h1>Support Command Center</h1>
        </div>
        <nav className="topnav">
          <Link className="nav-link active" href="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link" href="/inbox">
            Inbox
          </Link>
        </nav>
      </header>

      <section className="hero hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Today</p>
          <h2>Reduce support workload with AI-prioritized operations</h2>
          <p className="subtitle">
            Summaries, suggested replies, escalation routing, and ticket triage in one operating surface.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/inbox">
              Open Live Inbox
            </Link>
            <span className="hero-note">Built for support teams handling billing, access, and plan-change requests.</span>
          </div>
        </div>
        <div className="hero-panel">
          <p className="label">Live AI snapshot</p>
          <div className="hero-stat-list">
            <div>
              <span className="hero-stat-value">{highPriority.length}</span>
              <span className="hero-stat-label">urgent tickets</span>
            </div>
            <div>
              <span className="hero-stat-value">{avgResponseTime}</span>
              <span className="hero-stat-label">avg first response</span>
            </div>
            <div>
              <span className="hero-stat-value">91%</span>
              <span className="hero-stat-label">reply confidence</span>
            </div>
          </div>
        </div>
      </section>

      <section className="kpi-grid">
        <article className="card metric-card">
          <p className="label">Tickets today</p>
          <p className="kpi">{tickets.length}</p>
        </article>
        <article className="card metric-card">
          <p className="label">Open + pending</p>
          <p className="kpi">{openTickets.length}</p>
        </article>
        <article className="card metric-card">
          <p className="label">High priority</p>
          <p className="kpi">{highPriority.length}</p>
        </article>
        <article className="card metric-card">
          <p className="label">Escalations</p>
          <p className="kpi">{escalations.length}</p>
        </article>
      </section>

      <section className="grid two-col">
        <article className="card card-emphasis">
          <p className="label">Focus now</p>
          <h3>High-risk billing conversations</h3>
          <p className="subtitle">
            AI detected urgent sentiment and payment disputes. These are the tickets most likely to escalate or churn.
          </p>
        </article>
        <article className="card">
          <p className="label">Impact target</p>
          <h3>Handling time reduction: 50-70%</h3>
          <p className="subtitle">Use AI summary and suggested reply to resolve tickets in fewer touches and with better consistency.</p>
        </article>
      </section>
    </main>
  );
}
