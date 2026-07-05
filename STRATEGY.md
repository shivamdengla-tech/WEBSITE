# STRATEGY.md — IA, journey, and the missing sections

**Goal (fixed):** land product / internship roles at consumer & product companies. Every choice below is scored against one question: *does this make a hiring manager believe, faster, that Shivam thinks like a PM?*

---

## 1. The reframed journey

A hiring manager gives an unknown student's portfolio ~45 seconds before deciding whether to keep reading. The journey is designed for that clock:

| Stage | Time | What they must get | Where it happens |
|---|---|---|---|
| Hook | 0–10 s | A point of view, not a job title. "He studies why things sell" + "he's open to product roles." | Hero: thesis headline, status line, one CTA into the work |
| Proof | 10–60 s | *He thinks like a PM.* One teardown thesis + one killer stat absorbed without opening a PDF. | Library: featured casebooks with thesis + stat; case-study pages |
| Range | 60–120 s | He also executes: real roles, real community. | Range section: Toffee Doodle BD internship, Head of Sponsorships DOSM BITS Goa 2026–27, 3,000+ community, weekly research cadence |
| Person | optional | Voice, energy, why a chemist does this | About |
| Action | any time | Zero-friction contact + subscribe | Contact block reachable from every screen; inline Substack subscribe |

**The old order** (hero → retired numbers → thumbnails → about → capabilities → decks → writing → contact) made the reader do 4 scrolls of biography before any evidence. **The new order** puts evidence second and makes it linkable.

### Positioning note: "Deal Closer" → "Why things sell"
"Deal Closer" optimizes for a sales identity; the goal is product roles. The underlying thesis — *great products don't sell themselves; I figure out why things sell, then I sell them* — is kept verbatim as the hero's supporting statement. The display headline becomes the question the whole site answers: **why things sell**. The sales identity survives as evidence (roles, deals) instead of as the title.

## 2. New sitemap

```
/                      Home (single scroll, editorial)
  ├─ #work             Teardown library (the spine): featured casebooks + full index
  ├─ #range            What I actually do (roles + practice)
  ├─ #about            About (voice, human)
  ├─ #writing          Writing + inline subscribe
  └─ #contact          Contact + footer
/decks/<slug>/         One page per teardown (10 pages) — the case-study template
404                    Not-found page (real one, since routes now exist)
sitemap.xml, robots.txt, per-page OG/Twitter/JSON-LD
```

Rendering: static site generation (Vite SSR entry rendered to HTML per route at build time). Every page crawlable without JS; each teardown independently indexable and shareable (covers double as OG images). This is the single biggest SEO unlock available (the current site serves an empty `<div>`).

## 3. Decks become the spine

**Resolution of "where do decks live":** the PDFs live in-repo (`public/decks/`, 128 KB–19 MB). They stay the canonical artifact, but they stop being the *front door*. Each deck gets a **case-study page** built from the deck's own content (extracted from the PDFs — nothing invented):

**Case-study template** (Stripe/Mercury pattern): mono metadata line (casebook №, category, year, page count) → title + the deck's own subtitle → **one killer stat** (e.g. Mokobara: ₹12 Cr → ₹230 Cr in four years; perfume: the liquid is 4.7 % of the price) → thesis paragraph → "inside the deck" narrative beats → takeaway line → **"Open the full deck"** with format + size labelled (respect for the reader's bandwidth) → prev/next teardown navigation (page-to-page motion is where meaningful transitions live).

**Library index** (on Home): two tiers.
- *Featured casebooks* — the flagship narrative teardowns (Mokobara, Birkenstock, The New Scoop) as large editorial entries with thesis + stat.
- *Full index* — ledger rows (№ / title / category / year) for every deck, filterable by category (Brand & market teardowns · Product investigations · Industry deep dives — categories taken from the decks' own cover labels).

**Growing-library framing (mandated):** the library is presented as an ongoing practice — "new decks ship every week" — never as a fixed count. No "6 decks", no totals anywhere, including metadata.

**Per-teardown accent tokens:** each deck already has a color identity on its cover (Mokobara amber, perfume pink, Plastic Wait green…). These become systemized tokens (`--accent-mokobara` etc.) used for the index marker, key-stat, and hover state of that deck only — Linear-style discipline applied to an existing organic pattern.

## 4. Range section (replaces "what i do")

Capabilities-without-evidence read as filler. The section leads with **the real roles** and attaches only claims from the approved fact set:

1. **Sales & business development** — BD intern, Toffee Doodle. (No numbers exist → none shown.)
2. **Partnerships & sponsorships** — Head of Sponsorships, Department of Sponsorship & Marketing, BITS Goa, 2026–27.
3. **Community building** — Discord engagement & retention systems for a 3,000+ member community.
4. **Industry research & writing** — the teardown practice + Substack, shipping weekly.

The retired "$40K / 9 national brands / 6 decks" strip is deleted everywhere (StatsStrip, About body copy). The unapproved "HORECA accounts like Taj Goa" line is deleted. Honest specificity beats manufactured metrics — an inflated-sounding claim a recruiter can't verify is *negative* signal.

## 5. Missing sections — proposed and justified

| Section | Why | Status in rebuild |
|---|---|---|
| **Role-status signal** ("Open to product roles & internships") | The site's actual purpose, currently unstated. Recruiters look for it explicitly. | **Ships.** Hero status line + contact block. |
| **Resume link** | Standard recruiter expectation; absence = friction. | **Deferred (content dependency):** no resume file exists in the repo and one must not be fabricated. Slot designed in Contact; needs Shivam's PDF. Until then LinkedIn is the canonical CV surface. |
| **Selected work with outcomes** | Numbers persuade. | **Partially ships:** real outcomes exist only inside the decks (market stats, brand P&Ls) — surfaced as the key-stat layer. Personal-role metrics don't exist in the approved fact set → not invented. |
| **Social proof** (quote from DOSM colleague / Toffee Doodle / reader) | Third-party validation. | **Deferred (content dependency):** no real quote available; fabricating one is disqualifying. Layout accommodates a future quote block. |
| **Inline newsletter subscribe** | An external "Read on Substack" button leaks the one recurring-touch conversion. | **Ships:** embedded Substack subscribe on Home + case-study pages' footer CTA. |
| **Now / reading page** | Personality signal ("reads things nobody assigned"). | **Deferred (P2):** valuable but requires ongoing manual upkeep; a stale "now" page is worse than none. |
| **404 page** | Routes now exist; a branded 404 keeps deep-link mistakes inside the site. | **Ships.** |

## 6. Primary conversion action

**Primary:** email — `mailto:` with a role-shaped prompt, present in the fixed nav ("Contact"), the hero status line, and the contact block. Quiet, Swiss: no floating buttons, no pulsing pills.
**Secondary:** Substack subscribe (the "not hiring today but impressed" path — keeps him in the feed until a role opens).
**Tertiary:** LinkedIn.

Measurement note (P2, deferred): no analytics exist; adding a privacy-light counter (e.g. Plausible) would let Shivam see which teardowns convert. Not added unilaterally — it's a account/cost decision.
