# Galactic Requisitions

A SWGOH gear + relic material calculator. Queue up to 6 units, set relic start/target
levels and a gear plan for each, and the manifest panel totals everything — credits,
relic materials, and gear salvage — live as you edit.

## Stack
Plain Node.js + Express serving a static vanilla-JS frontend. No database, no build step —
data lives in `/data/*.js` on the server and in `localStorage` in the browser for anything
you personally import. Deploys on Railway with zero configuration.

## Run locally
```
npm install
npm start
```
Visit `http://localhost:3000`.

## Deploy on Railway
1. Push this repo to GitHub (or paste these files into GitHub's web editor, your usual flow).
2. In Railway: New Project → Deploy from GitHub repo → select this repo.
3. Railway auto-detects Node, runs `npm install` then `npm start`. No env vars needed.
4. Railway assigns a public domain automatically (or add your own under Settings → Domains).

## Data accuracy — read this
**Relic materials are exact for every unit.** SWGOH's relic amplifier system costs the
same materials at the same quantities for every character in the game (only the credit
cost per tier and mat counts change by *level*, never by *unit*). That table
(`data/relicMaterials.js`) is hardcoded from swgoh.gg and verified against General
Skywalker's relic page through Relic 10.

**Gear salvage is unique per character** — SWGOH doesn't share a common gear cost table
across units. Hand-embedding all ~600+ characters' full Gear 1→13 recipes wasn't practical
to do reliably, so the app instead:

- Ships with one **verified** example recipe (General Skywalker) pulled directly from
  swgoh.gg's gear-list page.
- Falls back to a clearly-labeled **generic estimate** (rough total piece count, not
  unit-specific) for anything else, so the app never quietly pretends to precision it
  doesn't have.
- Lets you **import the real recipe** for any unit: open that unit's Gear List page on
  swgoh.gg (`swgoh.gg/units/UNIT-NAME/gear-list/`), copy the materials table, and paste
  it into the "Import exact gear recipe" panel on that unit's card. The parser extracts
  item names + quantities and saves it to your browser's local storage — from then on
  that unit shows an exact, itemized recipe instead of an estimate.

To make more units "verified" out of the box for everyone (not just your browser), add
entries to `VERIFIED_RECIPES` in `data/gearSeed.js` using the same shape as the General
Skywalker entry.

## Notes on scope
- Gear math currently models a **full Gear 1 → Gear 13 climb** per unit (matching what
  swgoh.gg's gear-list page publishes) rather than arbitrary partial ranges, since partial-
  range data isn't published in an aggregate form. If you want partial-range precision for
  a specific unit, import that unit's tier-by-tier `/gear/` page data manually.
- Relic math supports any partial range from Relic 0 through Relic 10.
- Everything computes client-side after one initial `/api/data` fetch — no per-edit network
  calls, so it stays snappy even with 6 units queued.
