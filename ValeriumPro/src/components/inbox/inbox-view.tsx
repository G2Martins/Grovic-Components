"use client"

import { useState, useRef } from "react"
import { Pencil, Reply, Trash2, MoreHorizontal, ChevronDown, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn, formatRelativeDate, getInitials, truncate } from "@/lib/utils"

type Thread = {
  id: string
  contact: string
  email: string
  subject: string
  preview: string
  body: string
  unread: boolean
  at: string
  replies?: { from: string; body: string; at: string }[]
}

const INITIAL_THREADS: Thread[] = [
  {
    id: "1",
    contact: "Sarah @ Acme Corp",
    email: "sarah@acmecorp.com",
    subject: "Invoice INV-0042 follow-up",
    preview: "Hi, just wanted to check on the status of the invoice we sent last week...",
    body: "Hi Bryan,\n\nJust wanted to check on the status of the invoice we sent last week (INV-0042 for $4,800). Our accounts team has been asking for an update.\n\nLet me know if there's anything on your end we can help with to expedite this.\n\nBest,\nSarah",
    unread: true,
    at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    replies: [],
  },
  {
    id: "2",
    contact: "James Kirk",
    email: "james@globex.io",
    subject: "Project kickoff details",
    preview: "Looking forward to our call tomorrow. Here are the key points I want to cover...",
    body: "Hi Bryan,\n\nLooking forward to our call tomorrow. Here are the key points I want to cover:\n\n1. Scope finalization and timeline\n2. Resource allocation and team introductions\n3. Communication cadence and tools\n4. Risk review and mitigation plan\n\nPlease send over the draft SOW before EOD today if possible.\n\nThanks,\nJames",
    unread: true,
    at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    replies: [],
  },
  {
    id: "3",
    contact: "Lena Müller",
    email: "lena@initech.de",
    subject: "RE: Design revisions",
    preview: "Thanks for the feedback! I've made the changes you requested and attached the new files.",
    body: "Hi Bryan,\n\nThanks for the detailed feedback! I've made all the changes you requested:\n\n• Updated the color palette to match brand guidelines\n• Revised typography hierarchy on the hero section\n• Fixed spacing inconsistencies on mobile\n• Added the new illustration assets\n\nThe updated files are in the shared Figma link. Let me know if anything else needs adjusting.\n\nBest,\nLena",
    unread: false,
    at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    replies: [],
  },
  {
    id: "4",
    contact: "Ahmed Al-Rashid",
    email: "ahmed@umbrella.com",
    subject: "Contract renewal question",
    preview: "Our current contract expires next month and we'd like to discuss renewal terms.",
    body: "Hello Bryan,\n\nOur current service agreement expires on May 31st and we'd like to start renewal discussions before then.\n\nA few questions:\n- Are the service tiers changing for next year?\n- Is there an early-renewal discount available?\n- Can we add the new analytics module to our plan?\n\nWould you be available for a 30-minute call this week or next?\n\nRegards,\nAhmed Al-Rashid\nUmbrella Corp",
    unread: false,
    at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    replies: [],
  },
  {
    id: "5",
    contact: "Globex Support",
    email: "support@globex.io",
    subject: "RE: Integration issue",
    preview: "We've resolved the issue on our end. The API should be working correctly now.",
    body: "Hi Bryan,\n\nWe've resolved the issue on our end. The root cause was a rate-limiting misconfiguration on our API gateway that affected a subset of enterprise customers.\n\nFix deployed: April 26, 2026 at 14:30 UTC\nAffected window: April 24–26\nImpact: Intermittent 429 errors on /v2/transactions endpoint\n\nAll requests should now process correctly. Please confirm on your end and let us know if you see any further anomalies.\n\nApologies for the disruption.\n\nGlobex Support Team",
    unread: false,
    at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    replies: [],
  },
]

export function InboxView() {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [replying, setReplying] = useState(false)
  const [composing, setComposing] = useState(false)
  const [compose, setCompose] = useState({ to: "", subject: "", body: "" })
  const [sending, setSending] = useState(false)

  const selected = threads.find((t) => t.id === selectedId) ?? null
  const unreadCount = threads.filter((t) => t.unread).length

  function selectThread(id: string) {
    setSelectedId(id)
    setReplying(false)
    setReplyText("")
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: false } : t))
    )
  }

  function toggleUnread(id: string) {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, unread: !t.unread } : t))
    )
  }

  function deleteThread(id: string) {
    setThreads((prev) => prev.filter((t) => t.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  function sendReply() {
    if (!replyText.trim() || !selectedId) return
    const now = new Date().toISOString()
    setThreads((prev) =>
      prev.map((t) =>
        t.id === selectedId
          ? {
              ...t,
              at: now,
              replies: [
                ...(t.replies ?? []),
                { from: "Bryan Parreira", body: replyText.trim(), at: now },
              ],
            }
          : t
      )
    )
    setReplyText("")
    setReplying(false)
  }

  function sendCompose() {
    if (!compose.to.trim() || !compose.subject.trim()) return
    setSending(true)
    setTimeout(() => {
      const now = new Date().toISOString()
      const newThread: Thread = {
        id: `new-${Date.now()}`,
        contact: compose.to,
        email: compose.to,
        subject: compose.subject,
        preview: truncate(compose.body, 80),
        body: compose.body,
        unread: false,
        at: now,
        replies: [{ from: "Bryan Parreira", body: compose.body, at: now }],
      }
      setThreads((prev) => [newThread, ...prev])
      setComposing(false)
      setCompose({ to: "", subject: "", body: "" })
      setSending(false)
      setSelectedId(newThread.id)
    }, 500)
  }

  return (
    <>
      {/* Full-bleed split panel */}
      <div className="-mx-4 md:-mx-8 flex h-[calc(100vh-70px)] border-t border-border bg-background overflow-hidden">
        {/* ── Left: thread list ── */}
        <div className="w-[320px] shrink-0 flex flex-col border-r border-border">
          {/* List header */}
          <div className="flex items-center justify-between px-4 h-[52px] border-b border-border shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Inbox</span>
              {unreadCount > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {unreadCount}
                </span>
              )}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => setComposing(true)}
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Thread list */}
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {threads.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 text-xs text-muted-foreground">
                No messages
              </div>
            )}
            {threads.map((t) => (
              <div
                key={t.id}
                onClick={() => selectThread(t.id)}
                className={cn(
                  "flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors",
                  selectedId === t.id
                    ? "bg-[#f7f7f7] dark:bg-[#131313]"
                    : "hover:bg-muted/30",
                  t.unread && selectedId !== t.id && "bg-primary/[0.025]",
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold mt-0.5",
                    t.unread ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                  )}
                >
                  {getInitials(t.contact)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-1">
                    <p className={cn("text-[13px] truncate", t.unread ? "font-semibold" : "font-medium text-foreground/80")}>
                      {t.contact}
                    </p>
                    <span className="text-[10px] text-muted-foreground shrink-0">{formatRelativeDate(t.at)}</span>
                  </div>
                  <p className={cn("text-[12px] mt-0.5 truncate", t.unread ? "text-foreground/90 font-medium" : "text-muted-foreground")}>
                    {t.subject}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {truncate(t.preview, 55)}
                  </p>
                </div>
                {t.unread && <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: message detail ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selected ? (
            <>
              {/* Message toolbar */}
              <div className="flex items-center justify-between px-6 h-[52px] border-b border-border shrink-0">
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1.5"
                    onClick={() => setReplying((r) => !r)}
                  >
                    <Reply className="h-3 w-3" />
                    Reply
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => toggleUnread(selected.id)}
                    title={selected.unread ? "Mark read" : "Mark unread"}
                  >
                    <div className={cn("h-1.5 w-1.5 rounded-full", selected.unread ? "bg-primary" : "bg-muted-foreground/40")} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteThread(selected.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Message content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {/* Subject + sender */}
                <div>
                  <h2 className="text-base font-semibold">{selected.subject}</h2>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-[9px] font-bold text-muted-foreground">
                      {getInitials(selected.contact)}
                    </div>
                    <div>
                      <span className="text-[13px] font-medium">{selected.contact}</span>
                      <span className="text-[11px] text-muted-foreground ml-1.5">&lt;{selected.email}&gt;</span>
                    </div>
                    <span className="ml-auto text-[11px] text-muted-foreground">{formatRelativeDate(selected.at)}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="text-[14px] leading-relaxed whitespace-pre-wrap text-foreground/90 border-t border-border pt-4">
                  {selected.body}
                </div>

                {/* Replies */}
                {(selected.replies ?? []).length > 0 && (
                  <div className="space-y-4 border-t border-border pt-4">
                    {selected.replies!.map((r, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
                          {getInitials(r.from)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-[13px] font-medium">{r.from}</span>
                            <span className="text-[11px] text-muted-foreground">{formatRelativeDate(r.at)}</span>
                          </div>
                          <p className="text-[13px] leading-relaxed whitespace-pre-wrap mt-1 text-foreground/90">
                            {r.body}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reply composer */}
              {replying && (
                <div className="border-t border-border px-6 py-4 shrink-0 bg-background">
                  <Textarea
                    autoFocus
                    placeholder={`Reply to ${selected.contact}...`}
                    className="min-h-[100px] resize-none text-[13px] border-border"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) sendReply()
                    }}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[11px] text-muted-foreground">⌘↵ to send</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => { setReplying(false); setReplyText("") }}>
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="h-7 text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={sendReply}
                        disabled={!replyText.trim()}
                      >
                        <Send className="h-3 w-3" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <svg className="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">Select a message</p>
                <p className="text-xs text-muted-foreground mt-0.5">Choose a thread from the list to read it here</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="mt-1 gap-1.5 text-xs"
                onClick={() => setComposing(true)}
              >
                <Pencil className="h-3 w-3" />
                Compose
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Compose dialog */}
      <Dialog open={composing} onOpenChange={setComposing}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle className="text-sm font-medium">New message</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <span className="text-[12px] text-muted-foreground w-12 shrink-0">To</span>
              <Input
                value={compose.to}
                onChange={(e) => setCompose((c) => ({ ...c, to: e.target.value }))}
                placeholder="recipient@example.com"
                className="border-0 p-0 h-auto text-[13px] focus-visible:ring-0 shadow-none"
              />
            </div>
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <span className="text-[12px] text-muted-foreground w-12 shrink-0">Subject</span>
              <Input
                value={compose.subject}
                onChange={(e) => setCompose((c) => ({ ...c, subject: e.target.value }))}
                placeholder="Subject line"
                className="border-0 p-0 h-auto text-[13px] focus-visible:ring-0 shadow-none"
              />
            </div>
            <Textarea
              value={compose.body}
              onChange={(e) => setCompose((c) => ({ ...c, body: e.target.value }))}
              placeholder="Write your message..."
              className="min-h-[160px] resize-none border-0 p-0 text-[13px] focus-visible:ring-0 shadow-none"
            />
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border mt-2">
            <Button size="sm" variant="ghost" className="text-xs" onClick={() => setComposing(false)}>
              Discard
            </Button>
            <Button
              size="sm"
              className="gap-1.5 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={sendCompose}
              disabled={sending || !compose.to.trim() || !compose.subject.trim()}
            >
              <Send className="h-3 w-3" />
              {sending ? "Sending..." : "Send"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
