import Link from "next/link";
import { notFound } from "next/navigation";
import { formatLabel } from "@/lib/demo-data";
import { getTicketRecord } from "@/lib/support-engine";

type TicketDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function TicketDetailPage({ params }: TicketDetailPageProps) {
  const { id } = await params;
  const ticket = getTicketRecord(id);

  if (ticket === undefined) {
    notFound();
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="title-block">
          <p className="eyebrow">Ticket Detail</p>
          <h1>{ticket.customer}</h1>
          <p className="subtitle">{ticket.email}</p>
        </div>
        <nav className="topnav">
          <Link className="nav-link" href="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link" href="/inbox">
            Inbox
          </Link>
        </nav>
      </header>

      <section className="status-strip">
        <span className={`badge badge-${ticket.ai.priority}`}>{formatLabel(ticket.ai.priority)} priority</span>
        <span className="badge badge-neutral">{formatLabel(ticket.ai.sentiment)} sentiment</span>
        <span className="badge badge-neutral">{formatLabel(ticket.status)} status</span>
        <span className="strip-note">{ticket.ai.rationale}</span>
      </section>

      <section className="grid two-col">
        <article className="card card-message">
          <div className="panel-head">
            <div>
              <p className="label">Customer message</p>
              <h2>{ticket.id}</h2>
            </div>
            <span className="time-chip">{ticket.createdAt}</span>
          </div>
          <hr />
          <div className="message-bubble">
            <p>{ticket.message}</p>
          </div>

          <div className="chip-row">
            <span className={`badge badge-${ticket.ai.priority}`}>{formatLabel(ticket.ai.priority)}</span>
            <span className="badge badge-neutral">{formatLabel(ticket.status)}</span>
            <span className="badge badge-neutral">{formatLabel(ticket.ai.sentiment)}</span>
          </div>
        </article>

        <article className="card ai-card">
          <div className="panel-head">
            <div>
              <p className="label">AI Copilot</p>
              <h2>Resolution workspace</h2>
            </div>
            <span className="confidence-chip">91% confidence</span>
          </div>

          <div className="stack">
            <div className="stack-block">
              <p className="label">Summary</p>
              <p>{ticket.ai.summary}</p>
            </div>

            <div className="stack-block">
              <p className="label">Suggested reply</p>
              <div className="reply-box">
                <p>{ticket.ai.suggestedReply}</p>
              </div>
              <div className="actions">
                <button className="button button-primary" type="button">
                  Insert Reply
                </button>
                <button className="button button-secondary" type="button">
                  Regenerate
                </button>
              </div>
            </div>

            <div className="stack-block">
              <p className="label">Knowledge references</p>
              <ul className="ref-list">
                {ticket.ai.knowledgeRefs.map((ref) => (
                  <li key={ref}>{ref}</li>
                ))}
              </ul>
            </div>

            <div className="stack-block">
              <p className="label">AI rationale</p>
              <p>{ticket.ai.rationale}</p>
            </div>

            <div className="stack-block">
              <p className="label">Actions</p>
              <div className="actions">
                <button className="button button-secondary" type="button">
                  Assign
                </button>
                <button className="button button-secondary" type="button">
                  Escalate
                </button>
                <button className="button button-danger" type="button">
                  Close
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
