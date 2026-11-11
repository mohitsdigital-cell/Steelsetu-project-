# PROJECT_OVERVIEW

## A. Existing Architecture

The GitHub repository `mohitsdigital-cell/Steelsetu-project-` was **empty** at the time of the Phase 0 audit (11 November 2026).

- No application code.
- No package.json, no dependency manifest.
- No branches with content, no tags, no releases.
- Default branch `main` existed in name only (GitHub held the repository with zero commits).

**Audit conclusion:** This is a from-scratch build, not a repair of an existing application. The PRD v5.0 recommendation to "reuse the existing repository's working technology" resolves to: **implement the recommended stack from the PRD** (Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL/Supabase), since no existing working technology exists to preserve.

## B. Existing Route Inventory

None. The following public, authenticated, and admin route patterns are planned per PRD v5.0 and will be implemented in phases (see `IMPLEMENTATION_ROADMAP.md`):

- Public: `/`, `/suppliers`, `/brands`, `/products`, `/categories`, `/rates`, `/calculators`, `/knowledge`, `/blog`, `/trust`, `/community`, `/rfq`, `/about`, `/contact`, legal pages.
- Authenticated: `/login`, `/register`, `/account`, `/dashboard`, `/trade-desk` and subroutes.
- Admin: `/admin` and subroutes.

## C. Authentication and Test-Account Status

Not present. To be implemented in Phase 0 using Supabase Auth (or equivalent managed auth) with:
- Email/phone verification.
- Secure sessions, session revocation.
- MFA for privileged staff accounts.
- Documented test accounts for buyer and supplier roles (see `TEST_PLAN.md`).

## D. Search and Indexing Status (TMT visibility)

Not present. Phase 0 will build PostgreSQL full-text search with product aliases and category mappings so that core products (TMT bars, GI/GP sheets, PPGL profiles, coils, roofing) are discoverable by name, alias, and common spelling variations.

## E. RFQ / Post Requirement Flow Status

Not present. Phase 0 will implement the core RFQ flow: structured submission with reference ID, success confirmation, duplicate-submission protection, and moderation-ready status model.

## F. Browse Supplier Flow Status

Not present. Phase 0 will implement supplier directory pages, filters (city, state, product, business type, verification status), pagination, empty states, and profile-to-enquiry CTAs.

## G. Product and Brand Mapping Status

Not present. Data model will separate:
- `brands` (manufacturer/brand entities).
- `products` (catalogue items with structured fields).
- `supplier_products` (a supplier listing/stocking a product — does NOT imply brand authorisation).
- `brand_relationships` (evidenced relationships with type and verification status).

Brand integrity rule: never claim ownership, manufacture, exclusive distribution, or authorisation without founder-provided evidence and approval.

## H. Indicative Rate Implementation Status

Not present. Rates module will follow the PRD rules: every rate record carries product, grade/variant, region, unit, date observed, source type, tax/freight inclusion status, indicative status, last-updated time, and the standard disclaimer. No rate will ever be labelled "live" without a genuine live data source.

## I. 404 and Error Page Status

Not present. Phase 0 ships `not-found.tsx`, `error.tsx`, and `global-error.tsx` for the Next.js App Router, returning correct HTTP status codes.

## J. Mobile Responsiveness

Not present. Mobile-first design per PRD Part L (palette: Steel Blue #4682B4, Deep Navy #172B3A, Grey #808080, Background #F4F6F8, White, Charcoal #202A33).

## K. Security and Access-Control Risks (starting state)

No attack surface exists yet, but design-level commitments for the new codebase:
- Server-side authorisation on every sensitive operation (never UI-hiding).
- RLS on all exposed tables if Supabase is used; service-role keys server-only.
- No sensitive information in logs; secret management via environment variables.
- Private storage for verification documents and Trust evidence with signed, expiring URLs.

## L. Database and Migration Risks

No database exists yet. All schema changes will use migrations only (no undocumented production edits). Backup/restore plan required before any production migration.

## M. Missing Automated Tests

All tests are to be added alongside features per `TEST_PLAN.md`: auth, search, RFQ, community, trust, security isolation, and reliability tests.

## N. Prioritised Blocker List

Since the codebase is empty, the "blockers" are build tasks rather than defects. Priority order for Phase 0 (per PRD master prompt §5):

| # | Task | Priority | Risk |
|---|------|----------|------|
| 1 | Initialize Next.js + TypeScript + Tailwind project, lint/type/build pipeline | Critical | Low |
| 2 | Authentication and reliable login + documented test accounts | Critical | Medium |
| 3 | Database schema (core entities) + migrations + RLS policies | Critical | Medium |
| 4 | Search indexing and TMT visibility | Critical | Medium |
| 5 | RFQ/Post Requirement flow (submit → reference → confirm → supplier response) | Critical | Medium |
| 6 | Browse Supplier flow (directory, filters, profile pages) | Critical | Medium |
| 7 | Product catalogue + product-to-brand mapping | Critical | Medium |
| 8 | 404/error pages and route wiring | High | Low |
| 9 | Indicative rates module with disclaimers and honest labelling | High | Medium |
| 10 | Mobile responsiveness across core pages | High | Low |
| 11 | Privacy, terms, and grievance pages | High | Low |
| 12 | Core analytics + error monitoring (Sentry) wiring | Medium | Low |

## O. Recommended Phase 0 Implementation Plan

### Sprint 0.1 — Foundation (Week 1)
1. Next.js App Router scaffold with TypeScript, ESLint, Tailwind, design tokens.
2. Layout, header/footer navigation, home page sections.
3. Legal pages: Privacy, Terms, Disclaimer, Community Guidelines skeleton.
4. Error pages (404, 500, global error boundary).
5. `DATABASE_SCHEMA.md` v0 draft of core entities.

### Sprint 0.2 — Data & Identity (Week 2)
1. Supabase project setup (or managed PostgreSQL), migrations framework.
2. Core tables: users/profiles, businesses, memberships, verification records, brands, categories, products, supplier_products, rfqs, quotations.
3. Supabase Auth integration; sessions; seed test accounts (buyer, supplier, admin) documented in `TEST_PLAN.md`.
4. RLS policies for tenant isolation (business-owned records).

### Sprint 0.3 — Directory & Discovery (Week 3)
1. Suppliers directory page with filters, pagination, empty states.
2. Supplier profile pages with verification-scope labels, WhatsApp CTA.
3. Product catalogue pages with category navigation.
4. Product-to-brand mapping display (relationship type, verified date).
5. PostgreSQL full-text search across suppliers, products, brands, categories with alias support (TMT, "saria", spelling variants).

### Sprint 0.4 — RFQ & Rates (Week 4)
1. RFQ submission flow (structured form, validation, reference ID, confirmation).
2. Duplicate-submission protection (idempotency).
3. Supplier quotation response flow with structured fields.
4. RFQ statuses and WhatsApp sharing with prefilled message and reference ID.
5. Indicative rates page structure with per-record labelling and disclaimer.

**Phase 0 exit criteria:** A buyer can reliably find a product, open a supplier, submit a requirement, and receive a proper confirmation. Authentication and the core pages work without critical errors. All Phase 0 acceptance tests in `TEST_PLAN.md` pass.

Only after Phase 0 passes its exit criteria does Phase 1 (Community v1) begin, followed by Phase 2 (Trust v1), per the master prompt's strict sequence.
