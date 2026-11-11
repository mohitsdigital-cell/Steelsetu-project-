# IMPLEMENTATION_ROADMAP

Master sequence (PRD Part F / master prompt §5). A phase begins only when the previous phase's exit criteria pass. No exceptions.

## Phase 0 — Core Foundation & Blocker Prevention

**Since the repository started empty, Phase 0 is the initial build of all core flows.**

| Sprint | Scope | Exit criteria |
|---|---|---|
| 0.1 Foundation | Next.js scaffold, design tokens, layout/nav, home, legal pages, 404/error pages | App builds clean; pages render; correct 404 status |
| 0.2 Data & Identity | Supabase setup, core migrations, auth, RLS, documented test accounts | Login/logout/reset works; tenant isolation tests pass |
| 0.3 Directory & Discovery | Suppliers directory, supplier profiles, product catalogue, brand mapping, full-text search with aliases (TMT etc.) | TMT search returns relevant products/suppliers; filters work on mobile |
| 0.4 RFQ & Rates | RFQ submit (reference, confirmation, idempotency), supplier quotation response, RFQ statuses, WhatsApp share, indicative rates with honest labels | Buyer finds product → submits RFQ → confirmation; supplier responds; no rate labelled "live" |

**Phase 0 exit:** A buyer can reliably find a product, open a supplier, submit a requirement, and receive a proper confirmation. Authentication and core pages work without critical errors.

## Phase 1 — Community v1 (after Phase 0 passes)

- Q&A with replies and best-answer marking.
- Polls (single/multi choice, one-vote-per-user enforced server-side, honest counts).
- Events with RSVP/Interested.
- Three or four trade rooms: Buy Requirements & RFQ; Price Trends & Market Sentiment; Official/Institutional Bulletin; Logistics & Dispatch (optional).
- Role badges (Buyer, Supplier, Trader, Stockist, Manufacturer, Distributor, Fabricator, Logistics Partner, Verified Business, Official Publisher).
- Moderation; zero-drama rules enforced.
- Convert-to-RFQ from posts.
- Official publisher permission controls (verified identity + documented authorisation + approver recorded).

**Exit:** all community flows work end-to-end with access control, moderation, and privacy tests.

## Phase 2 — Trust v1 (after Phase 1 passes; legal review before public launch)

- `/trust` inside steelsetu.com; entity review pages.
- Review submission with reviewer role display (verified vs self-declared clearly labelled).
- Moderation queue; statuses (draft → submitted → pending → published/rejected/needs clarification/under appeal/removed).
- Market conduct notes (evidence-based, proportionate, right of reply, periodic review).
- Private report channel (authorised access only, audited).
- Right of reply; appeal/correction workflow.
- Trust feature flag; review policy, disclaimer, grievance/takedown process; audit logs.

**Exit:** public Trust flows work with moderation, evidence handling, right of reply, grievance, and audit tests. Feature flag disabled test passes.

## Phase 3 — Marketplace & Trade Desk Improvements

Multi-supplier RFQs; comparable quotation view; lead management; follow-up reminders; saved suppliers; controlled order-status workflow; document templates; business analytics; improved notifications.

## Phase 4 — Growth, Intelligence & Scale

Smart RFQ assistant; supplier matching; product compatibility; Roofing Project Planner; Bundle Builder; regional market intelligence; advanced rate history; more calculators; editorial automation with human review; APIs/integrations; enterprise options.

## Guardrails

- One integrated website; never a separate review site.
- No fake social proof, fabricated rates, or unverified brand claims.
- Mobile-first, accessible, tested end-to-end (Definition of Done, PRD §50).
- Small reviewable commits; localhost-first; no production migration without backup/rollback plan.
