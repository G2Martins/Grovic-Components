import { NextResponse } from "next/server"

// Stub — wire up Prisma + bcrypt when ready for production
export async function POST() {
  return NextResponse.json({ error: "Registration not configured in demo mode" }, { status: 501 })
}
