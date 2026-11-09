# Kikosi Website Full Setup Guide

This guide includes the full workflow from creating the project, migrating the site to React, fixing the carousel, improving quality, and publishing to GitHub and Vercel.

---

## 1) Create the React app

Open a terminal and run:

```bash
npm create vite@latest kikosi-site -- --template react
```

Then go into the project folder:

```bash
cd kikosi-site
```

Install dependencies:

```bash
npm install
```

---

## 2) Copy the original static website files

From the original project folder, copy the CSS and assets into the new React app.

For example:

```bash
copy C:\Users\user\Desktop\kikosi-website\css\styles.css C:\Users\user\Desktop\kikosi-site\src\styles\index.css
```

And copy the images/assets folder into the new React app:

```bash
robocopy C:\Users\user\Desktop\kikosi-website\assets C:\Users\user\Desktop\kikosi-site\src\assets /E
```

If you are using a different shell, the important part is that the static CSS and image assets are moved into the Vite project structure.

---

## 3) Convert the landing page into components

Create component sections for the main page blocks, such as:

- Header
- HeroSection
- AboutSection
- StatsSection
- EventsSection
- CalendarSection
- LeadershipSection
- FaqSection
- DonateSection
- Footer

This makes the site easier to maintain and update.

---

## 4) Move repeated content into data files

Create a data folder like this:

```bash
src/data/
  leaders.js
  posters.js
  faqs.js
```

Place repeated card content in arrays, for example:

```js
export const leaders = [
  { name: 'John Doe', title: 'Chairperson' },
  { name: 'Jane Doe', title: 'Programs Lead' },
];
```

This reduces duplication and makes updates simple.

---

## 5) Convert logic into custom hooks

Move repeated logic into reusable hooks:

- `useMenuToggle` for mobile menu behavior
- `useCountdown` for event countdown logic
- `useCarousel` for auto-scrolling carousels

Example structure:

```bash
src/hooks/
  useMenuToggle.js
  useCountdown.js
  useCarousel.js
```

---

## 6) Fix the carousel issue

The carousel should:

- auto-scroll every few seconds
- pause on hover/focus/touch
- resume after a delay
- loop smoothly back to the start
- move based on actual card width and scroll bounds

Use logic similar to this:

```js
const maxScroll = Math.max(node.scrollWidth - node.clientWidth, 0);

if (node.scrollLeft >= maxScroll - 2) {
  node.scrollTo({ left: 0, behavior: 'smooth' });
  return;
}

step(1);
```

The key fix is to calculate based on actual scroll dimensions, not a guessed fixed number.

---

## 7) Improve site quality and standards

Update the app to be more polished and better for accessibility and SEO.

### Accessibility

- keyboard focus states
- semantic headings
- readable color contrast
- obvious button styling
- proper alt text where needed

### SEO basics

Add or confirm:

- meaningful title tag
- meta description
- Open Graph tags
- favicon
- webmanifest
- robots.txt
- sitemap.xml

Example:

```html
<title>Kikosi | Community, Leadership & Growth</title>
<meta name="description" content="Kikosi is a community-driven platform for leadership, events, and growth." />
```

---

## 8) Ensure the app builds cleanly

Run the build:

```bash
npm run build
```

If it passes, the app is ready for deployment.

Example success:

```bash
vite build
✓ built in 651ms
```

---

## 9) Start the local preview

Run:

```bash
npm run dev -- --host 0.0.0.0
```

Then visit:

```text
http://localhost:5173/
```

---

## 10) Initialize Git for GitHub

In the project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

Then connect to your GitHub repository:

```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

---

## 11) Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click New Project
4. Import the GitHub repo
5. Select the project
6. Use the default Vite/React settings
7. Click Deploy

Vercel will detect the React app automatically.

---

## 12) Best-practice website checklist

Before launch, check:

- page title and meta description are set
- mobile responsiveness works well
- images load quickly
- no broken links
- buttons and menu work properly
- carousel auto-scrolls without bugs
- the site is accessible via keyboard
- social media preview cards look correct
- favicon and manifest are present

---

## 13) Final project notes

The project should be structured as:

```bash
kikosi-site/
  public/
    favicon.svg
    robots.txt
    sitemap.xml
    site.webmanifest
  src/
    components/
    data/
    hooks/
    styles/
    App.jsx
    main.jsx
  index.html
  package.json
  README.md
  PROJECT_NOTES.md
```

---

## 14) Downloadable reference files

Useful files to keep with the project:

- README.md
- PROJECT_NOTES.md
- FULL_SETUP_GUIDE.md

These make future updates easier and help with handoff or deployment later.

---

## 15) Summary

This project was successfully migrated from a static landing page to a Vite + React app, improved for quality and SEO, and prepared for GitHub + Vercel publishing.

The most important technical fix was the carousel auto-scroll logic, which was corrected by measuring actual scroll dimensions instead of relying on fixed estimates.

---

## Quick start command list

```bash
npm create vite@latest kikosi-site -- --template react
cd kikosi-site
npm install
npm run dev -- --host 0.0.0.0
npm run build
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

---

## Notes

If you want to keep a copy of this guide on your computer, save it as a Markdown file named:

```text
FULL_SETUP_GUIDE.md
```

You can open it in any text editor or GitHub preview to read it later.
