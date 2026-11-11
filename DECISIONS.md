# DECISIONS

Architecture Decision Record (ADR) log. Append only; never rewrite history. Every significant decision recorded with rationale.

## ADR-001 — 11 November 2026 — Repository-first audit conclusion

Decision: The Phase 0 audit found the GitHub repository empty (no code, no dependencies, no branches with content). Steelsetu is therefore a from-scratch build implementing the PRD v5.0 recommended stack, not a repair of an existing application.

Rationale: PRD rule to not assume the earlier architecture description matches the current codebase was verified. With nothing to preserve, the PRD recommended direction (Next.js App Router, TypeScript, Tailwind, PostgreSQL or Supabase, Vercel) becomes the baseline.

Consequences: No existing working technology to reuse; Phase 0 is initial construction of core flows. No data migration risk. Documentation-first strategy adopted (12 project documents committed before code).

## ADR-002 — 11 November 2026 — Modular monolith architecture

Decision: Single Next.js application with logical modules behind a centralised Data Access Layer. No microservices, no dedicated search service, no Redis or job queues initially.

Rationale: PRD sections 27-28. Premature infrastructure adds cost and complexity without measured need. PostgreSQL full-text search (tsvector plus trigram index) is sufficient at launch scale.

Consequences: DAL module boundaries must stay clean so a future extraction (Strangler Fig) is possible without restructuring.

## ADR-003 — 11 November 2026 — develop branch as the working branch

Decision: Development happens on the develop branch (the first commit created it). main remains the stable branch for production releases.

Rationale: Small reviewable commits; production protection; localhost-first workflow before merging to main.

Consequences: PRs go from feature branches to develop; develop merges to main only at release points with passing CI and the Definition of Done check.

## ADR-004 — 11 November 2026 — Documentation before code

Decision: Commit the 12 required project documents before the application scaffold: PROJECT_OVERVIEW, PRODUCT_REQUIREMENTS, ARCHITECTURE, ROUTES_AND_MODULES, DATABASE_SCHEMA, SECURITY_AND_PRIVACY, SEO_CONTENT_STRATEGY, IMPLEMENTATION_ROADMAP, TEST_PLAN, CHANGELOG, OPEN_ISSUES, DECISIONS.

Rationale: Master prompt section 15 requires documentation not to drift from code. Starting from the docs establishes the contract the code must satisfy and the audit trail for the founder.

Consequences: Each meaningful implementation change must update the relevant documents in the same batch of work.

## ADR-005 — 11 November 2026 — Honesty-first data policy

Decision: No placeholder or fake suppliers, products, rates, reviews, or member counts will ever be seeded. Seeding requires founder-approved real data (Singhi Enterprises details, genuine brand relationships).

Rationale: PRD non-negotiable rules: no fake social proof, no fabricated rates, no unverified brand claims.

Consequences: Directory and rate pages must handle empty states gracefully and honestly until real data arrives (see OPEN_ISSUES items F-3, F-4, F-8).
