# Schema.org Strategy Documentation

## Overview
This document outlines the comprehensive Schema.org structured data implementation for McFly Education's website to enhance search engine understanding and enable rich snippets in search results.

## Implementation Date
October 6, 2025

## Why Schema Matters

### SEO Benefits
- **Rich Snippets**: Enhanced search results with ratings, pricing, FAQs
- **Knowledge Graph**: Potential inclusion in Google's Knowledge Panel
- **Voice Search**: Better voice assistant comprehension
- **Local SEO**: Improved local business visibility
- **CTR Boost**: More attractive search results = higher click-through rates

## Schema Types Implemented

### 1. **Organization Schema** (Global)
**Location**: `/src/lib/schema.js` - `ORGANIZATION_SCHEMA`  
**Applied to**: All pages via `BaseHead.astro`

**What it includes:**
- Business name, description, logo
- Contact information (phone, email)
- Physical address and geo-coordinates
- Opening hours
- Areas served (cities)
- Service offerings (PPL, IR, CPL, CFI/CFII, Discovery Flights)
- Training aircraft information

**Search Impact:**
- Appears in Google Business Profile
- Enables "Call" button in mobile search
- Shows business hours in search results
- Displays location on maps

### 2. **Person Schema** (Instructor)
**Location**: `/src/lib/schema.js` - `INSTRUCTOR_SCHEMA`  
**Applied to**: About page (`/about`)

**What it includes:**
- Instructor name: Marty McFly
- Job title: Certified Flight Instructor (CFI/CFII)
- Credentials and certifications
- Areas of expertise
- Social media profiles (Instagram, Skool)

**Search Impact:**
- Builds authority for "Marty McFly CFI" searches
- Connects instructor to organization
- Enables knowledge panel for instructor
- Social profile verification

### 3. **Course/Educational Program Schema**
**Location**: `/src/lib/schema.js` - `createCourseSchema()`  
**Applied to**: Individual training pages (`/trainings/[slug]`)

**What it includes:**
- Course name and description
- Provider (McFly Education)
- Course location (Cable Airport)
- Educational credentials awarded
- In-person instruction mode

**Search Impact:**
- Appears in "Courses" search results
- Shows program details in snippets
- Enables "Course" rich results
- Improves discoverability for specific training searches

### 4. **FAQPage Schema**
**Location**: `/src/lib/schema.js` - `createFAQSchema()`  
**Applied to**: 
- First Time Pilots page (`/first-time-pilots`)
- Training Programs page (`/trainings`)

**What it includes:**
- Question and answer pairs
- Extracted from FAQ components
- Structured Q&A format

**Search Impact:**
- FAQ rich snippets in search results
- Expandable Q&A in mobile search
- "People Also Ask" section consideration
- Increased SERP real estate

### 5. **BreadcrumbList Schema**
**Location**: `/src/lib/schema.js` - `createBreadcrumbSchema()`  
**Component**: `/src/components/Breadcrumb.astro`  
**Applied to**:
- About page (`/about`)
- Training programs index (`/trainings`)
- Individual training pages (`/trainings/[slug]`)

**What it includes:**
- Navigation hierarchy
- Page position in site structure
- URL path representation

**Search Impact:**
- Breadcrumb trail in search results
- Improved site navigation understanding
- Better internal linking signals
- Enhanced mobile search display

### 6. **LocalBusiness Schema** (Enhanced)
**Location**: Embedded in Organization schema  
**Applied to**: All pages via `BaseHead.astro`

**Enhanced features:**
- Geographic coordinates
- Price range indicator
- Amenity features
- Contact points with language
- Area served with structured data

## Technical Implementation

### Centralized Schema Library
**File**: `/src/lib/schema.js`

All schema objects are centralized in one file for:
- Easy maintenance
- Consistency across pages
- Reusability
- Single source of truth

### Usage Pattern

#### Static Schema (Organization, Person)
```astro
import { ORGANIZATION_SCHEMA, INSTRUCTOR_SCHEMA } from "../lib/schema.js";

<Fragment slot="head">
  <script type="application/ld+json" set:html={JSON.stringify(INSTRUCTOR_SCHEMA)} />
</Fragment>
```

#### Dynamic Schema (FAQ, Course, Breadcrumb)
```astro
import { createFAQSchema } from "../lib/schema.js";

const faqSchema = createFAQSchema(faqs.map(faq => ({
  question: faq.question,
  answer: faq.answer.join(" ")
})));

<Fragment slot="head">
  <script type="application/ld+json" set:html={JSON.stringify(faqSchema)} />
</Fragment>
```

### Head Slot Pattern
Using Astro's `<Fragment slot="head">` to inject schema directly into the `<head>` section of pages without modifying the layout.

## Schema by Page

| Page | Schema Types | Priority |
|------|--------------|----------|
| **Homepage** | Organization, LocalBusiness | High |
| **About** | Organization, Person, Breadcrumb | High |
| **Training Index** | Organization, FAQPage, Breadcrumb | High |
| **Training Detail** | Organization, Course, Breadcrumb | High |
| **First Time Pilots** | Organization, FAQPage | Medium |
| **Discovery Flight** | Organization, Service | Medium |
| **Contact** | Organization, LocalBusiness | Medium |
| **Blog Posts** | BlogPosting (future) | Low |

## Validation & Testing

### Google Tools
1. **Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Markup Validator**: https://validator.schema.org/
3. **Google Search Console**: Monitor rich result performance

### Testing Checklist
- [ ] No schema errors in Rich Results Test
- [ ] All required properties present
- [ ] No warnings for recommended properties
- [ ] Valid JSON-LD format
- [ ] Correct URLs (absolute, not relative)
- [ ] Matching data between schema and visible content

### Common Issues to Watch
1. **Missing required properties**: Ensure all @type requirements met
2. **Invalid URLs**: Always use absolute URLs with https://
3. **Mismatched data**: Schema must match visible page content
4. **Duplicate schemas**: Avoid multiple schemas of same type
5. **Image URLs**: Must be absolute and accessible

## Future Enhancements

### Phase 2 - Additional Schema
1. **BlogPosting Schema** - For blog articles
2. **Review/AggregateRating Schema** - For testimonials
3. **VideoObject Schema** - For YouTube content
4. **Event Schema** - For open houses or webinars
5. **Service Schema** - Enhanced service descriptions

### Phase 3 - Advanced Features
1. **Speakable Schema** - Voice search optimization
2. **QAPage Schema** - Q&A sections
3. **HowTo Schema** - Step-by-step guides
4. **ItemList Schema** - Training program listings
5. **Organization sub-types** - More specific business categories

## Best Practices Followed

### 1. **Use Specific Types**
- Prefer specific types (EducationalOccupationalProgram) over generic (Course)
- Use multiple @type when appropriate (LocalBusiness + EducationalOrganization)

### 2. **Complete Data**
- Include all recommended properties, not just required
- Add descriptions, images, and contact info everywhere possible

### 3. **Consistency**
- Same business name across all schemas
- Consistent URLs and contact information
- Match visible content exactly

### 4. **Proper Relationships**
- Use @id to connect related entities
- Link courses to organization
- Connect person to organization

### 5. **Local SEO Focus**
- Geographic coordinates included
- Multiple cities in areaServed
- Detailed address information
- Opening hours specification

## Monitoring & Maintenance

### Weekly Tasks
- Check Google Search Console for schema errors
- Monitor rich result impressions and clicks
- Review new schema opportunities

### Monthly Tasks
- Validate schema with Google's testing tools
- Update schema for new services/programs
- Review competitor schema implementations

### Quarterly Tasks
- Audit all schema for accuracy
- Update FAQ content and schema
- Add new schema types as available
- Performance analysis of rich results

## Schema Impact Metrics

### Track These KPIs
1. **Rich Result Impressions** - How often rich snippets show
2. **Rich Result Clicks** - Click-through from rich results
3. **Knowledge Panel Appearances** - Organization in knowledge graph
4. **FAQ Expansion Rate** - Users clicking FAQ in search
5. **Local Pack Appearances** - Showing in map results

### Expected Improvements
- **CTR Increase**: 20-30% higher click-through rates
- **Local Visibility**: Top 3 in local map pack
- **Rich Snippets**: 50%+ of branded searches show enhancements
- **Voice Search**: Better featured in voice results

## Resources

### Schema.org Documentation
- Main site: https://schema.org/
- LocalBusiness: https://schema.org/LocalBusiness
- Course: https://schema.org/Course
- FAQPage: https://schema.org/FAQPage
- Person: https://schema.org/Person

### Google Guidelines
- Structured Data Guidelines: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- LocalBusiness Guidelines: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Education Guidelines: https://developers.google.com/search/docs/appearance/structured-data/course

### Testing Tools
- Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org/
- JSON-LD Playground: https://json-ld.org/playground/

## Notes

- All schema is implemented using JSON-LD format (recommended by Google)
- Schema is injected into <head> for best practices
- No microdata or RDFa used (JSON-LD is cleaner and easier to maintain)
- Schema helper functions make it easy to add schema to new pages
- Centralized configuration ensures consistency

## Adding Schema to New Pages

### Step 1: Import the helper function
```astro
import { createFAQSchema, createBreadcrumbSchema } from "../lib/schema.js";
```

### Step 2: Generate the schema
```astro
const mySchema = createFAQSchema(myFaqs);
```

### Step 3: Add to page head
```astro
<BaseLayout>
  <Fragment slot="head">
    <script type="application/ld+json" set:html={JSON.stringify(mySchema)} />
  </Fragment>
  
  <!-- Your page content -->
</BaseLayout>
```

---

**Implementation Status**: ✅ Complete  
**Last Updated**: October 6, 2025  
**Maintained By**: McFly Education Development Team
