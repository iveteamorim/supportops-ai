import { getTicketById, tickets, type Ticket } from "@/lib/demo-data";

export type TicketInsight = {
  summary: string;
  suggestedReply: string;
  knowledgeRefs: string[];
  priority: Ticket["priority"];
  sentiment: Ticket["sentiment"];
  rationale: string;
};

export type TicketRecord = Ticket & {
  ai: TicketInsight;
};

const knowledgeBase = [
  {
    match: ["charged", "refund", "payment", "invoice", "subscription"],
    refs: ["Billing Refund Policy", "Subscription Access Recovery SOP"],
  },
  {
    match: ["access", "login", "cannot access", "premium"],
    refs: ["Account Access Troubleshooting", "Subscription Access Recovery SOP"],
  },
  {
    match: ["plan", "upgrade", "pricing", "sso"],
    refs: ["Plan Matrix", "SSO Setup Guide"],
  },
  {
    match: ["cancel", "cancellation"],
    refs: ["Cancellation Policy"],
  },
];

function includesAny(message: string, patterns: string[]) {
  return patterns.some((pattern) => message.includes(pattern));
}

function detectPriority(ticket: Ticket): Ticket["priority"] {
  const message = ticket.message.toLowerCase();

  if (includesAny(message, ["charged", "refund", "payment", "cannot access", "urgent"])) {
    return "high";
  }

  if (includesAny(message, ["upgrade", "plan", "sso"])) {
    return "medium";
  }

  return ticket.priority;
}

function detectSentiment(ticket: Ticket): Ticket["sentiment"] {
  const message = ticket.message.toLowerCase();

  if (includesAny(message, ["charged twice", "cannot access", "still cannot", "frustrated"])) {
    return "angry";
  }

  if (includesAny(message, ["thanks", "works now"])) {
    return "happy";
  }

  return ticket.sentiment;
}

function buildSummary(ticket: Ticket) {
  const message = ticket.message.toLowerCase();

  if (includesAny(message, ["charged", "payment", "refund"])) {
    return "Billing issue detected: possible duplicate charge with service access impact.";
  }

  if (includesAny(message, ["sso", "upgrade", "plan"])) {
    return "Pre-sales plan question: customer is evaluating whether current plan supports SSO.";
  }

  if (includesAny(message, ["cancel", "cancellation"])) {
    return "Retention-sensitive request: customer wants confirmation that cancellation is completed.";
  }

  return ticket.summary;
}

function buildSuggestedReply(ticket: Ticket, priority: Ticket["priority"]) {
  const firstName = ticket.customer.split(" ")[0];
  const message = ticket.message.toLowerCase();

  if (includesAny(message, ["charged", "refund", "payment"])) {
    return `Hi ${firstName}, thanks for flagging this. I am reviewing the duplicate billing event, restoring access, and will confirm the refund timeline in this thread today.`;
  }

  if (includesAny(message, ["sso", "upgrade", "plan"])) {
    return `Hi ${firstName}, SSO is available on our Growth tier and above. I can confirm the right upgrade path and send the enablement steps for your team today.`;
  }

  if (includesAny(message, ["cancel", "cancellation"])) {
    return `Hi ${firstName}, your cancellation request is already recorded. I can confirm the effective date and remaining access window right away.`;
  }

  if (priority === "high") {
    return `Hi ${firstName}, I am treating this as urgent and reviewing it now. I will follow up with the exact resolution steps shortly.`;
  }

  return ticket.suggestedReply;
}

function getKnowledgeRefs(ticket: Ticket) {
  const message = ticket.message.toLowerCase();
  const refs = new Set<string>(ticket.knowledgeRefs);

  for (const topic of knowledgeBase) {
    if (includesAny(message, topic.match)) {
      topic.refs.forEach((ref) => refs.add(ref));
    }
  }

  return Array.from(refs);
}

export function generateTicketInsight(ticket: Ticket): TicketInsight {
  const priority = detectPriority(ticket);
  const sentiment = detectSentiment(ticket);

  return {
    summary: buildSummary(ticket),
    suggestedReply: buildSuggestedReply(ticket, priority),
    knowledgeRefs: getKnowledgeRefs(ticket),
    priority,
    sentiment,
    rationale:
      priority === "high"
        ? "Urgent keywords and account-impact signals detected."
        : "Ticket categorized from intent keywords and support policy matches.",
  };
}

export function getTicketRecord(id: string) {
  const ticket = getTicketById(id);

  if (!ticket) {
    return undefined;
  }

  return {
    ...ticket,
    ai: generateTicketInsight(ticket),
  } satisfies TicketRecord;
}

export function listTicketRecords() {
  return tickets.map((ticket) => ({
    ...ticket,
    ai: generateTicketInsight(ticket),
  })) satisfies TicketRecord[];
}
