# TEST_PLAN

Mandatory test cases per PRD §49, tracked per phase. Every feature ships with relevant automated tests (Definition of Done, PRD §50).

## Test Accounts (documented, seeded per environment)

| Account | Role | Purpose |
|---|---|---|
| test-buyer@steelsetu.local | Buyer | RFQ submission, quotation comparison, reviews |
| test-supplier@steelsetu.local | Supplier | Business profile, quotations, lead handling |
| test-trader@steelsetu.local | Trader | Dual buyer/supplier participation |
| test-moderator@steelsetu.local | Community Moderator | Moderation queue |
| test-trust@steelsetu.local | Trust Moderator | Trust moderation (no system settings) |
| test-admin@steelsetu.local | Admin | Admin operations, feature flags |
| test-superadmin@steelsetu.local | Super Admin | Sensitive configuration (MFA required) |

Passwords live in environment secrets per environment; never committed. Seeded via a migration guarded to non-production, or a documented seed script.

## Phase 0 Test Cases

### Authentication
- [ ] New user registration; login; logout.
- [ ] Password reset; session expiry; session revocation.
- [ ] Role changes take effect; disabled account cannot log in.
- [ ] Test accounts work reliably across environments.

### Search and Directory
- [ ] TMT search returns results (aliases: tmt, saria, rebar, spelling variants).
- [ ] Product aliases and brand search work.
- [ ] Location filters; empty results show helpful state; pagination.
- [ ] Mobile search UX; zero-result queries logged for analytics.

### RFQ
- [ ] Complete RFQ creates a unique reference and success confirmation.
- [ ] Incomplete or invalid RFQ rejected with clear errors (validation).
- [ ] Duplicate submission blocked (idempotency) for same user and payload within a window.
- [ ] File upload: valid files accepted; invalid types or oversize rejected.
- [ ] Supplier quotation submission and buyer comparison view.
- [ ] Closed or cancelled RFQ behaves correctly.
- [ ] WhatsApp share link contains reference ID and prefilled safe message.
- [ ] Private RFQ data not exposed publicly (direct URL access tests).

## Phase 1 Test Cases (Community)

- [ ] Create question; reply; mark best answer (owner and moderator paths).
- [ ] Poll creation; duplicate vote prevention (server-side, concurrency test); poll closure; honest counts.
- [ ] Event creation; RSVP; capacity edge cases.
- [ ] Room join; report content; moderator actions logged.
- [ ] Convert-to-RFQ: fields prefilled, user reviews before submit, link to source post preserved, sensitive content not copied.

## Phase 2 Test Cases (Trust)

- [ ] Review submission; duplicate review prevention; moderation queue.
- [ ] Publish or reject with reason; right of reply; appeal; correction recorded in audit trail.
- [ ] Private report and attachment: only authorised Trust staff can access (cross-role negative tests).
- [ ] Feature flag disabled: public routes hidden with 404, no orphaned links, SEO indexation updated, records preserved.
- [ ] Negative reviews not rejected merely for being negative; high-risk allegations route to human review.

## Security Test Cases (every phase)

- [ ] User A cannot access User B private records (IDOR).
- [ ] Business A cannot access Business B private data (tenant isolation, RLS and DAL).
- [ ] Non-admin cannot view private reports; moderator cannot change security settings.
- [ ] Public file storage does not expose private documents (signed URL expiry tests).
- [ ] Service-role secrets never present in client bundle (build scan).
- [ ] Invalid input rejected server-side; rate limits enforced; upload validation works.
- [ ] Admin actions audited.

## Reliability Test Cases

- [ ] 404 page returns correct status; error boundary renders; form data preserved on recoverable errors.
- [ ] Duplicate request protection; backup restoration drill documented and tested.

## Tooling

- Unit and component: Vitest plus React Testing Library.
- E2E: Playwright (auth, search, RFQ, community, trust flows).
- Type, lint, build: tsc noEmit, ESLint, next build in GitHub Actions CI on every PR.
