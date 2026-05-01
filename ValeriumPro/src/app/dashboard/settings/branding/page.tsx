"use client"

import { useState } from "react"
import { Palette, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { SubmitButtonMorph } from "@/components/ui/submit-button-morph"
import { useTenant } from "@/hooks/use-tenant"

const PRESET_COLORS = [
  { name: "Indigo", hsl: "221 83% 53%" },
  { name: "Violet", hsl: "262 83% 58%" },
  { name: "Rose", hsl: "347 77% 50%" },
  { name: "Emerald", hsl: "142 71% 45%" },
  { name: "Amber", hsl: "38 92% 50%" },
  { name: "Cyan", hsl: "189 94% 43%" },
  { name: "Slate", hsl: "215 25% 27%" },
  { name: "Orange", hsl: "25 95% 53%" },
]

export default function BrandingPage() {
  const { config, updateBrand } = useTenant()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [localBrand, setLocalBrand] = useState(config.brand)

  function handleSave() {
    setSaving(true)
    setTimeout(() => {
      updateBrand(localBrand)
      setSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 800)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Branding</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Customize how your portal looks for all users
        </p>
      </div>

      {/* Live preview */}
      <Card className="border-brand/20 bg-brand/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Live Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border bg-card p-4 flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
              style={{ background: `hsl(${localBrand.primaryHsl})` }}
            >
              <Zap className="h-4 w-4" />
            </div>
            <span className="font-semibold">{localBrand.name || "Your Brand"}</span>
            <div
              className="ml-auto rounded-md px-3 py-1.5 text-xs font-medium text-white"
              style={{ background: `hsl(${localBrand.primaryHsl})` }}
            >
              Button
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Identity</CardTitle>
          <CardDescription>Name and logo shown throughout the portal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Brand name</Label>
            <Input
              value={localBrand.name}
              onChange={(e) => setLocalBrand((b) => ({ ...b, name: e.target.value }))}
              placeholder="Your Company"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Logo URL</Label>
            <Input
              value={localBrand.logo ?? ""}
              onChange={(e) => setLocalBrand((b) => ({ ...b, logo: e.target.value || null }))}
              placeholder="https://cdn.yoursite.com/logo.svg"
            />
            <p className="text-xs text-muted-foreground">SVG or PNG recommended. Leave empty to use the default icon.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brand Color</CardTitle>
          <CardDescription>Primary color used for buttons, links, and accents</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {PRESET_COLORS.map((c) => (
              <button
                key={c.name}
                className="group flex flex-col items-center gap-1"
                onClick={() => setLocalBrand((b) => ({ ...b, primaryHsl: c.hsl }))}
              >
                <span
                  className="h-8 w-8 rounded-full ring-2 ring-offset-2 ring-transparent group-hover:ring-foreground/30 transition-all"
                  style={{
                    background: `hsl(${c.hsl})`,
                    ...(localBrand.primaryHsl === c.hsl
                      ? { outline: "2px solid hsl(var(--foreground))", outlineOffset: "2px" }
                      : {}),
                  }}
                />
                <span className="text-[10px] text-muted-foreground">{c.name}</span>
              </button>
            ))}
          </div>

          <Separator />

          <div className="space-y-1.5">
            <Label>Custom HSL value</Label>
            <Input
              value={localBrand.primaryHsl}
              onChange={(e) => setLocalBrand((b) => ({ ...b, primaryHsl: e.target.value }))}
              placeholder="221 83% 53%"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">Format: hue saturation% lightness% (e.g. 221 83% 53%)</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Border Radius</CardTitle>
          <CardDescription>Controls the roundness of all UI elements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Slider
              min={0}
              max={1.5}
              step={0.125}
              value={[parseFloat(localBrand.radius)]}
              onValueChange={([v]) => setLocalBrand((b) => ({ ...b, radius: `${v}rem` }))}
              className="flex-1"
            />
            <span className="text-sm font-mono w-16 text-right">{localBrand.radius}</span>
          </div>
          <div className="flex gap-3">
            {["0rem", "0.25rem", "0.5rem", "0.75rem", "1rem"].map((r) => (
              <button
                key={r}
                className="flex-1 border bg-muted h-8 transition-all hover:border-brand"
                style={{
                  borderRadius: r,
                  ...(localBrand.radius === r ? { borderColor: "hsl(var(--brand))", background: "hsl(var(--brand)/0.08)" } : {}),
                }}
                onClick={() => setLocalBrand((b) => ({ ...b, radius: r }))}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <SubmitButtonMorph
        className="bg-brand hover:bg-brand/90 text-brand-foreground"
        isSubmitting={saving}
        completed={saved}
        onClick={handleSave}
      >
        {saved ? "Saved!" : "Save changes"}
      </SubmitButtonMorph>
    </div>
  )
}
