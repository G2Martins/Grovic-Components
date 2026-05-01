"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SubmitButtonMorph } from "@/components/ui/submit-button-morph"

const categories = [
  {
    title: "Activity",
    items: [
      { id: "new_message", label: "New message received", defaultOn: true },
      { id: "task_assigned", label: "Task assigned to you", defaultOn: true },
      { id: "invoice_viewed", label: "Invoice viewed by customer", defaultOn: true },
      { id: "invoice_paid", label: "Invoice paid", defaultOn: true },
    ],
  },
  {
    title: "Reminders",
    items: [
      { id: "overdue_invoice", label: "Overdue invoice reminder", defaultOn: true },
      { id: "project_due", label: "Project deadline approaching", defaultOn: false },
      { id: "task_due", label: "Task due soon", defaultOn: false },
    ],
  },
  {
    title: "Account",
    items: [
      { id: "new_team_member", label: "New team member joined", defaultOn: true },
      { id: "security_alert", label: "Security alerts", defaultOn: true },
      { id: "plan_changes", label: "Plan and billing updates", defaultOn: true },
    ],
  },
]

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>(
    Object.fromEntries(categories.flatMap((c) => c.items.map((i) => [i.id, i.defaultOn])))
  )
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function toggle(id: string) {
    setPrefs((p) => ({ ...p, [id]: !p[id] }))
  }

  function handleSave() {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 600)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Choose which events trigger notifications
        </p>
      </div>

      {categories.map((cat, ci) => (
        <Card key={cat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">{cat.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 divide-y">
            {cat.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3">
                <Label htmlFor={item.id} className="text-sm cursor-pointer">
                  {item.label}
                </Label>
                <Switch
                  id={item.id}
                  checked={prefs[item.id]}
                  onCheckedChange={() => toggle(item.id)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <SubmitButtonMorph
        className="bg-brand hover:bg-brand/90 text-brand-foreground"
        isSubmitting={saving}
        completed={saved}
        onClick={handleSave}
      >
        {saved ? "Saved!" : "Save preferences"}
      </SubmitButtonMorph>
    </div>
  )
}
