# ARCHITECTURE

## Architecture Style

**Modular monolith** — one Next.js application, logically separated modules, no premature microservices (PRD §28).

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | Next.js App Router, React, TypeScript | Server-render public pages for SEO |
| Styling | Tailwind CSS | Mobile-first; tokens defined in tailwind.config |
| Backend | Next.js Route Handlers + Server Actions behind a centralised Data Access Layer (DAL) | Zod validation server-side |
| Database | PostgreSQL (Supabase-compatible) | Migrations only; RLS enabled on all exposed tables |
| Auth | Supabase Auth | Email/phone verification, MFA for staff, revocable sessions |
| Storage | Supabase Storage | Private buckets for verification docs and Trust evidence; signed expiring URLs |
| Hosting | Vercel | PWA-friendly |
| CI | GitHub Actions | Type-check, lint, build on PRs |
| Monitoring | Sentry + privacy-conscious analytics | See SECURITY_AND_PRIVACY.md |

## Logical Modules (code organisation)

```
src/
  app/                 # routes (App Router) — see ROUTES_AND_MODULES.md
  components/          # reusable UI components (accessible, mobile-first)
  lib/
    db/                # Data Access Layer: typed queries, one module per domain
      directory.ts
      products.ts
      rfqs.ts
      rates.ts
      community.ts
      trust.ts
      leads.ts
    auth/              # session, role & capability checks
    validation/        # Zod schemas shared by server actions and forms
    utils/
  middleware.ts        # route protection (server-side, never UI-hiding)
```

## Module Boundaries

1. Identity & access — users, profiles, roles, capabilities, business membership.
2. Business directory — businesses, verification records, memberships.
3. Brands & products — brands, categories, products, variants, brand_relationships, supplier_products.
4. Search — PostgreSQL full-text search (pg_trgm + tsvector) with alias mapping.
5. Rates — rate_observations with honest labelling.
6. Calculators — pure, tested calculation functions + UI wrappers.
7. RFQ & quotations — rfqs, quotations, statuses, comparisons.
8. Trade Desk — trade_leads, lead_activities, follow-ups.
9. Community — rooms, posts, questions/answers, polls, events.
10. Trust & moderation — reviews, replies, appeals, private reports, conduct notes, moderation cases.
11. Content & SEO — content_articles, metadata, sitemap generation.
12. Notifications — notifications, preferences.
13. Admin & audit — audit_logs, feature flags, permissions.

## Key Architecture Rules

- Server-side authorisation on **every** sensitive operation; UI hiding is never a control.
- Business-owned records carry a `business_id` tenant relationship; isolation enforced in RLS and DAL.
- Service-role keys never reach the client bundle; only the server uses them.
- One integrated website; Trust lives at `/trust` inside steelsetu.com (feature-flagged).
- No dedicated search service, Redis, or job queue until measured need (PRD §27).
- User-generated content rendered safely (sanitised, no raw HTML injection).

## Future Migration Path

Clear service boundaries in the DAL allow extraction of modules (e.g., search, notifications) into separate services later **without** restructuring the monolith now (Strangler Fig readiness).
