# Kikosi Website Project Notes

## Overview
This project was migrated from a static landing page into a Vite + React app so the structure is easier to maintain and update. The main objectives were to:

- keep the original visual identity and layout
- split content into reusable components
- move repeated cards into data arrays
- turn repeated logic into custom hooks
- improve accessibility and SEO basics
- prepare the site for GitHub and Vercel deployment

## Key implementation decisions

### Component structure
The page was broken into reusable parts such as:

- Header
- Hero section
- About section
- Stats section
- Event cards
- Countdown area
- Leadership cards
- FAQ section
- Donation CTA
- Footer

### Data-driven content
Repeated content was moved into arrays so future edits are easier:

- leaders data
- poster/event data
- FAQ data

### Reusable logic
Complex interactive logic was moved into hooks:

- useMenuToggle for the mobile navigation
- useCountdown for the event timer
- useCarousel for the horizontal autoplay carousel

## Carousel behavior
The carousel should:

- move automatically on a fixed interval
- pause when hovered or focused
- resume after a short delay
- loop back to the start when it reaches the end
- keep scroll movement aligned with actual card widths

The hook calculates the real card size and scroll bounds before moving, which prevents the carousel from appearing static or stopping unexpectedly.

## Accessibility and quality review
Some improvements included:

- clear focus states for keyboard users
- better contrast and readable text
- semantic heading flow
- visible buttons and controls
- translation-safe, simple interaction logic

## SEO and deployment basics
The site was prepared with:

- title and meta description
- Open Graph tags for social previews
- favicon and manifest
- robots.txt
- sitemap.xml

This is suitable for deploy-ready static hosting on Vercel.

## GitHub and Vercel workflow
Recommended steps:

1. Create a GitHub repository.
2. Run git init in the project folder.
3. Commit and push the project.
4. Import the repo in Vercel.
5. Use the default Vite build settings.
6. Publish the site and add a custom domain if needed.

## Useful next improvements
- Add more event-specific images and alt text.
- Review conversion copy and donation messaging.
- Add analytics once the site is live.
- Consider a CMS or admin-friendly structure if content grows.
- Add more structured data for events and organization info.

## Summary
The project is in a good state for a fast deployment and ongoing content updates. The main technical fix was making the carousel consistent and reliable. The site is now organized in a maintainable React structure and is ready for GitHub + Vercel hosting.
