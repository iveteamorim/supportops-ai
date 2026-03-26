import { NextResponse } from "next/server";
import { generateTicketInsight } from "@/lib/support-engine";
import { type Ticket } from "@/lib/demo-data";

export async function POST(request: Request) {
  const ticket = (await request.json()) as Ticket;
  const insight = generateTicketInsight(ticket);

  return NextResponse.json({
    summary: insight.summary,
    priority: insight.priority,
    sentiment: insight.sentiment,
    rationale: insight.rationale,
  });
}
