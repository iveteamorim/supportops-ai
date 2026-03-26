"use client";

import { startTransition, useState } from "react";
import { formatLabel } from "@/lib/demo-data";
import type { TicketRecord } from "@/lib/support-engine";

type TicketWorkspaceProps = {
  ticket: TicketRecord;
};

const replyVariants = [
  "I am reviewing the billing and access issue now. I will confirm the next step and timing in this thread shortly.",
  "Thanks for reporting this. I am checking the account impact, payment history, and service state so we can resolve it cleanly.",
  "I am treating this as a priority support request and will confirm both the service fix and any billing correction today.",
];

export function TicketWorkspace({ ticket }: TicketWorkspaceProps) {
  const [status, setStatus] = useState(ticket.status);
  const [assignee, setAssignee] = useState("Unassigned");
  const [draftReply, setDraftReply] = useState("");
  const [replyVersion, setReplyVersion] = useState(0);
  const [activity, setActivity] = useState("AI workspace ready.");
  const [feedback, setFeedback] = useState<"idle" | "positive" | "negative">("idle");
  const [lastUpdated, setLastUpdated] = useState("just now");

  const currentReply =
    replyVersion === 0 ? ticket.ai.suggestedReply : replyVariants[(replyVersion - 1) % replyVariants.length];

  function updateActivity(message: string) {
    setActivity(message);
    setLastUpdated("just now");
  }

  function handleInsertReply() {
    startTransition(() => {
      setDraftReply(currentReply);
      updateActivity("Suggested reply inserted into draft.");
    });
  }

  function handleRegenerate() {
    startTransition(() => {
      setReplyVersion((value) => value + 1);
      updateActivity("Generated a new reply variation.");
    });
  }

  function handleAssign() {
    startTransition(() => {
      setAssignee("Ana Costa");
      updateActivity("Ticket assigned to Ana Costa.");
    });
  }

  function handleEscalate() {
    startTransition(() => {
      setStatus("escalated");
      updateActivity("Ticket escalated to specialist queue.");
    });
  }

  function handleClose() {
    startTransition(() => {
      setStatus("closed");
      updateActivity("Ticket marked as closed.");
    });
  }

  return (
    <>
      <section className="signal-bar">
        <span className="signal-pill">Based on 120 support tickets in demo dataset</span>
        <span className="signal-pill">Last updated {lastUpdated}</span>
        <span className="signal-pill">SLA risk {formatLabel(ticket.slaRisk)}</span>
      </section>

      <section className="status-strip">
        <span className={`badge badge-${ticket.ai.priority}`}>{formatLabel(ticket.ai.priority)} priority</span>
        <span className="badge badge-neutral">{formatLabel(ticket.ai.sentiment)} sentiment</span>
        <span className="badge badge-neutral">{formatLabel(status)} status</span>
        <span className="badge badge-neutral">{assignee}</span>
        <span className="strip-note">{ticket.ai.rationale}</span>
      </section>

      <section className="grid two-col">
        <article className="card card-message">
          <div className="panel-head">
            <div>
              <p className="label">Conversation thread</p>
              <h2>{ticket.id}</h2>
            </div>
            <span className="time-chip">{ticket.createdAt}</span>
          </div>
          <hr />
          <div className="thread-list">
            {ticket.messages.map((message) => (
              <div className={`thread-item thread-${message.author}`} key={message.id}>
                <div className="thread-meta">
                  <span>{formatLabel(message.author)}</span>
                  <span>{message.timestamp}</span>
                </div>
                <div className="message-bubble">
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="chip-row">
            <span className={`badge badge-${ticket.ai.priority}`}>{formatLabel(ticket.ai.priority)}</span>
            <span className="badge badge-neutral">{formatLabel(status)}</span>
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
                <p>{currentReply}</p>
              </div>
              <div className="actions">
                <button className="button button-primary" onClick={handleInsertReply} type="button">
                  Insert Reply
                </button>
                <button className="button button-secondary" onClick={handleRegenerate} type="button">
                  Regenerate
                </button>
              </div>
            </div>

            <div className="stack-block">
              <p className="label">Draft reply</p>
              <textarea
                className="draft-input"
                onChange={(event) => setDraftReply(event.target.value)}
                placeholder="Inserted reply will appear here."
                rows={6}
                value={draftReply}
              />
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
              <p className="activity-subnote">Signals: billing keywords, access impact, wait time {ticket.waitingTime}.</p>
            </div>

            <div className="stack-block">
              <p className="label">Feedback loop</p>
              <div className="actions">
                <button
                  className={`button button-secondary ${feedback === "positive" ? "button-selected" : ""}`}
                  onClick={() => {
                    setFeedback("positive");
                    updateActivity("Agent marked the suggestion as useful.");
                  }}
                  type="button"
                >
                  Useful
                </button>
                <button
                  className={`button button-secondary ${feedback === "negative" ? "button-selected" : ""}`}
                  onClick={() => {
                    setFeedback("negative");
                    updateActivity("Agent requested better AI suggestions.");
                  }}
                  type="button"
                >
                  Needs improvement
                </button>
              </div>
            </div>

            <div className="stack-block">
              <p className="label">Actions</p>
              <div className="actions">
                <button className="button button-secondary" onClick={handleAssign} type="button">
                  Assign
                </button>
                <button className="button button-secondary" onClick={handleEscalate} type="button">
                  Escalate
                </button>
                <button className="button button-danger" onClick={handleClose} type="button">
                  Close
                </button>
              </div>
              <div className="activity-panel">
                <p className="activity-note">{activity}</p>
                <p className="activity-subnote">Syncing complete. Workspace updated {lastUpdated}.</p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
