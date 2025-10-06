# McFly Education - AI Coding Agent Instructions

## Project Overview
McFly Education is a flight training school website built with **Astro 5** + **React 19** + **Tailwind CSS 4**, using **Bun** as the package manager. The site is an SEO-optimized static site for a flight school based at Cable Airport (KCCB) in Upland, CA, serving the Northeast Los Angeles area.

## Technology Stack
- **Framework**: Astro 5.13+ (static site generation)
- **UI Components**: Mix of Astro components (`.astro`) and React islands (`.jsx`)
- **Styling**: Tailwind CSS 4 via `@tailwindcss/vite` (inline `@theme` in `global.css`)
- **Content**: Content Collections for blog posts and training programs
- **Package Manager**: Bun (NOT npm/yarn/pnpm)
- **Deployment**: Static export to `./dist/`

## Critical Build & Run Commands
```bash
bun install              # Install dependencies
bun run dev              # Start dev server (localhost:4321)
bun run build            # Production build
bun run bpreview         # Build + preview locally
```

⚠️ **Always use `bun` commands** - this project uses Bun's lockfile (`bun.lock`).

## Project Architecture

### Content Collections (`src/content/`)
Two primary collections defined in `src/content/config.ts`:

1. **`blog`** - Blog posts (Markdown/MDX)
   - Schema: `title`, `description`, `author`, `tags`, `pubDate`, `updatedDate`, `heroImage`, `draft`
   
2. **`trainings`** - Flight training programs (Markdown)
   - Schema: `title`, `shortTitle`, `tagline`, `level`, `durationWeeks`, `minFlightHours`, `summary`, `heroImage`, `stats`, `structure`, `benefits`, `entryRequirements`, `assessments`

Access via `getCollection()` in pages - see `src/pages/trainings/[slug].astro` for patterns.

### Layouts
- **`BaseLayout.astro`**: Main site wrapper - handles SEO props (`siteTitle`, `siteDescription`, `siteKeywords`)
- **`BlogPost.astro`**: Blog-specific layout (used in `src/pages/blog/[slug].astro`)

### Component Patterns
- **Astro components** (`.astro`): Server-side, no client JS
- **React components** (`.jsx` in `src/components/react/`): Client-side islands with `client:load` directive
  - Example: `<Navbar pathname={pathname} client:load />`
  - React 19 requires explicit `client:*` directives to hydrate

### Data Organization
- **Global constants**: `src/consts.ts` (site info, contact details)
- **Form configurations**: `src/data/forms/*.js` (contact, discovery flight, enrollment)
- **Navigation**: `src/data/navbarLinks.js` (site menu structure)
- **Schema.org markup**: `src/lib/schema.js` (centralized structured data)
- **FAQs**: `src/data/generalFAQs.js`, `src/data/newpilotsFAQs.js`

## SEO Implementation (Critical!)

### Three-Tier SEO System
This site has **comprehensive SEO** - always maintain this when creating/editing pages:

1. **Keywords**: Every page MUST pass `siteKeywords` to `<BaseLayout>`
   ```astro
   <BaseLayout 
     siteTitle="Page Title | McFly Education"
     siteDescription="Compelling description with location context"
     siteKeywords="keyword1, keyword2, Cable Airport, flight training Upland CA"
   />
   ```
   - Default keywords in `BaseLayout.astro` for fallback
   - Training pages auto-generate keywords based on program type (see `src/pages/trainings/[slug].astro`)

2. **Schema.org Markup**: Use helper functions from `src/lib/schema.js`
   - `ORGANIZATION_SCHEMA` - on all pages via `BaseHead.astro`
   - `createCourseSchema()` - for training programs
   - `createFAQSchema()` - for FAQ sections
   - `createBreadcrumbSchema()` - for navigation breadcrumbs

3. **Meta Tags**: Handled automatically by `BaseHead.astro` (title, description, OG, Twitter)

**Reference files**: See `KEYWORDS_STRATEGY.md`, `SCHEMA_STRATEGY.md`, `SEO_AUDIT_2025.md` for complete implementation details.

### Geographic SEO Focus
Always include location context in content/keywords:
- Primary: Cable Airport (KCCB), Upland, CA
- Secondary: Northeast Los Angeles, Claremont, Rancho Cucamonga

## Styling Conventions

### Tailwind CSS 4 Usage
- Theme defined inline in `src/styles/global.css` using `@theme` directive
- Custom colors: `primary-*` (yellow/gold), `accent-*` (grays/blacks)
- Custom fonts: `font-sans` (Inter), `font-heading` (Space Grotesk)

### Reusable Classes (in `global.css`)
```css
.btn-primary       /* Yellow CTA button */
.btn-secondary     /* Gray button */
.btn-transparent   /* Outlined button */
.eyebrow           /* Badge/label style */
```

Always use these for buttons/CTAs - don't create new button styles.

## Form Handling Pattern

All forms submit to Right Rudder Marketing's portal API:
- **Endpoint**: `https://portal.rightruddermarketing.com/api/leads`
- **Implementation**: See `src/components/ContactForm.astro` (lines 550+)
- **Config files**: `src/data/forms/*.js` define form structure
- **Confirmation pages**: `/contact-confirmation`, `/discovery-flight-confirmation`, `/enrollment-confirmation`

Forms include:
- HTML5 validation
- Honeypot field (`confirm-email`)
- Terms acceptance checkbox
- Client-side submission with redirect

## Key Patterns & Conventions

### Image Handling
- Static images: `/public/images/` (absolute paths in markup)
- Processed images: `/src/assets/` (use Astro's `Image` component)
- Component: `<ImageComp>` wrapper for consistent image rendering

### React Integration
- Use `client:load` for interactive components requiring immediate hydration
- React components in `src/components/react/`
- Pass data as props (no global state management)

### Dynamic Routes
- Blog: `src/pages/blog/[slug].astro` (uses `getStaticPaths`)
- Trainings: `src/pages/trainings/[slug].astro`
- Both use Content Collections for type safety

### Breadcrumbs
Use `<Breadcrumb>` component with schema generation:
```astro
<Breadcrumb items={[
  { href: "/", label: "Home" },
  { href: "/trainings", label: "Training Programs" },
  { label: entry.data.title }
]} />
```

## Don't Break These

1. **Never remove keywords** from existing pages - SEO strategy is deliberate
2. **Don't modify** `src/lib/schema.js` without updating all consuming pages
3. **Keep NAP consistent**: Name, Address, Phone must match across all pages (see `src/consts.ts`)
4. **Preserve form API integration** - forms connect to external CRM
5. **Maintain Content Collection schemas** - breaking changes require migration

## Common Tasks

### Adding a New Page
1. Create `.astro` file in `src/pages/`
2. Import `BaseLayout` and set all 3 SEO props
3. Add relevant schema from `src/lib/schema.js`
4. Update `src/data/navbarLinks.js` if needed

### Adding a Training Program
1. Create Markdown file in `src/content/trainings/`
2. Follow schema in `src/content/config.ts`
3. File slug becomes URL (e.g., `private-pilot.md` → `/trainings/private-pilot`)
4. Keywords auto-generated based on program type

### Modifying Styles
- Edit `src/styles/global.css` for theme changes
- Use existing Tailwind classes first
- Component-specific styles: scoped `<style>` in `.astro` files

## Testing
- **Dev server**: `bun run dev` - check `localhost:4321`
- **Production preview**: `bun run bpreview` - tests actual build output
- **No automated tests** in codebase - manually verify in browser

## Additional Context
The site was recently audited for SEO (Oct 2025) - multiple strategy documents exist:
- `KEYWORDS_IMPLEMENTATION_SUMMARY.md` - keyword coverage details
- `SCHEMA_IMPLEMENTATION_SUMMARY.md` - structured data implementation
- `SEO_CRITICAL_FIXES_COMPLETED.md` - recent fixes applied
- `SEO_HIGH_PRIORITY_FIXES_COMPLETED.md` - optimization history

These docs track SEO state - keep them updated if making SEO changes.
