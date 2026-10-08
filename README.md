# 5 STAR TUITION — V5

**CURRENT VERSION: V5**

# 5 STAR TUITION
## Locked brand reference

The design system is now locked to `docs/brand-reference.png`. Read `BRAND_REFERENCE.md` before making UI/content changes. `CONTENT_MAP.md` lists the current website/portal structure.

## Cloudflare Platform — V5

This is the current V4 build of the 5 Star Tuition platform architecture. It is intentionally structured as a **full web application**, not a single brochure page.

## What is already in this build

### Public website
- Book a FREE Trial calendar with local-time display, multiple-subject scheduling and parent/student details form
- Modern British navy / gold / ivory brand system
- Responsive sticky navigation and mega menus
- Full homepage
- School Tuition page
- Subject directory + dynamic subject pages
- Exams & Admissions page
- How It Works page
- Pricing page with interactive package calculator
- Tutor directory with search/filtering
- Dynamic tutor profile pages
- About page
- Resources hub
- Find a Tutor form
- Become a Tutor form

### Portal foundations
- Parent / student dashboard preview
- Tutor dashboard preview
- Admin dashboard preview
- Demo login chooser

### Cloudflare backend foundation
- Worker API
- `/api/health`
- `/api/enquiries`
- `/api/tutor-applications`
- D1 SQL migration for enquiries, tutor applications, tutors, students and trials
- Browser-only preview fallback before D1 is connected

## Important: current status

This is an **early platform foundation / preview build**. It is not yet ready to store real parent, child or tutor data.

Before production use we still need to add:
- secure authentication and roles
- production D1 database binding
- R2 file uploads
- admin APIs and database-backed dashboards
- verified real tutor profiles and testimonials
- final legal / privacy / safeguarding pages
- spam protection / rate limiting
- audit logging
- production email notifications
- payment integration
- security review

## Design preview with no installation

If you are on a locked-down work laptop, open:

`design-preview/index.html`

by double-clicking it. This is a static visual preview and does not need Node.js.

## Local development (personal computer)

```bash
npm install
npm run dev
```

Cloudflare's Vite integration will run the React frontend together with the Worker API.

## Deploy the visual application to Cloudflare first

The supplied `wrangler.jsonc` intentionally has **no D1 binding**, so the site can be deployed before the production database exists. The Find-a-Tutor and Tutor Application forms fall back to browser-local preview storage if D1 is not connected.

Do not use this fallback for real customer information.

## Connect D1 later

1. Create a D1 database named `five-star-tuition-db`.
2. Copy its database ID.
3. Copy the D1 block from `wrangler.d1.example.jsonc` into `wrangler.jsonc`.
4. Insert the real database ID.
5. Apply `migrations/0001_init.sql` using Wrangler migrations.
6. Redeploy.

## Proposed production architecture

- React + TypeScript frontend
- Cloudflare Worker for API/business logic
- Cloudflare D1 for structured data
- Cloudflare R2 for files/documents
- GitHub for version control
- Cloudflare automatic preview + production deployments
- Own domain at launch

## Demo routes

- `/`
- `/tuition`
- `/subjects`
- `/subjects/mathematics`
- `/exams-admissions`
- `/how-it-works`
- `/pricing`
- `/tutors`
- `/find-a-tutor`
- `/become-a-tutor`
- `/about`
- `/resources`
- `/login`
- `/parent/dashboard`
- `/tutor/dashboard`
- `/admin/dashboard`

## Brand palette

- Midnight Navy `#0B1F33`
- Oxford Navy `#17365D`
- Heritage Gold `#D6A928`
- Golden Yellow `#E7B83A`
- Warm Ivory `#F6F2E8`
- Academic Mist `#E9EEF5`
- Soft Blue `#C9D5E3`
- Slate `#536273`
- Success Green `#2F6B5D`
- Alert Terracotta `#B85846`
