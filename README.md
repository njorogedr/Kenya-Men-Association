# Kikosi Cha Wanaume Kenya | Kenya Men Association: website

GitHub repository: `Kenya-Men-Association`

A plain HTML, CSS and JavaScript version of the site. No build step, no installs.

## 1. Run it in VS Code

1. Install **VS Code** and the **Live Server** extension (Ritwick Dey).
2. Unzip this folder, then in VS Code choose **File > Open Folder** and pick `kikosi-website`.
3. Right-click `index.html` and choose **Open with Live Server**. The site opens at http://127.0.0.1:5500.

No extension? Open a terminal in the folder and run `npx serve .` (needs Node.js), or just double-click `index.html`.

## 2. Folder structure

```
kikosi-website/
├─ index.html              all page content (sections in the order they appear)
├─ css/
│  └─ styles.css           colours, layout, responsive rules, hover effects
├─ js/
│  └─ main.js              menu, carousels, countdown, calculator, chat, donate, forms
├─ assets/
│  ├─ images/logo.jpg
│  └─ photos/
│     ├─ leaders/          executive board and team portraits
│     ├─ speakers/         John CW, Moimett
│     ├─ events/posters/   event posters (named yyyy-mm-dd-event-name.jpg)
│     └─ gallery/          gathering gallery photos
└─ README.md
```

Your own folder `C:\Users\user\Desktop\Kikosi cha wanaume\assets\photos\events\posters` maps straight onto
`assets/photos/events/posters`. Drop new posters there and add a matching `<figure>` in `index.html`.

## 3. Where to change things

| To change | Edit |
|---|---|
| Brand colours | `:root` at the top of `css/styles.css` (`--accent`) and the hex codes `#B00000` (red), `#0A6B2B` (green), `#14110F` (black) |
| Next event date for the countdown | `NEXT_EVENT` in `js/main.js` |
| Chat assistant answers | the `KB` list in `js/main.js` |
| WhatsApp number | search `254785904087` in `index.html` and `js/main.js` |
| Hamburger breakpoint | `min-width:1140px` / `max-width:1139px` in `css/styles.css` |
| Fonts | the Google Fonts `<link>` in `index.html` (Archivo and Inter) |

The many `.u1`, `.u2` ... classes at the bottom of `styles.css` came from the design's inline styles. They work as they are. Rename them to meaningful names (for example `.hero-title`) whenever you like.

## 4. What is real and what still needs a server

Working in the browser: menu, three carousels, countdown, attendance calculator, add-to-calendar buttons,
WhatsApp contact form, the keyword chat assistant, donation amount and method switching.

**Not connected yet** (they show "Preview only"): member sign up, login and password reset, donations through ePay, an AI chat assistant. These need a server. Never put secret keys in `main.js`.

- **Member database.** Node.js with Express (or Next.js API routes) and PostgreSQL or MySQL. Store passwords with bcrypt, issue a login token (JWT or session cookie), and send a reset link by email (Nodemailer, SendGrid or Brevo). Tables: `members`, `password_resets`, `events`, `event_registrations`, `donations`.
- **Donations.** Your server calls ePay or the M-Pesa Daraja API. The STK push is started from the server, and the payment result comes back to a callback URL on your server. For cards, use the payment provider's hosted card fields so card numbers never touch your code. Amounts offered: $100, $500, $1,000, $10,000.
- **AI chat.** Add a server route such as `/api/chat` that calls an AI provider with the site facts as instructions, then call it from `ask()` in `main.js`.

## 5. React version (Vite)

Use this when you want reusable components, routing, and a login area.

```
npm create vite@latest kikosi-site -- --template react
cd kikosi-site
npm install
npm install react-router-dom
npm run dev
```

Folder structure to create inside `kikosi-site/`:

```
kikosi-site/
├─ index.html                      (add the Google Fonts link here)
├─ package.json
├─ vite.config.js
├─ public/
│  └─ favicon.ico
└─ src/
   ├─ main.jsx                     starts the app
   ├─ App.jsx                      puts the sections in order (or sets up routes)
   ├─ styles/
   │  └─ index.css                 copy of css/styles.css
   ├─ assets/
   │  └─ photos/ ...               copy the whole assets/ folder here
   ├─ data/                        content as data, not hard-coded markup
   │  ├─ leaders.js                name, role, photo
   │  ├─ posters.js                date, title, venue, image
   │  ├─ gallery.js
   │  ├─ faqs.js
   │  └─ chatKnowledge.js          the KB list from main.js
   ├─ hooks/
   │  ├─ useCarousel.js            autoplay, pause on hover, prev/next
   │  ├─ useCountdown.js
   │  └─ useMenu.js
   ├─ components/
   │  ├─ Header.jsx                top bar and hamburger menu
   │  ├─ Hero.jsx
   │  ├─ About.jsx
   │  ├─ Stats.jsx
   │  ├─ Events.jsx                includes PosterCarousel
   │  ├─ PosterCarousel.jsx
   │  ├─ Calendar.jsx              countdown, month grid, attendance calculator
   │  ├─ MeetingsPlanning.jsx
   │  ├─ GatheringGallery.jsx
   │  ├─ Speakers.jsx
   │  ├─ Leadership.jsx            LeadersCarousel plus the board grid
   │  ├─ GetInvolved.jsx
   │  ├─ Donate.jsx
   │  ├─ News.jsx
   │  ├─ Testimonials.jsx
   │  ├─ ContactFaq.jsx            contact form on the left, FAQ on the right
   │  ├─ ChatAssistant.jsx
   │  ├─ MemberArea.jsx            sign up, login, reset password
   │  └─ Footer.jsx
   └─ pages/                       only if you add routes (Home, Login, Dashboard)
```

How the plain files map onto React:

| Plain site | React |
|---|---|
| Each `<section id="...">` in `index.html` | one file in `components/` |
| `class="..."` | `className="..."` (and close tags like `<img />`, `<input />`) |
| `css/styles.css` | `src/styles/index.css`, imported once in `main.jsx` |
| Repeated cards (leaders, posters, FAQs) | a data array in `data/` plus `array.map(...)` |
| `js/main.js` pieces | hooks and component state (`useState`, `useEffect`) |
| `<a href="#about">` | keep as is on a single page, or use `<Link>` with routes |

A starting hook for the carousels (`src/hooks/useCarousel.js`):

```jsx
import { useEffect, useRef } from 'react';

export default function useCarousel(intervalMs = 4000) {
  const track = useRef(null);
  const paused = useRef(false);

  const step = (dir) => {
    const el = track.current;
    if (!el || !el.firstElementChild) return;
    el.scrollBy({ left: dir * (el.firstElementChild.offsetWidth + 20), behavior: 'smooth' });
  };

  useEffect(() => {
    const id = setInterval(() => {
      const el = track.current;
      if (paused.current || !el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      atEnd ? el.scrollTo({ left: 0, behavior: 'smooth' }) : step(1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return {
    track,
    prev: () => step(-1),
    next: () => step(1),
    hover: { onMouseEnter: () => (paused.current = true), onMouseLeave: () => (paused.current = false) },
  };
}
```

Use it like this:

```jsx
const { track, prev, next, hover } = useCarousel(4000);
<div className="u40" ref={track} {...hover}>{/* slides */}</div>
<button onClick={prev}>Previous</button>  <button onClick={next}>Next</button>
```

For the member area in React, add routes (`/login`, `/signup`, `/reset`, `/dashboard`) with `react-router-dom`, keep the logged-in member in a context, and send form data to your server with `fetch('/api/...')`.
