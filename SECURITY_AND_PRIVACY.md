# SECURITY_AND_PRIVACY

## Security Layers (PRD §31)

1. **Authentication** — Supabase Auth; verified contact methods; secure sessions; password reset protection; rate limiting; MFA for admins/sensitive roles; session revocation.
2. **Authorisation** — capability-based permissions; business-membership checks; server-side enforcement; database RLS; separate private Trust/Admin permissions.
3. **Data Protection** — HTTPS; encryption at rest (managed); private storage with signed expiring URLs; data minimisation; retention policies; secret management; no sensitive info in logs.
4. **API Security** — server-side Zod validation; output filtering; CSRF protections; rate limiting; bot protection; file upload validation (MIME + extension + size); idempotency for critical submissions; abuse monitoring.
5. **Infrastructure** — least-privilege deploy access; protected branches; dependency updates; secret scanning; backups + tested restore; error monitoring; incident procedure.
6. **Application Security** — prevent SQLi (parameterised queries), XSS (sanitised rendering), IDOR, broken access control, mass assignment; safe file handling; duplicate poll vote + duplicate RFQ protection (server-enforced).

## Special Protection for Trust Data

- Public reviews and private reports use separate access policies and tables.
- Private evidence stored only in a private bucket; never served publicly; only authorised Trust staff can view, and every access is audited.
- Reviewer personal details not unnecessarily exposed.
- No publication of phone numbers, addresses, GST documents, or transaction evidence without purpose and permission.
- Review-bombing and duplicate review prevention (server-side, one review per reviewer-entity pair unless policy states otherwise).
- Feature flag controls the entire public Trust surface; when disabled: routes hidden/404, SEO indexation updated, no orphaned links, records preserved per retention policy.
- Moderation decisions and reasons recorded in `audit_logs`; no silent content alteration that changes meaning.
- No AI auto-publish/auto-reject of serious allegations without human review.

## India Compliance Considerations (professional legal review required before launch)

- IT Act 2000; IT (Intermediary Guidelines) Rules 2021 as amended.
- Digital Personal Data Protection Act 2023 and DPDP Rules 2025 — phased commencement; map each obligation to its effective date with counsel.
- Consumer Protection Act 2019 / E-Commerce Rules where applicable to the actual model.
- GST and invoicing rules; copyright/trademark/defamation law; CERT-In directions.
- Grievance officer appointment, published grievance mechanism, documented notice/takedown process, record preservation for valid legal orders.
- Do not assume automatic intermediary safe harbour — classification depends on the actual service, control, role, and conduct.

### DPDP preparation

Purpose-specific privacy notices; consent management; user rights request handling (correction/erasure workflows); breach response; retention and deletion; processor contracts; children's data controls where relevant.

## Secrets & Environment

- All secrets in server-side environment variables; never in client bundles, logs, or the repository.
- Service-role keys server-only.
- Separate production and local development credentials; production credentials never committed.

## Review/Defamation Risk Controls

- Never publish allegations as established facts without adequate basis.
- Separate opinion from verifiable factual claims.
- Right of reply for affected businesses; recorded moderation reasons; appeals.
- Moderation never used to silence genuine criticism; high-risk allegations escalated for legal review before publication.
