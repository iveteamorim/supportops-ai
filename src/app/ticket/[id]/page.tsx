import Link from "next/link";
import { notFound } from "next/navigation";
import { getTicketRecord } from "@/lib/support-engine";
import { TicketWorkspace } from "@/app/ticket/[id]/ticket-workspace";

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
      <TicketWorkspace ticket={ticket} />
    </main>
  );
}
