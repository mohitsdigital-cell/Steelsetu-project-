# OPEN_ISSUES

Tracked blockers and pending founder decisions. Update with every meaningful change.

## Founder Decisions Required

| # | Decision | Impact | Status |
|---|---|---|---|
| F-1 | Confirm Supabase (managed PostgreSQL plus Auth plus Storage) as the database and auth provider, or provide an alternative | Blocks Sprint 0.2 (data and identity) | Awaiting founder |
| F-2 | Confirm Vercel as hosting | Deployment setup | Awaiting founder |
| F-3 | Provide real Singhi Enterprises business details (address, phone, WhatsApp, description) for the first verified supplier profile | Seeding, directory accuracy | Awaiting founder |
| F-4 | Confirm which brands and products Singhi Enterprises actually represents, with any authorisation evidence | Brand integrity; product-to-brand mapping | Awaiting founder |
| F-5 | Confirm legal entity name and owner for Terms, Privacy, and grievance pages | Legal pages | Awaiting founder |
| F-6 | Provide a WhatsApp Business number for CTAs and RFQ sharing | Contact flows | Awaiting founder |
| F-7 | Approve the initial category taxonomy list (18 initial categories) before catalogue build | Sprint 0.3 | Awaiting founder |
| F-8 | Confirm rate data sources and who may publish indicative rates (with attribution rules) | Rates module honesty | Awaiting founder |

## Technical Open Items

| # | Item | Phase | Notes |
|---|---|---|---|
| T-1 | Supabase project creation and migrations framework | 0.2 | Pending F-1 |
| T-2 | Seed script for test accounts (non-production guarded) | 0.2 | Pending F-1; passwords in env secrets |
| T-3 | Search alias mapping data (TMT, saria, rebar, spelling variants) | 0.3 | Start list; expand from zero-result analytics |
| T-4 | Sentry and analytics wiring | 0.1 to 0.4 | Privacy-conscious config |
| T-5 | GitHub Actions CI (type-check, lint, build) | 0.1 | Set up with first scaffold commit |
| T-6 | Legal review of Terms, Privacy, DPDP readiness, intermediary obligations, review policy | Before public Trust launch | Required before Phase 2 goes public |

## Known Risks

- No production environment or domain DNS configured yet (steelsetu.com deployment is out of current scope until the founder provides hosting decisions).
- All seeded business and product data must be real and approved; no placeholder or fake suppliers or rates may ever ship (PRD rule).
