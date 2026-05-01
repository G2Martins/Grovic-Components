import type { Metadata } from "next"
import { InboxView } from "@/components/inbox/inbox-view"

export const metadata: Metadata = { title: "Inbox | ValeriumPro" }

export default function InboxPage() {
  return <InboxView />
}
