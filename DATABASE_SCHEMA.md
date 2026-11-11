# DATABASE_SCHEMA

Logical starting model per PRD §29. All changes via migrations (e.g., `supabase/migrations/*.sql`). This document tracks the schema as actually implemented — do not let it drift from the code.

## Naming & Conventions

- Primary keys: `id uuid primary key default gen_random_uuid()`.
- Timestamps: `created_at`, `updated_at` (timestamptz, default now()).
- Actor tracking: `created_by`, `updated_by`, `approved_by` where relevant.
- Soft states via status enums with CHECK constraints.
- Migrations only in production; never undocumented schema edits.

## Core Tables (Phase 0)

### identity & access
```sql
users                  -- mirrors auth.users (Supabase Auth)
user_profiles          -- user_id, display_name, phone, role_capabilities, is_staff
businesses             -- id, name, legal_name, type, address, city, state, pincode,
                       -- phone, whatsapp, email, website, description, status,
                       -- contact_visibility, slug
business_memberships   -- user_id, business_id, role, status
business_verification_records -- business_id, check_type, status, evidence_url (private),
                              -- checked_by, checked_at, notes
brands                 -- slug, name, description, website
brand_relationships    -- business_id, brand_id, relationship_type, evidence_status,
                       -- verified_at, approved_by
product_categories     -- slug, name, parent_id, aliases (text[])
products               -- slug, name, category_id, brand_id (nullable), product_type,
                       -- material, grade, thickness, width, length, weight_basis,
                       -- coating, colour, standard, moq, packaging, application,
                       -- availability_status, last_verified_at
product_variants       -- product_id, name, attributes (jsonb)
product_documents      -- product_id, doc_type, url (private bucket), is_public
supplier_products      -- business_id, product_id, price_indication (nullable),
                       -- availability_status, last_confirmed_at
rate_observations      -- product_id, grade_variant, region, unit, rate_value,
                       -- rate_range_low, rate_range_high, observed_at, source_type,
                       -- source_attribution, tax_included, freight_included,
                       -- rate_status (indicative|supplier_indication|historical|verified_quote),
                       -- disclaimer, updated_at
rfqs                   -- reference_number (unique), user_id, product_id (nullable),
                       -- product_text, brand_preference, quantity, unit, dimensions,
                       -- delivery_city, delivery_pincode, delivery_timeframe,
                       -- required_documents, notes, contact_preference, visibility,
                       -- status (draft|submitted|under_review|published|responses_received|
                       --         buyer_reviewing|negotiation|converted_externally|closed|cancelled|expired)
rfq_attachments        -- rfq_id, file_url (private bucket), file_type, uploaded_by
rfq_supplier_targets   -- rfq_id, business_id, notified_at
quotations             -- rfq_id, business_id, product_desc, brand_grade, quantity, unit,
                       -- rate, gst_treatment, freight, delivery_timeline, payment_terms,
                       -- offer_validity, remarks, status, submitted_at
```

## Phase 1+ Tables (Community, Trust, Trade Desk)

```sql
orders, order_status_events
trade_leads, lead_activities
community_rooms, community_posts, community_questions, community_answers,
community_polls, poll_options, poll_votes, community_events, event_rsvps
reviews, review_replies, review_appeals
trust_reports, trust_evidence, market_conduct_notes
moderation_cases, moderation_actions
notifications, feature_flags, content_articles, audit_logs
```

These are planned entities — create each only in the phase that needs it, after repository inspection and per-feature approval. Do not create every table before its module is built.

## Important Data Rules

- Stable IDs; consistent timestamptz; public and private fields strictly separated.
- Sensitive evidence **never** stored in public content tables or public buckets.
- DB constraints enforce uniqueness (e.g., `rfqs.reference_number`) and valid states.
- Indexes added from measured query patterns (search tsvector + trigram indexes on suppliers/products names).
- RLS enabled on every exposed table; restrictive default; service-role access server-only.
- Retention/deletion/archival defined per table before launch (see SECURITY_AND_PRIVACY.md).
