// Relic Amplifier material costs.
// Source: swgoh.gg unit relic pages (e.g. swgoh.gg/units/general-skywalker/relic/).
// These costs are UNIVERSAL — identical for every character in the game.
// Each entry is the INCREMENTAL cost to go from (level-1) to (level).
// Verified against swgoh.gg's published cumulative totals through Relic 10.

const MATERIALS = {
  ccb: { name: "Carbonite Circuit Board", tier: "low" },
  bw: { name: "Bronzium Wiring", tier: "low" },
  ct: { name: "Chromium Transistor", tier: "low" },
  ah: { name: "Aurodium Heatsink", tier: "mid" },
  ec: { name: "Electrium Conductor", tier: "mid" },
  zc: { name: "Zinbiddle Card", tier: "mid" },
  id: { name: "Impulse Detector", tier: "high" },
  am: { name: "Aeromagnifier", tier: "high" },
  gk: { name: "Gyrda Keypad", tier: "top" },
  db: { name: "Droid Brain", tier: "top" },
  cs: { name: "Coaxial Servomotor", tier: "top" },
  fsd: { name: "Fragmented Signal Data", tier: "data" },
  isd: { name: "Incomplete Signal Data", tier: "data" },
  flsd: { name: "Flawed Signal Data", tier: "data" },
  corsd: { name: "Corrupted Signal Data", tier: "data" }
};

// levels[N] = incremental materials required to go from relic (N-1) to relic N
const RELIC_LEVELS = {
  1: { credits: 10000, mats: { ccb: 40 } },
  2: { credits: 25000, mats: { ccb: 30, bw: 40, fsd: 15 } },
  3: { credits: 50000, mats: { ccb: 30, bw: 40, ct: 20, fsd: 20, isd: 15 } },
  4: { credits: 75000, mats: { ccb: 30, bw: 40, ct: 40, fsd: 20, isd: 25 } },
  5: { credits: 100000, mats: { ccb: 30, bw: 40, ct: 30, ah: 20, fsd: 20, isd: 25, flsd: 15 } },
  6: { credits: 250000, mats: { ccb: 20, bw: 30, ct: 30, ah: 20, ec: 20, fsd: 20, isd: 25, flsd: 25 } },
  7: { credits: 500000, mats: { ccb: 20, bw: 30, ct: 20, ah: 20, ec: 20, zc: 10, fsd: 20, isd: 25, flsd: 35 } },
  8: { credits: 1000000, mats: { ct: 20, ah: 20, ec: 20, zc: 20, id: 20, am: 20, fsd: 20, isd: 25, flsd: 45 } },
  9: { credits: 1500000, mats: { ec: 20, zc: 20, id: 20, am: 20, gk: 20, db: 20, isd: 30, flsd: 55 } },
  10: { credits: 2000000, mats: { id: 20, am: 20, gk: 20, db: 20, cs: 20, isd: 25, flsd: 45, corsd: 15 } }
};

const MAX_RELIC = 10;

// Compute materials needed to go from startLevel -> targetLevel (both 0-10)
function relicDelta(startLevel, targetLevel) {
  const from = Math.max(0, Math.min(startLevel, MAX_RELIC));
  const to = Math.max(0, Math.min(targetLevel, MAX_RELIC));
  const totals = { credits: 0, mats: {} };
  if (to <= from) return totals;
  for (let lvl = from + 1; lvl <= to; lvl++) {
    const step = RELIC_LEVELS[lvl];
    totals.credits += step.credits;
    for (const [key, qty] of Object.entries(step.mats)) {
      totals.mats[key] = (totals.mats[key] || 0) + qty;
    }
  }
  return totals;
}

module.exports = { MATERIALS, RELIC_LEVELS, MAX_RELIC, relicDelta };
