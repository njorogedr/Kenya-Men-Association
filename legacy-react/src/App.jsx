import { useRef, useState } from 'react';
import logoImage from './assets/images/logo.jpg';
import { faqs } from './data/faqs';
import { leaders } from './data/leaders';
import { posters } from './data/posters';
import { useCarousel } from './hooks/useCarousel';
import { useCountdown } from './hooks/useCountdown';
import { useMenuToggle } from './hooks/useMenuToggle';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Calendar', href: '#calendar' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Donate', href: '#donate' },
  { label: 'Contact', href: '#contact' },
  { label: 'Member Login', href: '#member', extraClass: 'u8' },
];

const stats = [
  { value: '25', title: 'Officials leading the Kikosi', note: 'Executive and departmental leaders' },
  { value: '19', title: 'Leadership dockets', note: 'Two still open for volunteers' },
  { value: '250+', title: 'Men expected at the Ignite Summit', note: 'KICC, 14 November 2026' },
  { value: '300–500', title: 'Men targeted at KICC', note: 'From all walks of life' },
  { value: 'Ksh 250,000', title: 'Ignite Summit budget', note: 'Raised by members and well-wishers' },
  { value: 'Ksh 2,000', title: 'Asked of each official', note: '25 officials give Ksh 50,000, or 20% of the budget' },
  { value: '5', title: 'Pillars of discussion', note: 'Wealth, mental health, fatherhood, mentoring, panels' },
  { value: '2', title: 'Flagship summits in 2026', note: 'Elevate on 10 October, Ignite on 14 November' },
];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kikosi Cha Wanaume Kenya',
  alternateName: 'Kenya Men Association',
  url: 'https://www.kikosiwanaumekenya.org',
  slogan: 'Restore the Pillar',
  description: 'Kikosi Cha Wanaume Kenya is a brotherhood where men heal, rebuild and rediscover their purpose.',
  sameAs: [
    'https://wa.me/254785904087',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    telephone: '+254785904087',
    areaServed: 'KE',
  },
};

function Header({ isOpen, toggle, close }) {
  return (
    <header className="u2">
      <div className="w u3">
        <a className="u4" href="#top" onClick={close}>
          <span className="u5">KIKOSI CHA WANAUME KENYA</span>{' '}
          <span className="u6"><span className="pp">| </span>Kenya Men Association</span>
        </a>

        <button
          type="button"
          className={`mb ${isOpen ? 'x' : ''}`}
          id="menuBtn"
          aria-label="Menu"
          aria-expanded={isOpen}
          onClick={toggle}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`mn ${isOpen ? 'open' : ''}`} id="mainNav" aria-label="Main navigation">
          {navItems.map(({ label, href, extraClass }) => (
            <a key={label} href={href} className={extraClass || ''} onClick={close}>
              {label}
            </a>
          ))}
          <a className="b u9" href="#events" onClick={close}>Register</a>
        </nav>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="u11" id="top">
      <div className="w">
        <div className="u12">
          <div>
            <p className="k u13">Kenya Men Association</p>
            <h1 className="hh1 u14">Restore the Pillar.</h1>
            <p className="u15">Connecting Men, Building Legacies, Transforming Communities.</p>
            <p className="u16">
              <span className="u17">Protect</span> each other <span className="u18">·</span>{' '}
              <span className="u17">Lift</span> each other <span className="u19">·</span>{' '}
              <span className="u17">Build</span> together
            </p>
            <div className="u20">
              <a className="b u21" href="#events">Register for the Summit</a>
              <a className="b u22" href="#involved">Join the Brotherhood</a>
              <a className="b u23" href="https://wa.me/254785904087">WhatsApp us</a>
            </div>
          </div>

          <div className="u24">
            <div className="u25">
              <img className="u26" src={logoImage} alt="Kikosi cha Wanaume Kenya Men Association logo" />
            </div>
          </div>
        </div>

        <div className="u27">
          <div>
            <span className="u28">Next gathering</span>
            <br />
            Saturday, 14 November 2026 · 9:00 AM sharp
          </div>
          <div>
            <span className="u28">Venue</span>
            <br />
            KICC, Nairobi
          </div>
          <div>
            <span className="u28">Theme</span>
            <br />
            Restoring the Pillar
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="sec u29">
      <div className="w u30">
        <div>
          <p className="k u31">About us</p>
          <h2 className="h2">A space where men heal, rebuild and rediscover their purpose.</h2>
          <p className="p">In today’s society it often feels like men have been left behind. Modern men face unprecedented pressures, yet frequently walk the journey alone, with no one to stand in their corner.</p>
          <p className="p">Kikosi cha Wanaume was founded so that men are not judged, criticized or misunderstood, but welcomed into a dedicated, sacred space of brotherhood.</p>
          <p className="p u32">Bega kwa bega, hakuna anayeachwa nyuma. <span className="u33">Shoulder to shoulder, no man is left behind.</span></p>
        </div>

        <div className="c u34">
          <p className="k u35">Message from the founder</p>
          <p className="u36">“We refused to sit back any longer. We chose to create a dedicated space where men come to heal, rebuild, and rediscover their purpose.”</p>
          <p className="u37">Apostle Ambassador Kelvin Nuthu Waithaka<br /><span className="u33">Founder &amp; National Chairman</span></p>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section id="stats" className="sec u38">
      <div className="w">
        <p className="k u13">By the numbers</p>
        <h2 className="h2 u39">Our brotherhood in numbers.</h2>
        <p className="p u40">Figures from our 2026 summit plans and leadership structure.</p>

        <div className="u41">
          {stats.map(({ value, title, note }, index) => (
            <div key={title} className={index % 3 === 0 ? 'u42' : index % 3 === 1 ? 'u46' : 'u47'}>
              <p className="u43">{value}</p>
              <p className="u44">{title}</p>
              <p className="u45">{note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarouselShell({ id, title, items, renderItem }) {
  const trackRef = useRef(null);
  const { prev, next } = useCarousel(trackRef, { interval: 4000 });

  return (
    <div className="u69">
      <div className="u70">
        <h3 className="u71">{title}</h3>
        <div className="u72">
          <button type="button" className="ar u73" aria-label={`Previous ${title}`} onClick={prev}>◀</button>
          <button type="button" className="ar u73" aria-label={`Next ${title}`} onClick={next}>▶</button>
        </div>
      </div>

      <div className="u74" id={id} ref={trackRef} tabIndex={0} aria-label={title}>
        {items.map(renderItem)}
      </div>
    </div>
  );
}

function EventsSection() {
  return (
    <section id="events" className="sec u52">
      <div className="w">
        <p className="k u31">Upcoming events</p>
        <h2 className="h2 u53">Show up. Learn. Grow together.</h2>

        <div className="u54">
          <article className="c u55">
            <p className="k u56">Saturday, 10 October 2026</p>
            <h3 className="u57">Elevate Men’s Breakfast Summit</h3>
            <p className="p">A strategic pitstop to equip modern men with the blueprint for personal, mental and financial mastery.</p>
            <ul className="li u58">
              <li>9:00 AM – 2:00 PM · Entry absolutely free</li>
              <li>Blue Springs Hotel, Nairobi (Thika Road, behind Garden City Mall)</li>
              <li>Chief Guest: Ambassador Dr. John CW</li>
            </ul>
            <a className="b u21" href="#involved">Register now</a>
          </article>

          <article className="c u61">
            <p className="k u13">Saturday, 14 November 2026</p>
            <h3 className="u62">Ignite Men Breakfast &amp; Growth Summit</h3>
            <p className="p u63">Theme: “Restoring the Pillar — Protect Each Other, Lift Each Other, Build Together.”</p>
            <ul className="li u64">
              <li>9:00 AM sharp</li>
              <li>Kenyatta International Convention Centre (KICC), Nairobi</li>
              <li>300–500 men from all walks of life</li>
            </ul>
            <p className="u67">A powerful, judgment-free space to network and sharpen one another. Iron sharpens iron.</p>
          </article>
        </div>

        <CarouselShell
          id="poster-car"
          title="Event posters"
          items={posters}
          renderItem={(poster) => (
            <figure key={poster.title} className={poster.accent === 'green' ? 'u81' : 'u75'}>
              <img className="u76" src={poster.image} alt={poster.title} />
              <figcaption className="u77">
                <p className="k u78">{poster.date}</p>
                <p className="u79">{poster.title}</p>
                <p className="u80">{poster.location}</p>
              </figcaption>
            </figure>
          )}
        />
      </div>
    </section>
  );
}

function CalendarSection() {
  const nextEventDate = new Date('2026-11-14T09:00:00+03:00');
  const countdown = useCountdown(nextEventDate);
  const [registered, setRegistered] = useState('');
  const [attended, setAttended] = useState('');
  const [nextEventTotal, setNextEventTotal] = useState('');

  const turnout = Number(registered) > 0 ? `${Math.round((Number(attended) / Number(registered)) * 100)}%` : '—';
  const projected = Number(registered) > 0 && Number(nextEventTotal) > 0 ? `${Math.round((Number(nextEventTotal) * Number(attended)) / Number(registered))} men` : '—';

  return (
    <section id="calendar" className="sec u29">
      <div className="w">
        <p className="k u31">Events calendar</p>
        <h2 className="h2 u53">Past gatherings, next event.</h2>

        <div className="u82">
          <div className="u83">
            <p className="k u13">Next event</p>
            <h3 className="u84">Ignite Men Breakfast &amp; Growth Summit</h3>
            <p className="u85">Saturday, 14 November 2026 · 9:00 AM sharp · KICC, Nairobi</p>
            <p className="u86">
              {countdown.isExpired ? 'Happening now' : `${countdown.days} days ${countdown.hours} hrs ${countdown.minutes} min to go`}
            </p>
            <div className="u87">
              <a className="b u21" href="https://wa.me/254785904087?text=Hello%2C%20I%20would%20like%20to%20register%20for%20the%20Ignite%20Men%20Breakfast%20%26%20Growth%20Summit%20on%2014%20November%202026%20at%20KICC.%20My%20full%20name%20is%3A%20" target="_blank" rel="noreferrer">Register now</a>
              <a className="b u22" href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;text=Ignite+Men+Breakfast+%26+Growth+Summit&amp;dates=20261114T060000Z/20261114T110000Z&amp;details=Restoring+the+Pillar.+9%3A00+AM+sharp.&amp;location=KICC%2C+Nairobi%2C+Kenya" target="_blank" rel="noreferrer">Add to Google Calendar</a>
            </div>
          </div>

          <div className="c u88">
            <p className="k u89">November 2026</p>
            <div className="u90">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => <div key={day} className="u91">{day}</div>)}
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30].map((day) => (
                <div key={day} className={day === 14 ? 'u93' : 'u92'}>{day}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="u94">
          <div className="c u88">
            <h3 className="u95">Meetings &amp; events</h3>
            <div className="u96">
              <div className="u97">27 OCT</div>
              <div>
                <p className="u98">Leaders’ appreciation &amp; strategy meeting</p>
                <p className="u80">OHO Hotel · Summit planning and delegation</p>
              </div>
            </div>
            <div className="u96">
              <div className="u97">10 OCT</div>
              <div>
                <p className="u98">Elevate Men’s Breakfast Summit</p>
                <p className="u80">Blue Springs Hotel, Nairobi · Chief guest Ambassador Dr. John CW</p>
              </div>
            </div>
            <div className="u96">
              <div className="u100">TUE &amp; THU</div>
              <div>
                <p className="u98">Leadership training</p>
                <p className="u80">One month · 9:00 – 10:00 PM</p>
              </div>
            </div>
            <div className="u96">
              <div className="u101">14 NOV</div>
              <div>
                <p className="u98">Ignite Men Breakfast &amp; Growth Summit</p>
                <p className="u80">KICC, Nairobi · 250+ men expected</p>
              </div>
            </div>
          </div>

          <div className="c u88">
            <h3 className="u95">Attendance calculator</h3>
            <p className="p u102">Enter a past event’s numbers to see turnout, then project the next one.</p>
            <div className="u103">
              <label className="lb" htmlFor="ac-r">Men registered (past event)</label>
              <input className="in" id="ac-r" type="number" min="0" value={registered} onChange={(event) => setRegistered(event.target.value)} />
            </div>
            <div className="u103">
              <label className="lb" htmlFor="ac-a">Men who attended</label>
              <input className="in" id="ac-a" type="number" min="0" value={attended} onChange={(event) => setAttended(event.target.value)} />
            </div>
            <div className="u103">
              <label className="lb" htmlFor="ac-n">Men registered (next event)</label>
              <input className="in" id="ac-n" type="number" min="0" value={nextEventTotal} onChange={(event) => setNextEventTotal(event.target.value)} />
            </div>

            <div className="u104">
              <div>
                <p className="u105">Turnout rate</p>
                <p className="u106">{turnout}</p>
              </div>
              <div>
                <p className="u105">Projected attendance</p>
                <p className="u107">{projected}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section id="leadership" className="sec u38">
      <div className="w">
        <p className="k u13">Leadership</p>
        <h2 className="h2 u53">The men leading the Kikosi.</h2>
        <h3 className="u127">Executive Board</h3>
        <p className="u128">Kikosi Cha Wanaume Kenya | Kenya Men Association</p>

        <CarouselShell
          id="lead-car"
          title="Leaders in the spotlight"
          items={leaders}
          renderItem={(leader) => (
            <article key={leader.name} className={leader.role.includes('Chairman') ? 'u132' : 'u136'}>
              <img className="u133" src={leader.image} alt={leader.name} />
              <div>
                <p className="k u134">{leader.role}</p>
                <p className="u135">{leader.name}</p>
              </div>
            </article>
          )}
        />
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="sec u52">
      <div className="w">
        <p className="k u31">Frequently asked</p>
        <h2 className="h2 u53">Questions men ask before they join.</h2>

        <div className="u110">
          {faqs.map((item) => (
            <details key={item.question} className="f" open={item.question === 'When is the next gathering?'}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function InvolvedSection() {
  return (
    <section id="involved" className="sec u29">
      <div className="w">
        <p className="k u31">Get involved</p>
        <h2 className="h2 u53">No amount given is considered small.</h2>
        <div className="g">
          <div className="c u88"><h3>Register for a summit</h3><p className="u146">Write your full name on the list in the group, and send names for any guests you bring.</p><div className="u87"><a className="b u147" href="#events">Register</a><a className="b u148" href="https://wa.me/254785904087" target="_blank" rel="noreferrer">WhatsApp</a></div></div>
          <div className="c u88"><h3>Support the Ignite Summit</h3><p className="u39">Help us raise the Ksh 250,000 budget. Leaders are asked to give Ksh 2,000 each. Money, ideas, time and new friends are all welcome.</p><p className="u149">Joint account: [ACCOUNT DETAILS]</p></div>
          <div className="c u88"><h3>Summit Marathon Challenge</h3><p>Each day two members are guests of the day, supported by everyone to reach their fundraising target.</p></div>
          <div className="c u88"><h3>Take up a docket</h3><p>Open roles include Administrative Secretary and Security &amp; Intelligence. A resource mobilization committee is also being formed.</p></div>
          <div className="c u88"><h3>Leadership training</h3><p>One month of capacity-building classes, twice weekly: Tuesdays and Thursdays, 9:00 – 10:00 PM.</p></div>
        </div>
      </div>
    </section>
  );
}

function DonateSection() {
  return (
    <section id="donate" className="sec u38">
      <div className="w u150">
        <div>
          <p className="k u31">Donate</p>
          <h2 className="h2 u53">Support the pillar.</h2>
          <p className="p u49">Your contribution helps us raise the Ignite Summit budget and equip more men with practical tools for healing, leadership, and financial stability.</p>
        </div>

        <div className="c u152">
          <p className="k u31">Give once, give monthly, give with purpose.</p>
          <div className="u151">
            <button className="tl on" type="button" aria-pressed="true">$50</button>
            <button className="tl" type="button" aria-pressed="false">$100</button>
            <button className="tl" type="button" aria-pressed="false">$250</button>
            <button className="tl" type="button" aria-pressed="false">$500</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="u179">
      <div className="w u180">
        <div>
          <h3 className="u181">Kikosi Cha Wanaume Kenya</h3>
          <p className="u182">Restoring the Pillar. Connecting men, building legacies, transforming communities.</p>
        </div>

        <div>
          <h3 className="u181">Quick links</h3>
          <div className="u183">
            <span className="u184"><a href="#about">About</a></span>
            <span className="u184"><a href="#events">Events</a></span>
            <span className="u184"><a href="#calendar">Calendar</a></span>
            <span className="u184"><a href="#leadership">Leadership</a></span>
            <span className="u184"><a href="#donate">Donate</a></span>
            <span className="u184"><a href="#contact">Contact</a></span>
          </div>
        </div>

        <div>
          <h3 className="u181">Contact</h3>
          <p className="u185">WhatsApp: +254 785 904 087</p>
          <p className="u185">Phone: +254 718 018 229</p>
        </div>
      </div>
      <div className="w u188">© 2026 Kikosi Cha Wanaume Kenya | Kenya Men Association</div>
    </footer>
  );
}

export default function App() {
  const { isOpen, toggle, close } = useMenuToggle();

  return (
    <div className="u1">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header isOpen={isOpen} toggle={toggle} close={close} />
      <div className="u10" aria-hidden="true" />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <EventsSection />
        <CalendarSection />
        <FaqSection />
        <LeadershipSection />
        <InvolvedSection />
        <DonateSection />
      </main>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
    </div>
  );
}
