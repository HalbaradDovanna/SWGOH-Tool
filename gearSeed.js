// Gear salvage requirements are UNIQUE PER CHARACTER in SWGOH (unlike relic materials).
// Each entry below is the full Gear 1 -> Gear 13 salvage list for a unit, taken directly
// from that unit's swgoh.gg "Gear List" page (e.g. swgoh.gg/units/general-skywalker/gear-list/).
//
// This seed intentionally ships with a small number of VERIFIED units. For any other unit,
// the app falls back to a labeled generic estimate, and the UI lets you paste in a unit's
// real gear-list table from swgoh.gg to get an exact, saved recipe (stored in your browser).

const VERIFIED_RECIPES = {
  "general skywalker": {
    displayName: "General Skywalker",
    source: "swgoh.gg/units/general-skywalker/gear-list/",
    pieces: [
      { name: "Mk 7 Kyrotech Shock Prod Prototype Salvage", qty: 300 },
      { name: "Mk 3 Czerka Stun Cuffs Salvage", qty: 300 },
      { name: "Mk 3 Carbanti Sensor Array Salvage", qty: 250 },
      { name: "Mk 9 Kyrotech Battle Computer Prototype Salvage", qty: 200 },
      { name: "Mk 6 Chiewab Hypo Syringe Salvage", qty: 200 },
      { name: "Mk 5 A/KT Stun Gun Prototype Salvage", qty: 100 },
      { name: "Mk 5 Merr-Sonn Thermal Detonator Prototype Salvage", qty: 100 },
      { name: "Mk 4 Chedak Comlink Prototype Salvage", qty: 100 },
      { name: "Mk 7 Nubian Security Scanner Salvage", qty: 100 },
      { name: "Mk 7 Merr-Sonn Shield Generator Salvage", qty: 100 },
      { name: "Mk 8 BioTech Implant Component", qty: 100 },
      { name: "Mk 12 ArmaTek Holo Lens Prototype Salvage", qty: 100 },
      { name: "Mk 4 Arakyd Droid Caller Salvage", qty: 80 },
      { name: "Mk 5 SoroSuub Keypad Salvage", qty: 80 },
      { name: "Mk 6 Athakam Medpac Salvage", qty: 80 },
      { name: "Mk 7 Chiewab Hypo Syringe Salvage", qty: 80 },
      { name: "Mk 4 SoroSuub Keypad Salvage", qty: 60 },
      { name: "Mk 8 BioTech Implant Salvage", qty: 60 },
      { name: "Mk 9 Fabritech Data Pad Salvage", qty: 60 },
      { name: "Mk 5 CEC Fusion Furnace Salvage", qty: 50 },
      { name: "Mk 4 Sienar Holo Projector Salvage", qty: 50 },
      { name: "Mk 11 BlasTech Weapon Mod Salvage", qty: 50 },
      { name: "Mk 9 Fabritech Data Pad Component", qty: 50 },
      { name: "Mk 10 Neuro-Saav Electrobinoculars Salvage", qty: 50 },
      { name: "Mk 9 BioTech Implant Salvage", qty: 50 },
      { name: "Mk 12 ArmaTek Fusion Furnace Prototype Salvage", qty: 50 },
      { name: "Injector Head Salvage", qty: 50 },
      { name: "Mk 8 Neuro-Saav Electrobinoculars Component", qty: 50 },
      { name: "Mk 5 Neuro-Saav Electrobinoculars Salvage", qty: 40 },
      { name: "Mk 4 Chiewab Hypo Syringe Prototype Salvage", qty: 40 },
      { name: "Mk 3 Sienar Holo Projector Salvage", qty: 40 },
      { name: "Mk 4 A/KT Stun Gun Salvage", qty: 40 },
      { name: "Mk 7 Nubian Design Tech Salvage", qty: 40 },
      { name: "Mk 12 Czerka Stun Cuffs Prototype Salvage", qty: 40 },
      { name: "Mk 12 Czerka Implant Prototype Salvage", qty: 40 },
      { name: "Mk 1 BAW Armor Mod", qty: 34 },
      { name: "Mk 12 ArmaTek Armor Plating Prototype Salvage", qty: 30 },
      { name: "Mk 12 ArmaTek Medpac Prototype Salvage", qty: 30 },
      { name: "Mk 12 ArmaTek Bayonet Prototype Salvage", qty: 30 },
      { name: "Mk 4 BAW Armor Mod Salvage", qty: 25 },
      { name: "Mk 6 Fabritech Data Pad Salvage", qty: 20 },
      { name: "Mk 8 BlasTech Weapon Mod Prototype Salvage", qty: 20 },
      { name: "Mk 2 Zaltin Bacta Gel Prototype Salvage", qty: 20 },
      { name: "Mk 1 CEC Fusion Furnace", qty: 17 },
      { name: "Mk 2 Chiewab Hypo Syringe", qty: 17 },
      { name: "Mk 2 SoroSuub Keypad Prototype", qty: 16 },
      { name: "Mk 5 BlasTech Weapon Mod Prototype", qty: 16 },
      { name: "Mk 2 Neuro-Saav Electrobinoculars Prototype", qty: 16 },
      { name: "Mk 5 BAW Armor Mod Salvage", qty: 15 },
      { name: "Mk 4 Nubian Security Scanner Prototype Salvage", qty: 15 },
      { name: "Mk 3 Arakyd Droid Caller Salvage", qty: 15 },
      { name: "Mk 6 Neuro-Saav Electrobinoculars Prototype Salvage", qty: 10 },
      { name: "Mk 5 Loronar Power Cell Salvage", qty: 10 },
      { name: "Mk 1 Zaltin Bacta Gel Prototype Salvage", qty: 10 },
      { name: "Mk 2 TaggeCo Holo Lens", qty: 6 },
      { name: "Mk 2 Sienar Holo Projector Prototype Salvage", qty: 5 },
      { name: "Mk 1 Athakam Medpac Salvage", qty: 5 },
      { name: "Mk 1 Chedak Comlink Salvage", qty: 5 },
      { name: "Mk 4 Merr-Sonn Thermal Detonator Prototype Salvage", qty: 5 },
      { name: "Mk 5 Nubian Security Scanner Prototype Salvage", qty: 5 },
      { name: "Mk 6 Loronar Power Cell Salvage", qty: 5 },
      { name: "Mk 4 Fabritech Data Pad Prototype", qty: 3 },
      { name: "Mk 3 BAW Armor Mod", qty: 3 },
      { name: "Mk 1 Sienar Holo Projector", qty: 3 },
      { name: "Mk 2 BlasTech Weapon Mod", qty: 3 },
      { name: "Mk 1 Arakyd Droid Caller", qty: 2 },
      { name: "Mk 3 BioTech Implant", qty: 2 },
      { name: "Mk 1 Czerka Stun Cuffs", qty: 2 },
      { name: "Mk 2 CEC Fusion Furnace", qty: 2 },
      { name: "Mk 3 Loronar Power Cell", qty: 2 },
      { name: "Mk 2 Fabritech Data Pad", qty: 2 },
      { name: "Mk 1 Neuro-Saav Electrobinoculars", qty: 1 },
      { name: "Mk 1 Nubian Security Scanner", qty: 1 },
      { name: "Mk 1 Chiewab Hypo Syringe Prototype", qty: 1 },
      { name: "Mk 3 TaggeCo Holo Lens Prototype", qty: 1 },
      { name: "Mk 1 TaggeCo Holo Lens", qty: 1 },
      { name: "Mk 6 BlasTech Weapon Mod Prototype", qty: 1 },
      { name: "Mk 1 A/KT Stun Gun", qty: 1 },
      { name: "Mk 1 Fabritech Data Pad", qty: 1 },
      { name: "Mk 5 BioTech Implant Prototype", qty: 1 },
      { name: "Mk 1 SoroSuub Keypad", qty: 1 },
      { name: "Mk 3 Neuro-Saav Electrobinoculars", qty: 1 },
      { name: "Mk 5 Fabritech Data Pad", qty: 1 },
      { name: "Mk 3 BlasTech Weapon Mod", qty: 1 }
    ]
  }
};

// Generic fallback: used when no verified or user-imported recipe exists for a unit.
// This is NOT character-specific. It's a rough order-of-magnitude estimate of total
// salvage pieces typically required across a full Gear 1 -> Gear 13 climb, bucketed
// by rough gear-tier band, so the app never silently pretends to certainty it doesn't have.
const GENERIC_ESTIMATE = {
  label: "Generic Estimate (not unit-specific — import real data for precision)",
  bands: [
    { band: "Gear 1-5 (early salvage)", pieces: 320 },
    { band: "Gear 6-9 (mid salvage)", pieces: 410 },
    { band: "Gear 10-11 (late salvage)", pieces: 260 },
    { band: "Gear 12 (prototype salvage)", pieces: 180 },
    { band: "Gear 13 (Mk 12 gear + components)", pieces: 90 }
  ]
};

module.exports = { VERIFIED_RECIPES, GENERIC_ESTIMATE };
