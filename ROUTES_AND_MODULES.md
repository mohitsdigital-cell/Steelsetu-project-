# ROUTES_AND_MODULES

Route inventory for Steelsetu (App Router, `src/app/`). Route patterns are planned per PRD §11 — build per phase, not all at once.

## Phase 0 (Core)

| Route | Type | Purpose |
|---|---|---|
| `/` | Public | Home: search, categories, featured suppliers, RFQ CTA |
| `/suppliers` | Public | Supplier directory with filters, pagination |
| `/suppliers/[slug]` | Public | Supplier profile, verification scope labels, WhatsApp CTA |
| `/brands` | Public | Brand directory |
| `/brands/[slug]` | Public | Brand page with product mapping |
| `/products` | Public | Product catalogue |
| `/products/[slug]` | Public | Product page, specs, RFQ CTA |
| `/categories/[slug]` | Public | Category listing |
| `/rates` | Public | Indicative rates index (honest labelling) |
| `/rates/[product-or-region]` | Public | Rate detail |
| `/calculators` | Public | Calculator index (TMT weight etc. phased) |
| `/calculators/[slug]` | Public | Individual calculator |
| `/knowledge` , `/knowledge/[slug]` | Public | Guides |
| `/rfq` | Public+Auth | RFQ submission (auth for posting) |
| `/about`, `/contact` | Public | Company pages |
| `/terms`, `/privacy`, `/disclaimer`, `/grievance`, `/community-guidelines`, `/review-policy` | Public | Legal & policy |
| `/login`, `/register`, `/verify` | Auth | Authentication |
| `/account` (+ `/profile`, `/business`, `/security`) | Auth | User account |
| `/dashboard` (+ `/rfqs`, `/quotations`, `/products`, `/notifications`) | Auth | Role-aware dashboard |
| `/trade-desk` (+ `/leads`, `/rfqs`, `/quotations`, `/follow-ups`) | Auth | Singhi Trade Desk (tenant-isolated) |
| `/admin` (+ users, businesses, verification, products, brands, categories, rates, rfqs, content, seo, analytics, feature-flags, audit-logs, settings) | Admin | Admin operations, permissioned |

## Phase 1 (Community)

`/community`, `/community/questions`, `/community/questions/[slug]`, `/community/polls`, `/community/events`, `/community/rooms/[slug]` + `/dashboard/community`, `/admin/community`, `/admin/moderation`.

## Phase 2 (Trust)

`/trust`, `/trust/[entity-type]/[slug]` + `/dashboard/reviews`, `/admin/trust`, `/admin/private-reports`. All behind the Trust feature flag.

## Route Rules

- Middleware protects authenticated/admin routes **server-side**; hiding buttons is never access control.
- Public pages server-rendered for SEO; canonical URLs; correct 404s via `not-found.tsx`.
- Shareable, filterable search URLs (query params preserved).
- `/blog`, `/blog/[slug]` are content module routes (Phase 3+ content strategy).

## Module Mapping (see ARCHITECTURE.md)

| Route prefix | DAL module |
|---|---|
| `/suppliers`, `/brands`, `/products`, `/categories` | directory.ts, products.ts |
| `/rates` | rates.ts |
| `/calculators` | calculators (pure functions) |
| `/rfq`, `/dashboard/rfqs` | rfqs.ts |
| `/trade-desk` | leads.ts |
| `/community` | community.ts |
| `/trust` | trust.ts |
| `/admin` | admin + audit_logs |
