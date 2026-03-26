import { NextResponse } from "next/server";
import { listTicketRecords } from "@/lib/support-engine";

export async function GET() {
  return NextResponse.json({ tickets: listTicketRecords() });
}
