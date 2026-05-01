"use client"

import { useState } from "react"
import { UserPlus, MoreHorizontal, Trash2, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getInitials } from "@/lib/utils"
import type { Role } from "@/types"

const roleConfig: Record<Role, { label: string; className: string }> = {
  OWNER:  { label: "Owner",  className: "bg-primary/10 text-primary" },
  ADMIN:  { label: "Admin",  className: "bg-purple-500/10 text-purple-400" },
  MEMBER: { label: "Member", className: "bg-muted text-muted-foreground" },
  VIEWER: { label: "Viewer", className: "bg-muted text-muted-foreground" },
}

const ROLES: Role[] = ["ADMIN", "MEMBER", "VIEWER"]

type Member = {
  id: string
  name: string
  email: string
  role: Role
  joinedAt: string
}

type Invite = {
  id: string
  email: string
  role: Role
  sentAt: string
}

const INITIAL_MEMBERS: Member[] = [
  { id: "1", name: "Bryan Parreira",  email: "bryan@company.com",  role: "OWNER",  joinedAt: "Jan 2024" },
  { id: "2", name: "Sarah Chen",      email: "sarah@company.com",  role: "ADMIN",  joinedAt: "Feb 2024" },
  { id: "3", name: "James Kirk",      email: "james@company.com",  role: "MEMBER", joinedAt: "Mar 2024" },
  { id: "4", name: "Lena Müller",     email: "lena@company.com",   role: "MEMBER", joinedAt: "Apr 2024" },
  { id: "5", name: "Ahmed Al-Rashid", email: "ahmed@company.com",  role: "VIEWER", joinedAt: "Apr 2024" },
]

const INITIAL_INVITES: Invite[] = [
  { id: "i1", email: "new@partner.com", role: "MEMBER", sentAt: "Apr 25, 2026" },
]

export function TeamView() {
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS)
  const [invites, setInvites] = useState<Invite[]>(INITIAL_INVITES)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<Role>("MEMBER")
  const [sending, setSending] = useState(false)
  const [removeTarget, setRemoveTarget] = useState<Member | null>(null)
  const [revokeTarget, setRevokeTarget] = useState<Invite | null>(null)

  function changeRole(id: string, role: Role) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)))
  }

  function removeMember() {
    if (!removeTarget) return
    setMembers((prev) => prev.filter((m) => m.id !== removeTarget.id))
    setRemoveTarget(null)
  }

  function sendInvite() {
    if (!inviteEmail.trim()) return
    setSending(true)
    setTimeout(() => {
      setInvites((prev) => [
        ...prev,
        {
          id: `i-${Date.now()}`,
          email: inviteEmail.trim(),
          role: inviteRole,
          sentAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        },
      ])
      setInviteEmail("")
      setInviteRole("MEMBER")
      setSending(false)
      setInviteOpen(false)
    }, 600)
  }

  function revokeInvite() {
    if (!revokeTarget) return
    setInvites((prev) => prev.filter((i) => i.id !== revokeTarget.id))
    setRevokeTarget(null)
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* Members section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium">Members</h2>
              <span className="text-xs text-muted-foreground">({members.length})</span>
            </div>
            <Button
              size="sm"
              className="gap-1.5 h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => setInviteOpen(true)}
            >
              <UserPlus className="h-3.5 w-3.5" />
              Invite member
            </Button>
          </div>

          <div className="border border-border bg-card overflow-hidden divide-y divide-border">
            {members.map((m) => {
              const rc = roleConfig[m.role]
              const isOwner = m.role === "OWNER"
              return (
                <div key={m.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#fafafa] dark:hover:bg-[#0d0d0d] transition-colors">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-[#f0f0f0] dark:bg-[#1a1a1a] text-foreground text-[10px] font-bold rounded-full">
                      {getInitials(m.name)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium truncate">{m.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{m.email}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] text-muted-foreground hidden sm:block">
                      Since {m.joinedAt}
                    </span>

                    {/* Role badge / dropdown */}
                    {isOwner ? (
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${rc.className}`}>
                        {rc.label}
                      </span>
                    ) : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className={`rounded-full px-2 py-0.5 text-[11px] font-medium cursor-pointer hover:opacity-80 transition-opacity ${rc.className}`}>
                            {rc.label} ▾
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                          {ROLES.map((r) => (
                            <DropdownMenuItem
                              key={r}
                              className={`text-xs ${m.role === r ? "font-semibold" : ""}`}
                              onClick={() => changeRole(m.id, r)}
                            >
                              {roleConfig[r].label}
                              {m.role === r && <span className="ml-auto">✓</span>}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-xs text-destructive focus:text-destructive"
                            onClick={() => setRemoveTarget(m)}
                          >
                            Remove member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pending invites */}
        {invites.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-medium">Pending invites</h2>
              <span className="text-xs text-muted-foreground">({invites.length})</span>
            </div>
            <div className="border border-border bg-card overflow-hidden divide-y divide-border">
              {invites.map((inv) => {
                const rc = roleConfig[inv.role]
                return (
                  <div key={inv.id} className="flex items-center gap-3 px-4 py-3.5 hover:bg-[#fafafa] dark:hover:bg-[#0d0d0d] transition-colors">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-foreground truncate">{inv.email}</p>
                      <p className="text-[11px] text-muted-foreground">Invited {inv.sentAt}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${rc.className}`}>
                        {rc.label}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-muted-foreground hover:text-destructive"
                        onClick={() => setRevokeTarget(inv)}
                      >
                        Revoke
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Invite dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="sm:max-w-[440px]">
          <DialogHeader>
            <DialogTitle className="text-sm font-medium">Invite team member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <Label className="text-xs">Email address</Label>
              <Input
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendInvite()}
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Role</Label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as Role)}
                className="flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>{roleConfig[r].label}</option>
                ))}
              </select>
              <p className="text-[11px] text-muted-foreground">
                {inviteRole === "ADMIN" && "Can manage team members, billing, and all settings."}
                {inviteRole === "MEMBER" && "Can view and edit most content but cannot change settings."}
                {inviteRole === "VIEWER" && "Read-only access. Cannot create or edit content."}
              </p>
            </div>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="ghost" size="sm" className="text-xs" onClick={() => setInviteOpen(false)}>
              Cancel
            </Button>
            <Button
              size="sm"
              className="text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={sendInvite}
              disabled={sending || !inviteEmail.trim()}
            >
              {sending ? "Sending..." : "Send invite"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove member confirmation */}
      <AlertDialog open={!!removeTarget} onOpenChange={(o) => !o && setRemoveTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {removeTarget?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              {removeTarget?.name} will lose access to this team immediately. They can be re-invited later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={removeMember}
            >
              Remove member
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Revoke invite confirmation */}
      <AlertDialog open={!!revokeTarget} onOpenChange={(o) => !o && setRevokeTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke invite?</AlertDialogTitle>
            <AlertDialogDescription>
              The invite sent to <strong>{revokeTarget?.email}</strong> will be cancelled. They will not be able to join this team using the invite link.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={revokeInvite}
            >
              Revoke invite
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
