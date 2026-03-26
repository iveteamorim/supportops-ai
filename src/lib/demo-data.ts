export type TicketPriority = "high" | "medium" | "low";
export type TicketSentiment = "angry" | "neutral" | "happy";
export type TicketStatus = "open" | "pending" | "escalated" | "closed";

export type Ticket = {
  id: string;
  customer: string;
  email: string;
  message: string;
  summary: string;
  suggestedReply: string;
  knowledgeRefs: string[];
  priority: TicketPriority;
  sentiment: TicketSentiment;
  status: TicketStatus;
  createdAt: string;
};

export const tickets: Ticket[] = [
  {
    id: "t-1001",
    customer: "Sofia Martin",
    email: "sofia.m@example.com",
    message:
      "I was charged twice for my subscription renewal and still cannot access premium features.",
    summary:
      "Customer reports duplicate charge and missing premium access after renewal.",
    suggestedReply:
      "Thanks for reporting this, Sofia. I have escalated the billing issue and we will refund the duplicate charge today. I am also restoring premium access now.",
    knowledgeRefs: ["Billing Refund Policy", "Subscription Access Recovery SOP"],
    priority: "high",
    sentiment: "angry",
    status: "open",
    createdAt: "5m ago",
  },
  {
    id: "t-1002",
    customer: "Daniel Costa",
    email: "daniel.c@example.com",
    message:
      "Can you confirm if my team can add SSO on the current plan, or do we need to upgrade?",
    summary: "Customer asks whether SSO is included in current plan or requires upgrade.",
    suggestedReply:
      "Great question, Daniel. SSO is available on the Growth plan and above. I can share upgrade options and help your team enable it in under 15 minutes.",
    knowledgeRefs: ["Plan Matrix", "SSO Setup Guide"],
    priority: "medium",
    sentiment: "neutral",
    status: "pending",
    createdAt: "24m ago",
  },
  {
    id: "t-1003",
    customer: "Laura Vega",
    email: "laura.v@example.com",
    message:
      "Everything works now, thanks. Just wanted to confirm my cancellation request was processed.",
    summary: "Customer confirms issue solved and asks for cancellation confirmation.",
    suggestedReply:
      "Thanks for confirming, Laura. Your cancellation request is already processed and your account remains active until the end of the billing period.",
    knowledgeRefs: ["Cancellation Policy"],
    priority: "low",
    sentiment: "happy",
    status: "closed",
    createdAt: "2h ago",
  },
];

export function formatLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getTicketById(id: string) {
  return tickets.find((ticket) => ticket.id === id);
}
