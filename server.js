const express = require("express");
const path = require("path");

const { MATERIALS, RELIC_LEVELS, MAX_RELIC } = require("./data/relicMaterials");
const { VERIFIED_RECIPES, GENERIC_ESTIMATE } = require("./data/gearSeed");
const { UNIT_NAMES } = require("./data/unitNames");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Single bootstrap endpoint — the frontend loads this once and does all math client-side.
app.get("/api/data", (req, res) => {
  res.json({
    materials: MATERIALS,
    relicLevels: RELIC_LEVELS,
    maxRelic: MAX_RELIC,
    verifiedRecipes: VERIFIED_RECIPES,
    genericEstimate: GENERIC_ESTIMATE,
    unitNames: UNIT_NAMES
  });
});

app.get("/health", (req, res) => res.send("ok"));

app.listen(PORT, () => {
  console.log(`Galactic Requisitions terminal online — port ${PORT}`);
});
