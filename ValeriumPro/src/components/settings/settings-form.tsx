"use client"

import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { SubmitButtonMorph } from "@/components/ui/submit-button-morph"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getInitials } from "@/lib/utils"

const TIMEZONES = [
  "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "America/Sao_Paulo", "Europe/London", "Europe/Paris", "Europe/Berlin",
  "Asia/Tokyo", "Asia/Singapore", "Australia/Sydney", "UTC",
]

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CHF", "BRL"]

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
]

function Row({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between py-6 border-b border-border last:border-0">
      <div className="min-w-[220px]">
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{description}</p>}
      </div>
      <div className="flex-1 max-w-[360px]">{children}</div>
    </div>
  )
}

export function SettingsForm() {
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    companyName: "ValeriumPro",
    email: "bryan@webvisionrank.com",
    website: "https://webvisionrank.com",
    country: "United States",
    timezone: "America/New_York",
    currency: "USD",
    fiscalYearEnd: "December",
  })
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function set<K extends keyof typeof form>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }))
  }

  function handleLogoFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setLogoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  function handleSave() {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    }, 800)
  }

  return (
    <div>
      {/* Logo */}
      <Row label="Company Logo" description="Shown in invoices, portals, and client-facing pages.">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 border border-border flex items-center justify-center bg-muted overflow-hidden shrink-0">
            {logoPreview ? (
              <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-bold text-foreground">{getInitials(form.companyName)}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs h-8"
              onClick={() => fileRef.current?.click()}
            >
              Upload logo
            </Button>
            {logoPreview && (
              <Button
                size="sm"
                variant="ghost"
                className="text-xs h-8 text-muted-foreground"
                onClick={() => { setLogoPreview(null); if (fileRef.current) fileRef.current.value = "" }}
              >
                Remove
              </Button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoFile} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">PNG, JPG or SVG. Max 2MB.</p>
      </Row>

      {/* Company Name */}
      <Row label="Company Name" description="Legal name used on invoices and documents.">
        <Input value={form.companyName} onChange={set("companyName")} placeholder="Acme Inc." />
      </Row>

      {/* Email */}
      <Row label="Email" description="Used for customer communication and invoices.">
        <Input type="email" value={form.email} onChange={set("email")} placeholder="hello@company.com" />
      </Row>

      {/* Website */}
      <Row label="Website">
        <Input value={form.website} onChange={set("website")} placeholder="https://yoursite.com" />
      </Row>

      {/* Country */}
      <Row label="Country">
        <Input value={form.country} onChange={set("country")} placeholder="United States" />
      </Row>

      {/* Timezone */}
      <Row label="Timezone">
        <select
          value={form.timezone}
          onChange={set("timezone")}
          className="flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </Row>

      {/* Base Currency */}
      <Row label="Base Currency" description="Default currency for invoices and reports.">
        <select
          value={form.currency}
          onChange={set("currency")}
          className="flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Row>

      {/* Fiscal Year End */}
      <Row label="Fiscal Year End" description="Month your financial year ends.">
        <select
          value={form.fiscalYearEnd}
          onChange={set("fiscalYearEnd")}
          className="flex h-9 w-full border border-input bg-transparent px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {MONTHS.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </Row>

      {/* Save */}
      <div className="py-6 border-b border-border">
        <SubmitButtonMorph
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          isSubmitting={saving}
          completed={saved}
          onClick={handleSave}
        >
          {saved ? "Saved!" : "Save changes"}
        </SubmitButtonMorph>
      </div>

      {/* Danger zone */}
      <div className="py-8">
        <p className="text-sm font-medium mb-1">Danger zone</p>
        <p className="text-xs text-muted-foreground mb-4 max-w-sm">
          Permanently delete this team and all associated data including invoices, customers, and documents. This action cannot be undone.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="text-xs h-8">
              Delete team
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete team permanently?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <strong>{form.companyName}</strong> and all associated data — invoices, customers, documents, and team members. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete team
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
