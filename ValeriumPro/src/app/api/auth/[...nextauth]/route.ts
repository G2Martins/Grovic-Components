import { NextResponse } from "next/server"

// Stub — wire up NextAuth + Prisma when ready for production
export async function GET() {
  return NextResponse.json({ error: "Auth not configured in demo mode" }, { status: 501 })
}
export async function POST() {
  return NextResponse.json({ error: "Auth not configured in demo mode" }, { status: 501 })
}
