White-Label Portal Blueprint
Concept: Business-agnostic portal where customers and providers manage their relationship — bookings, documents, messages, invoices, tasks, and analytics. Every visual element theme-able per brand.

Architecture Decision
Layer	Use	Why
App scaffold	valerium-shadboard/full-kit/	Production Next.js 15, NextAuth, Prisma, i18n baked in
UI components	valerium-midday/packages/ui/	Most polished, animated, premium feel
Extra components	valerium/packages/ui/	192 components for edge cases
CRM patterns	valerium-crm/src/components/	Customer/deal/pipeline patterns
Directory-by-Directory Reference
1. APP SHELL & LAYOUT
Source: valerium-shadboard/full-kit/src/components/layout/


vertical-layout/     ← sidebar nav (default for portals)
horizontal-layout/   ← top nav alt (simpler businesses)
Source: valerium-shadboard/full-kit/src/app/[lang]/(dashboard-layout)/

This is your main shell. It wraps every authenticated page. Use the [lang] pattern even if you start with one language — white-label needs i18n.

What to copy:

The layout wrappers as-is
Sidebar component — replace hardcoded nav items with config-driven array (this is your white-label hook)
full-kit/src/configs/ — app-level config files, make one tenant.config.ts here
2. AUTHENTICATION
Source: valerium-shadboard/full-kit/src/components/auth/

Includes:

Login
Register/Signup
Password reset
Email verification
Source: valerium-midday/packages/ui/components/input-otp.tsx

OTP input for 2FA — premium touch, fintech-grade.

Source: valerium-shadboard/full-kit/src/app/api/auth/

NextAuth endpoints — keep them, they're wired to Prisma already.

White-label hook: Auth pages take a tenantConfig prop with logo, brand color, custom copy. One layout, infinite skins.

3. DASHBOARD / HOME
Source: valerium-midday/apps/dashboard/src/components/widgets/

Animated metric widgets — the best-looking pieces in the whole repo.

Source: valerium-midday/packages/ui/components/animations/

Use these on the dashboard home:


dashboard-animation.tsx          ← hero/welcome animation
burnrate-animation.tsx           ← any spend/usage metric
transaction-flow-animation.tsx   ← activity feed visual
widgets-animation.tsx            ← widget entrance animations
Source: valerium-midday/packages/ui/components/chart.tsx
Source: valerium-shadboard/full-kit → Recharts integration

Charts for revenue, usage, tickets, orders — whatever the business tracks.

Source: valerium/packages/ui/components/Cards/

Summary cards for KPIs at the top of dashboard.

4. CUSTOMER MANAGEMENT
Source: valerium-crm/src/components/ (entire folder)

This is your richest source for customer-facing features:

Contact list + detail views
Deal pipeline (adapt to "orders" or "projects" or "cases")
Activity timeline
Tags, status badges
Source: valerium/packages/ui/components/Data/

Tables, lists, data grids — use for the customer index page.

Source: valerium-shadboard/full-kit/src/components/ui/data-table/

Advanced data table with sorting, filtering, pagination — production-ready.

5. MESSAGING / INBOX
Source: valerium-midday/apps/dashboard/src/components/inbox/

Full inbox pattern — message threads, read/unread state, filters.

Source: valerium-midday/apps/dashboard/src/components/chat/

Real-time chat UI. Use for customer↔provider direct messaging.

Source: valerium-midday/packages/ui/components/email-tag-input.tsx

For composing messages to multiple recipients.

Source: valerium-midday/packages/ui/components/animations/inbox-match-animation.tsx

Premium empty-state animation for inbox.

6. DOCUMENTS / FILE VAULT
Source: valerium-midday/apps/dashboard/src/components/vault/

Secure document storage UI — upload, preview, organize.

Source: valerium-midday/packages/ui/components/animations/file-grid-animation.tsx

Premium empty-state / loading animation for file views.

Source: valerium-midday/packages/packages/documents/

Document handling logic — PDF generation, previews.

Source: valerium-midday/packages/ui/components/ → react-pdf integration

PDF viewer/generator for contracts, reports, invoices.

7. INVOICING & BILLING
Source: valerium-midday/apps/dashboard/src/components/ (invoice-related)

Source: valerium-midday/packages/invoice/

Complete invoice generation logic.

Source: valerium-midday/packages/ui/components/animations/invoice-payment-animation.tsx
Source: valerium-midday/packages/ui/components/animations/invoice-prompt-animation.tsx

Use these as loading/transition states on invoice screens — incredibly polished.

Source: valerium-midday/packages/ui/components/currency-input.tsx

Currency-formatted inputs for pricing fields.

Source: valerium-midday/packages/ui/components/plan-cards.tsx

Pricing/plan display cards — for subscription tier selection.

8. TASK / PROJECT TRACKING
Source: valerium-midday/apps/dashboard/src/components/tracker/

Time/activity tracker UI. Adapt to tasks, milestones, or project phases.

Source: valerium-crm/src/components/ → task management patterns

Source: valerium-shadboard/full-kit → FullCalendar integration

Calendar view for deadlines and scheduled work.

9. NOTIFICATIONS
Source: valerium-midday/apps/dashboard/src/components/notification-center/

Full notification center with categories, read state, preferences.

Source: valerium-midday/packages/notifications/

Backend notification service.

Source: valerium-midday/packages/ui/components/toast.tsx + toaster.tsx

In-app toast system — already wired to Sonner/Radix.

10. SEARCH
Source: valerium-midday/apps/dashboard/src/components/search/

Full global search component.

Source: valerium-midday/packages/ui/components/command.tsx

cmdk-based command palette — power-user feature, premium feel. Bind to ⌘K.

11. ONBOARDING
Source: valerium-midday/apps/dashboard/src/components/onboarding/

Multi-step onboarding flow. Adapt steps per tenant type.

Source: valerium-midday/packages/ui/components/animations/company-enrichment-animation.tsx

Use during "setting up your workspace" step — gorgeous.

12. FORMS (EVERYWHERE)
Source: valerium-midday/packages/ui/components/form.tsx

React-Hook-Form + Radix wrapper.

Source: valerium-midday/packages/ui/components/

Premium form elements:


input.tsx
textarea.tsx
select.tsx
combobox.tsx
combobox-dropdown.tsx
multiple-selector.tsx
date-range-picker.tsx
time-range-input.tsx
email-tag-input.tsx
currency-input.tsx
input-otp.tsx
quantity-input.tsx
Source: valerium-shadboard/full-kit/src/schemas/

Zod schemas — create one per feature entity (customer, invoice, project, etc.)

13. MODALS & SHEETS
Source: valerium-midday/apps/dashboard/src/components/sheets/

Slide-over panels — use for record detail views (customer profile, invoice detail, task detail). Keeps user in context.

Source: valerium-midday/apps/dashboard/src/components/modals/

Confirmation dialogs, quick-create flows.

Source: valerium-midday/packages/ui/components/dialog.tsx
Source: valerium-midday/packages/ui/components/drawer.tsx
Source: valerium-midday/packages/ui/components/sheet.tsx

14. RICH TEXT EDITOR
Source: valerium-midday/packages/ui/components/editor/

TipTap editor with:


editor/extentions/bubble-menu/     ← floating toolbar on text select
editor/extentions/slash-command/   ← /commands for inserting blocks
Use for: notes, message composition, document editing, internal wiki.

15. ANALYTICS / REPORTING
Source: valerium-midday/apps/dashboard/src/components/metrics/

Metric cards, trend lines, period comparisons.

Source: valerium-midday/packages/insights/

Analytics calculation logic.

Source: valerium-midday/packages/ui/components/animations/burnrate-animation.tsx
Source: valerium-midday/packages/ui/components/animations/customer-statement-animation.tsx

Premium data visualization animations.

16. WHITE-LABEL THEMING ENGINE
Source: valerium-midday/packages/ui/globals.css
Source: valerium-shadboard/full-kit/ → Tailwind config

This is the core white-label mechanism. CSS custom properties = swap entire brand with JSON:


// tenant.config.ts (new file you create)
export interface TenantConfig {
  brand: {
    name: string
    logo: string
    favicon: string
    primaryColor: string    // → --color-primary
    accentColor: string     // → --color-accent
    fontFamily: string      // → --font-sans
  }
  features: {
    invoicing: boolean
    chat: boolean
    vault: boolean
    tracker: boolean
    analytics: boolean
  }
  nav: NavItem[]           // drives sidebar from config
  labels: {                // rename everything per business
    customers: string      // "Clients" / "Patients" / "Guests"
    projects: string       // "Cases" / "Orders" / "Stays"
    providers: string      // "Staff" / "Therapists" / "Agents"
  }
}
Source: valerium-shadboard/full-kit/src/data/dictionaries/

i18n dictionaries — extend this to also hold tenant-specific copy.

17. NAVIGATION
Source: valerium-midday/apps/dashboard/src/components/ → sidebar patterns

Source: valerium-midday/packages/ui/components/navigation-menu.tsx
Source: valerium/packages/ui/components/Navigation/

Build nav from tenant.config.features so disabled features don't appear in sidebar.

18. SKELETON / LOADING STATES
Source: valerium-midday/packages/ui/components/skeleton.tsx
Source: valerium-midday/packages/ui/components/spinner.tsx
Source: valerium-midday/packages/ui/components/text-shimmer.tsx

text-shimmer.tsx — use for any AI-generating or loading text. Extremely polished.

19. PREMIUM INTERACTION COMPONENTS
Source: valerium-midday/packages/ui/components/submit-button-morph.tsx

Animated submit button: idle → loading → success. One component, zero extra code.

Source: valerium-midday/packages/ui/components/text-morph.tsx

Morphing text transitions — use for tab switches, state changes.

Source: valerium-midday/packages/ui/components/iphone-mock.tsx

Show mobile preview in onboarding or "invite your customers" screens.

20. BACKEND PACKAGES (BRING THESE)
Source: valerium-midday/packages/

Package	Use for
db/	Prisma schema — extend with your entities
supabase/	Auth + realtime
email/	Transactional emails
notifications/	In-app + push
encryption/	Sensitive data (PII, documents)
invoice/	PDF invoice generation
documents/	File handling
jobs/ + job-client/	Async work (emails, PDF gen, notifications)
events/	Event bus for cross-module comms
logger/	Structured logging
health/	Uptime checks
trpc/	Type-safe API layer
Build Order

Phase 1 — Foundation
  valerium-shadboard/full-kit/ → scaffold new repo
  Add tenant.config.ts
  Wire CSS variables to config
  Build layout shell with config-driven nav

Phase 2 — Auth & Onboarding
  valerium-shadboard auth components
  valerium-midday onboarding flow
  OTP from valerium-midday/packages/ui

Phase 3 — Core Portal Features
  Dashboard (midday widgets + animations)
  Customer management (crm + data-table)
  Messaging/inbox (midday inbox + chat)
  Documents vault (midday vault)

Phase 4 — Business Logic
  Invoicing (midday invoice package)
  Task tracking (midday tracker)
  Calendar (shadboard FullCalendar)
  Rich text editor (midday TipTap)

Phase 5 — Power Features
  Command palette (cmdk)
  Notification center
  Global search
  Analytics/reporting

Phase 6 — White-Label Polish
  Theme switcher UI
  Tenant onboarding flow
  Feature flag UI per plan
  Custom domain support
Production Stack (new repo)

Framework:     Next.js 15 (App Router)
Runtime:       Bun
UI:            Radix UI + Tailwind CSS 4
Components:    shadcn/ui pattern (copy-paste from midday)
Animations:    Framer Motion
Forms:         React-Hook-Form + Zod
DB:            Prisma + PostgreSQL (Supabase)
Auth:          NextAuth v4 (or Supabase Auth)
API:           tRPC
State:         Zustand
Editor:        TipTap
Charts:        Recharts
Jobs:          BullMQ + Trigger.dev
Email:         React Email
Icons:         Lucide React
Linter:        Biome
Bottom line: valerium-midday is your component goldmine — animations and premium UI live there. valerium-shadboard/full-kit is your app skeleton. valerium-crm gives you the customer/deal patterns. valerium's 192 components fill any gap. Copy what you need, wire it all to tenant.config.ts, and every business just swaps that config.




APP SHELL


valerium-shadboard/full-kit/src/components/layout/
valerium-shadboard/full-kit/src/app/[lang]/(dashboard-layout)/
valerium-shadboard/full-kit/src/configs/

AUTH

valerium-shadboard/full-kit/src/components/auth/
valerium-shadboard/full-kit/src/app/api/auth/
valerium-shadboard/full-kit/src/schemas/

DASHBOARD & WIDGETS

valerium-midday/apps/dashboard/src/components/widgets/
valerium-midday/packages/ui/components/animations/
valerium-midday/packages/ui/components/chart.tsx

CUSTOMER MANAGEMENT

valerium-crm/src/components/
valerium/packages/ui/components/Data/
valerium-shadboard/full-kit/src/components/ui/data-table/

MESSAGING / INBOX

valerium-midday/apps/dashboard/src/components/inbox/
valerium-midday/apps/dashboard/src/components/chat/
FILE VAULT / DOCUMENTS


valerium-midday/apps/dashboard/src/components/vault/
valerium-midday/packages/documents/
INVOICING


valerium-midday/packages/invoice/
valerium-midday/packages/ui/components/plan-cards.tsx
valerium-midday/packages/ui/components/currency-input.tsx

TASK / TIME TRACKER

valerium-midday/apps/dashboard/src/components/tracker/

NOTIFICATIONS

valerium-midday/apps/dashboard/src/components/notification-center/
valerium-midday/packages/notifications/
valerium-midday/packages/ui/components/toast.tsx
valerium-midday/packages/ui/components/toaster.tsx

SEARCH & COMMAND PALETTE

valerium-midday/apps/dashboard/src/components/search/
valerium-midday/packages/ui/components/command.tsx

ONBOARDING

valerium-midday/apps/dashboard/src/components/onboarding/

FORMS

valerium-midday/packages/ui/components/form.tsx
valerium-midday/packages/ui/components/combobox.tsx
valerium-midday/packages/ui/components/combobox-dropdown.tsx
valerium-midday/packages/ui/components/multiple-selector.tsx
valerium-midday/packages/ui/components/date-range-picker.tsx
valerium-midday/packages/ui/components/time-range-input.tsx
valerium-midday/packages/ui/components/email-tag-input.tsx
valerium-midday/packages/ui/components/input-otp.tsx
valerium-midday/packages/ui/components/quantity-input.tsx

MODALS & SHEETS

valerium-midday/apps/dashboard/src/components/sheets/
valerium-midday/apps/dashboard/src/components/modals/
valerium-midday/packages/ui/components/dialog.tsx
valerium-midday/packages/ui/components/drawer.tsx
valerium-midday/packages/ui/components/sheet.tsx

RICH TEXT EDITOR

valerium-midday/packages/ui/components/editor/

ANALYTICS

valerium-midday/apps/dashboard/src/components/metrics/
valerium-midday/packages/insights/

PREMIUM UI TOUCHES

valerium-midday/packages/ui/components/submit-button-morph.tsx
valerium-midday/packages/ui/components/text-morph.tsx
valerium-midday/packages/ui/components/text-shimmer.tsx
valerium-midday/packages/ui/components/skeleton.tsx
valerium-midday/packages/ui/components/iphone-mock.tsx

BACKEND PACKAGES

valerium-midday/packages/db/
valerium-midday/packages/supabase/
valerium-midday/packages/email/
valerium-midday/packages/encryption/
valerium-midday/packages/jobs/
valerium-midday/packages/job-client/
valerium-midday/packages/events/
valerium-midday/packages/logger/
valerium-midday/packages/trpc/

THEMING / GLOBALS

valerium-midday/packages/ui/globals.css
valerium-midday/packages/ui/tailwind.config.ts
valerium-shadboard/full-kit/src/data/dicti