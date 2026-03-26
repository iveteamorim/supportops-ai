import Link from "next/link";
import { formatLabel } from "@/lib/demo-data";
import { listTicketRecords } from "@/lib/support-engine";

export default function InboxPage() {
  const tickets = listTicketRecords();

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="title-block">
          <p className="eyebrow">SupportOps AI</p>
          <h1>Ticket Inbox</h1>
        </div>
        <nav className="topnav">
          <Link className="nav-link" href="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link active" href="/inbox">
            Inbox
          </Link>
        </nav>
      </header>

      <section className="alert-card">
        <p className="alert-title">Priority Alert</p>
        <p className="warn">3 high-impact tickets need response in the next 30 minutes.</p>
      </section>

      <section className="toolbar-card">
        <div>
          <p className="label">Queue mode</p>
          <p className="subtitle">AI-ranked tickets sorted by business risk and urgency.</p>
        </div>
        <div className="toolbar-pills">
          <span className="pill pill-active">All</span>
          <span className="pill">High intent</span>
          <span className="pill">Billing</span>
          <span className="pill">Escalation risk</span>
        </div>
      </section>

      <section className="card table-card">
        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Issue summary (AI)</th>
              <th>Priority</th>
              <th>Sentiment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr className="table-row" key={ticket.id}>
                <td>
                  <p className="cell-strong">{ticket.customer}</p>
                  <p className="cell-muted">{ticket.email}</p>
                </td>
                <td>{ticket.ai.summary}</td>
                <td>
                  <span className={`badge badge-${ticket.ai.priority}`}>{formatLabel(ticket.ai.priority)}</span>
                </td>
                <td>
                  <span className="badge badge-neutral">{formatLabel(ticket.ai.sentiment)}</span>
                </td>
                <td>
                  <span className="badge badge-neutral">{formatLabel(ticket.status)}</span>
                </td>
                <td>
                  <Link className="button button-secondary button-compact" href={`/ticket/${ticket.id}`}>
                    Open ticket
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
