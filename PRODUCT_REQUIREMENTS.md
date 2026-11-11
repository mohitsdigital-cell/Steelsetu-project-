# PRODUCT_REQUIREMENTS

Distilled from Steelsetu PRD v5.0 (11 November 2026). This file is the working requirements reference for development. The full PRD text is held by the founder; any conflict resolves in favour of the founder-approved PRD.

## Product

- **Name:** Steelsetu | **Domain:** steelsetu.com | **Tagline:** The Bridge Between Verified Buyers & Verified Steel Suppliers.
- **Type:** B2B steel and industrial trading discovery, RFQ, tools, community and Trust platform.
- **Initial market:** Burrabazar, Kolkata, then Eastern India, then Pan-India.
- **Operating context:** Singhi Enterprises (legal ownership and commercial relationships to be confirmed separately).

## Non-Negotiable Rules (master prompt section 56)

1. One integrated website. No separate review/complaint website.
2. Audit before implementation. Core blockers before new modules.
3. Sequence: Fix Core, then Community v1, then Trust v1, then Marketplace, then Growth.
4. Mobile-first, accessible, tested end-to-end.
5. No fake social proof; no fabricated rates; no unverified brand claims; no public exposure of private reports; no unmoderated public shaming; no community chat for dispute resolution.
6. No financial action without approval; no production migration without backup and rollback plan.
7. Ask the founder only for genuinely missing business decisions; never silently change scope.

## Domain 1 — Directory & Tools

- Verified supplier and business directory; filters: city, state, product, business type, verification status.
- Business profile fields: name, legal/trade name, type, address, PIN, phone, WhatsApp, email, website, products, brands (with relationship type), description, verification documents.
- Profile statuses: draft, pending, verified, rejected, suspended.
- Verification uses precise labels (phone verified, email verified, GSTIN checked, address evidence reviewed, brand authorisation reviewed). Never a vague "100% trusted" badge.
- Brand and product catalogue with structured fields (grade, thickness, width, coating, colour, standard, MOQ and more). Show relevant fields only; never force all fields.
- Brand integrity: never claim ownership, manufacture, exclusive distribution, or authorisation without evidence and founder approval.
- Initial taxonomy: TMT bars, MS sheets and plates, GI corrugated and plain sheets, GI coils, colour-coated coils, PPGI and PPGL sheets and coils, profile sheets, roofing sheets, FRP, polycarbonate, PUF and PIR panels, fasteners, ridge, donga, flashing and gutter accessories, ventilation fans, structural sections, pipes and tubes; aluminium and allied materials as future categories.

## Domain 2 — Marketplace & CRM

- RFQ required fields: product, quantity, unit, location, contact method. Everything else optional.
- RFQ gets a unique reference number, a success confirmation, and duplicate-submission protection.
- Supplier quotation fields: product, brand/grade, quantity, unit, rate, GST treatment, freight, delivery timeline, payment terms, validity, remarks, documents.
- Quotation comparison highlights missing or non-comparable fields; never pretend unlike quotations are equivalent.
- RFQ statuses: draft, submitted, under review, published, responses received, buyer reviewing, negotiation, converted or externally handled, closed, cancelled, expired.
- WhatsApp-first: click-to-chat, prefilled templates with reference ID; no scraping of private messages; no unsolicited bulk messages.
- Trade Desk: internal lead records, follow-up status, interaction notes, reminders, assignment, lead source, conversion outcome.
- Controlled order flow: the platform records order intent and status only; parties settle directly. Future: invoices, POs, challans, ledgers, with legal and tax review. No TCS or TDS settings without current-law review by a qualified tax professional.

## Domain 3 — Community Hub v1

- Q&A with replies, helpful and best-answer marking, search, reporting.
- Polls: single or multi choice; one vote per user enforced server-side; honest counts; weekly TMT and mandi sentiment poll; sentiment is not a verified price.
- Events: title, organiser, date and time, location or online link, RSVP, capacity, status, reminders; verified institutional organiser status where claimed.
- Three or four rooms: Buy Requirements & RFQ; Price Trends & Market Sentiment; Official or Institutional Bulletin; Logistics & Dispatch (optional).
- Role badges are category or status labels, not honesty or quality certifications.
- Official posts: only approved, identity-verified accounts with documented authorisation; approver recorded.
- Zero-drama policy; no personal attacks, doxxing, threats, unsupported accusations, private commercial documents, fake polls or counts. Disputes go to the Trust and Quality Concern process.
- Convert-to-RFQ: CTA on permitted posts; prefills product, quantity, location; user reviews before submit; new RFQ links to source post; no sensitive content copied.

## Trust & Market Feedback (Phase 2)

- Reviews with reviewer role (verified vs self-declared, clearly labelled), relationship disclosure, rating, text, optional private evidence, declaration.
- Moderation statuses: draft, submitted, pending moderation, published, rejected with reason, needs clarification, under appeal, removed under policy or legal process.
- Never reject a review merely for being negative.
- Market conduct notes: evidence-based, proportionate, time-bounded, right of reply, periodically reviewed.
- Private report channel: serious concerns only; visible only to authorised Trust and Admin staff; never auto-published; never in public feeds.
- Right of reply; appeal and correction; audit trail; no silent meaning-altering edits.
- Global feature flag disables the public Trust surface (routes, submission, display, notes) while preserving records.
- Required disclaimer published on Trust pages per PRD Module K section 9.

## Rates & Calculators

- Every rate record carries: product, grade or variant, region, unit, date, source type and attribution, tax and freight inclusion status (if known), indicative status, last updated, disclaimer. Never label manual or stale data as live. Never combine unlike grades, units, or terms.
- Calculators (22 planned, starting with TMT weight, sheet weight, roofing coverage): show formula and assumptions, units; validate inputs; label outputs as estimates; not certified structural design; domain-reviewed before publication.

## Roles & Permissions

Capability-based. Visitor, Registered User, Buyer, Supplier, Trader, Community Moderator, Trust Moderator, Content Editor, Verification Reviewer, Admin, Super Admin. A user may hold multiple roles and belong to multiple businesses (user identity and business membership are separate records). Staff access revocable; MFA for privileged staff; admin actions auditable.

## Monetisation Rules

No selling positive reviews; no pay-to-remove of legitimate criticism; paid placement clearly disclosed; paid listing never framed as more trustworthy; no monetisation of private reports; no mandatory early-stage commissions.
