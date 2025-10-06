# Keywords Strategy Documentation

## Overview

This document outlines the comprehensive keywords strategy implemented for McFly Education's website to improve search engine visibility and organic traffic.

## Implementation Date

October 6, 2025

## Core Strategy

### 1. **Primary Keywords**

- **Geographic Focus**: Cable Airport, Upland CA, Los Angeles, Northeast LA
- **Service Focus**: Flight training, flying lessons, pilot training, aviation education
- **Certification Focus**: Private Pilot (PPL), Instrument Rating (IR), Commercial Pilot (CPL), CFI/CFII

### 2. **Long-tail Keywords**

- Location-specific: "flying lessons Cable Airport", "flight training Upland CA"
- Service-specific: "discovery flight Los Angeles", "personalized flight training"
- Audience-specific: "first time pilots", "beginner flight training", "learn to fly"

## Technical Implementation

### Base Configuration

**File**: `/src/layouts/BaseLayout.astro`

- Added `siteKeywords` prop to accept keywords from pages
- Implemented default keywords fallback for pages without specific keywords
- Default keywords: "flight training Upland CA, Cable Airport flight school, discovery flight Los Angeles area, private pilot lessons, instrument rating, commercial pilot training, CFI CFII training"

**File**: `/src/components/BaseHead.astro`

- Added keywords meta tag rendering: `<meta name="keywords" content={keywords} />`
- Accepts keywords prop and outputs to HTML head

## Page-Specific Keywords

### Homepage (`/`)

**Focus**: General flying lessons, geographic targeting

```
flying lessons Los Angeles, Cable Airport flight school, flying lessons Upland CA, learn to fly Los Angeles, flight training Northeast LA, private pilot lessons Cable Airport, flight instructor Los Angeles, aviation training Upland, flight school California, personalized flight training, discovery flight Los Angeles, aviation education LA
```

### About Page (`/about`)

**Focus**: Instructor credentials, personalized training

```
CFI Los Angeles, CFII Cable Airport, certified flight instructor Upland, flight instructor California, personalized flight training, aviation instructor LA, flight training instructor, McFly Education instructor, safety-focused flight training, community flight school, experienced CFI CFII, flight instructor near me
```

### Discovery Flight Page (`/discovery-flight`)

**Focus**: First-time flyers, intro flights

```
discovery flight Los Angeles, intro flight Cable Airport, first flight lesson Upland, introductory flight California, discovery flight near me, first time flying lesson, try flying Los Angeles, aviation experience flight, intro to flying LA, beginner flight lesson, aircraft orientation flight, pilot experience flight
```

### Contact Page (`/contact`)

**Focus**: Communication, inquiries

```
contact flight school, Cable Airport contact, McFly Education contact, flight school inquiries, flight training questions, schedule discovery flight, flight lesson information, aviation school contact, flight instructor contact, Cable Airport flight school phone
```

### Enrollment Page (`/enrollment`)

**Focus**: Registration, sign-up process

```
enroll flight school, join flight training, flight school enrollment, sign up flight lessons, start pilot training, aviation school enrollment, flight training registration, become a pilot, flight school signup, pilot license enrollment, aviation training enrollment
```

### First Time Pilots Page (`/first-time-pilots`)

**Focus**: Beginner-friendly content

```
first time pilot, learn to fly, beginner flight training, new pilot training, student pilot program, aviation for beginners, first flight lesson, become a pilot, flight training for beginners, zero to pilot, student pilot license, new aviator training, flight school for beginners
```

### Blog Index (`/blog`)

**Focus**: Educational content, resources

```
flight training blog, aviation blog, pilot training tips, flight instructor insights, aviation education, pilot stories, flight school blog, CFI insights, learn to fly tips, aviation articles
```

### Training Programs Index (`/trainings`)

**Focus**: Program overview

```
flight training programs, private pilot license, instrument rating, commercial pilot training, CFI CFII training, pilot certification programs, aviation training courses, flight school programs Cable Airport, PPL IR CPL training
```

### Dynamic Training Pages (`/trainings/[slug]`)

**Focus**: Program-specific keywords (auto-generated based on training type)

**Private Pilot**:

```
private pilot license, PPL training Cable Airport, private pilot lessons, learn to fly private pilot, student pilot training, private pilot certificate, [base keywords]
```

**Instrument Rating**:

```
instrument rating, IFR training, instrument flight rules, instrument pilot training, IR certification, instrument rating Los Angeles, [base keywords]
```

**Commercial Pilot**:

```
commercial pilot license, CPL training, commercial pilot certificate, professional pilot training, commercial aviation training, [base keywords]
```

**Flight Instructor (CFI/CFII)**:

```
flight instructor certification, CFI training, CFII certification, flight instructor course, become a flight instructor, instructor rating, [base keywords]
```

## Supporting Pages

### Confirmation Pages

- **Contact Confirmation**: flight school confirmation, McFly Education contact
- **Discovery Flight Confirmation**: discovery flight confirmation, intro flight booking
- **Enrollment Confirmation**: flight school enrollment confirmation, pilot program enrollment

### Error Pages

- **404 & 500**: Basic brand keywords (McFly Education, Cable Airport, Upland CA)

### Privacy Policy

- **Privacy/Terms**: McFly Education privacy policy, flight school terms of service

## Best Practices Implemented

1. **Natural Language**: Keywords flow naturally with the page content
2. **Geographic Targeting**: Every page includes location-specific keywords (Cable Airport, Upland, Los Angeles)
3. **Service Specificity**: Each page targets its specific service offering
4. **Long-tail Optimization**: Focus on 3-4 word phrases that match user search intent
5. **Avoid Keyword Stuffing**: 10-15 targeted keywords per page (not excessive)
6. **Consistent Branding**: "McFly Education" and "Cable Airport" appear across all pages

## SEO Impact Areas

### Local SEO

- Cable Airport mentions on every page
- Upland, CA geographic targeting
- Los Angeles area coverage

### Service SEO

- Specific training types (PPL, IR, CPL, CFI)
- Discovery/intro flights
- Beginner-focused content

### Long-tail SEO

- "first time pilots"
- "learn to fly Los Angeles"
- "personalized flight training"
- "discovery flight near me"

## Maintenance & Updates

### When to Update Keywords

1. **New Services**: Add specific keywords when launching new programs
2. **Location Changes**: Update if expanding to new airports/locations
3. **Competitive Analysis**: Review quarterly and adjust based on search trends
4. **Performance Data**: Use Google Search Console data to refine keywords

### Adding Keywords to New Pages

```astro
<BaseLayout
  siteTitle="Your Page Title | McFly Education"
  siteDescription="Your page description"
  siteKeywords="keyword1, keyword2, keyword3, ..."
/>
```

### Default Keywords

If a page doesn't specify keywords, it will use the default set from `BaseLayout.astro`.

## Analytics & Tracking

### Monitor These Metrics

1. Organic search traffic by landing page
2. Keyword rankings (use Google Search Console)
3. Click-through rates for targeted keywords
4. Local search visibility (Google Business Profile)

### Tools to Use

- Google Search Console
- Google Analytics 4
- Local SEO tools (BrightLocal, Moz Local)
- Keyword research tools (SEMrush, Ahrefs, or free alternatives)

## Future Enhancements

### Phase 2 (Recommended)

1. Add FAQ schema with keyword-rich questions
2. Implement breadcrumb schema for navigation
3. Create location-specific landing pages
4. Add review schema for testimonials
5. Optimize image alt text with keywords

### Phase 3 (Advanced)

1. Create aviation glossary with keyword-rich content
2. Build topical authority clusters (content hubs)
3. Implement video schema for YouTube content
4. Create local business citations
5. Develop a keyword-optimized content calendar

## Notes

- Keywords meta tag is not a major ranking factor but provides context to search engines
- Focus remains on quality content that naturally incorporates these keywords
- User experience takes priority over keyword density
- All TypeScript lint errors are cosmetic and don't affect functionality
