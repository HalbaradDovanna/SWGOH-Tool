(function () {
  "use strict";

  const LOCAL_KEY = "gr_custom_recipes_v1";
  const state = {
    data: null,
    units: [], // { id, el }
    customRecipes: loadCustomRecipes()
  };

  let nextId = 1;
  const MAX_UNITS = 6;

  function loadCustomRecipes() {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function saveCustomRecipes() {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(state.customRecipes));
  }

  function relicDeltaClient(start, target) {
    const levels = state.data.relicLevels;
    const max = state.data.maxRelic;
    const from = Math.max(0, Math.min(start, max));
    const to = Math.max(0, Math.min(target, max));
    const totals = { credits: 0, mats: {} };
    if (to <= from) return totals;
    for (let lvl = from + 1; lvl <= to; lvl++) {
      const step = levels[lvl];
      totals.credits += step.credits;
      for (const [key, qty] of Object.entries(step.mats)) {
        totals.mats[key] = (totals.mats[key] || 0) + qty;
      }
    }
    return totals;
  }

  function resolveGearRecipe(unitName) {
    const key = (unitName || "").trim().toLowerCase();
    if (!key) return null;
    if (state.customRecipes[key]) {
      return { type: "imported", pieces: state.customRecipes[key].pieces, source: "your imported data" };
    }
    if (state.data.verifiedRecipes[key]) {
      const v = state.data.verifiedRecipes[key];
      return { type: "verified", pieces: v.pieces, source: v.source };
    }
    return { type: "generic", bands: state.data.genericEstimate.bands, label: state.data.genericEstimate.label };
  }

  function parseImportText(text) {
    // Accepts pasted swgoh.gg gear-list table text in loose forms. For each contiguous
    // run of tokens, find the first standalone integer as quantity; everything else on
    // that "record" (name text before/after) becomes the item name.
    const rawLines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const pieces = [];
    let pendingName = null;

    const numRe = /^\d{1,4}$/;

    for (const line of rawLines) {
      // Strip common markdown table separators / pipes
      const cleaned = line.replace(/^\|+|\|+$/g, "").trim();
      if (!cleaned || /^-+$/.test(cleaned)) continue;

      if (numRe.test(cleaned)) {
        if (pendingName) {
          pieces.push({ name: pendingName, qty: parseInt(cleaned, 10) });
          pendingName = null;
        }
        continue;
      }

      // Line might contain both a name and a trailing/leading number, e.g.
      // "Mk 7 Kyrotech Shock Prod Prototype Salvage 300" or "300 Mk 7 ..."
      const trailingMatch = cleaned.match(/^(.*?)[\s|·]+(\d{1,4})$/);
      const leadingMatch = cleaned.match(/^(\d{1,4})[\s|·]+(.*)$/);

      if (trailingMatch && trailingMatch[1].trim().length > 2) {
        pieces.push({ name: trailingMatch[1].trim(), qty: parseInt(trailingMatch[2], 10) });
        pendingName = null;
      } else if (leadingMatch && leadingMatch[2].trim().length > 2) {
        pieces.push({ name: leadingMatch[2].trim(), qty: parseInt(leadingMatch[1], 10) });
        pendingName = null;
      } else if (/[a-zA-Z]/.test(cleaned)) {
        // Looks like a name-only line; wait for a quantity on the next line
        pendingName = cleaned;
      }
    }
    return pieces;
  }

  function createUnitCard() {
    const tpl = document.getElementById("unitCardTemplate");
    const node = tpl.content.firstElementChild.cloneNode(true);
    const id = nextId++;
    node.dataset.id = id;

    const nameInput = node.querySelector(".unit-name");
    const removeBtn = node.querySelector(".remove-unit");
    const gearMode = node.querySelector(".gear-mode");
    const recipeTag = node.querySelector('[data-role="recipeTag"]');
    const relicStart = node.querySelector(".relic-start");
    const relicTarget = node.querySelector(".relic-target");
    const relicStartVal = node.querySelector(".relic-start-val");
    const relicTargetVal = node.querySelector(".relic-target-val");
    const importTextarea = node.querySelector(".import-textarea");
    const importParseBtn = node.querySelector(".import-parse-btn");
    const importClearBtn = node.querySelector(".import-clear-btn");
    const importStatus = node.querySelector('[data-role="importStatus"]');
    const summary = node.querySelector('[data-role="unitSummary"]');

    function refreshRecipeTag() {
      const recipe = resolveGearRecipe(nameInput.value);
      if (!recipe) {
        recipeTag.textContent = "";
        recipeTag.className = "recipe-tag";
        return;
      }
      recipeTag.className = "recipe-tag " + recipe.type;
      if (recipe.type === "verified") recipeTag.textContent = "✓ Verified recipe (" + recipe.source + ")";
      else if (recipe.type === "imported") recipeTag.textContent = "✓ Using your imported recipe";
      else recipeTag.textContent = "≈ Generic estimate — import exact data above for precision";
    }

    nameInput.addEventListener("input", () => { refreshRecipeTag(); renderAll(); });
    removeBtn.addEventListener("click", () => {
      node.remove();
      state.units = state.units.filter(u => u.id !== id);
      renderAll();
      refreshAddButton();
    });
    gearMode.addEventListener("change", renderAll);

    function syncRelic() {
      let s = parseInt(relicStart.value, 10);
      let t = parseInt(relicTarget.value, 10);
      if (t < s) { t = s; relicTarget.value = t; }
      relicStartVal.textContent = s;
      relicTargetVal.textContent = t;
      renderAll();
    }
    relicStart.addEventListener("input", syncRelic);
    relicTarget.addEventListener("input", syncRelic);

    importParseBtn.addEventListener("click", () => {
      const name = nameInput.value.trim();
      if (!name) {
        importStatus.textContent = "Enter a unit name first.";
        return;
      }
      const pieces = parseImportText(importTextarea.value);
      if (!pieces.length) {
        importStatus.textContent = "Couldn't parse any items — check the pasted format.";
        return;
      }
      state.customRecipes[name.toLowerCase()] = { pieces, savedAt: Date.now() };
      saveCustomRecipes();
      importStatus.textContent = `Saved ${pieces.length} items for "${name}".`;
      refreshRecipeTag();
      renderAll();
    });

    importClearBtn.addEventListener("click", () => {
      const name = nameInput.value.trim().toLowerCase();
      if (name && state.customRecipes[name]) {
        delete state.customRecipes[name];
        saveCustomRecipes();
        importStatus.textContent = "Saved recipe cleared.";
        refreshRecipeTag();
        renderAll();
      } else {
        importStatus.textContent = "No saved recipe for this name.";
      }
    });

    state.units.push({ id, el: node, get: () => ({
      name: nameInput.value.trim(),
      gearMode: gearMode.value,
      relicStart: parseInt(relicStart.value, 10),
      relicTarget: parseInt(relicTarget.value, 10)
    }), summaryEl: summary });

    refreshRecipeTag();
    return node;
  }

  function refreshAddButton() {
    document.getElementById("addUnitBtn").disabled = state.units.length >= MAX_UNITS;
    document.getElementById("emptyHint").classList.toggle("visible", state.units.length === 0);
  }

  function addUnit() {
    if (state.units.length >= MAX_UNITS) return;
    const card = createUnitCard();
    document.getElementById("unitList").appendChild(card);
    refreshAddButton();
    renderAll();
  }

  function formatNum(n) {
    return n.toLocaleString("en-US");
  }

  function renderAll() {
    const relicTotals = { credits: 0, mats: {} };
    const gearNamed = {}; // name -> qty
    let gearGenericTotal = 0;
    let anyGear = false, anyGenericGear = false, anyNamedGear = false;

    state.units.forEach(u => {
      const cfg = u.get();
      const bits = [];

      // Relic
      if (cfg.relicTarget > cfg.relicStart) {
        const delta = relicDeltaClient(cfg.relicStart, cfg.relicTarget);
        relicTotals.credits += delta.credits;
        for (const [k, v] of Object.entries(delta.mats)) {
          relicTotals.mats[k] = (relicTotals.mats[k] || 0) + v;
        }
        bits.push(`Relic ${cfg.relicStart} → ${cfg.relicTarget}: ${formatNum(delta.credits)} credits`);
      }

      // Gear
      if (cfg.gearMode === "full" && cfg.name) {
        anyGear = true;
        const recipe = resolveGearRecipe(cfg.name);
        if (recipe.type === "generic") {
          anyGenericGear = true;
          const total = recipe.bands.reduce((s, b) => s + b.pieces, 0);
          gearGenericTotal += total;
          bits.push(`Gear 1→13 (${cfg.name}): ≈${formatNum(total)} assorted pieces — estimate`);
        } else {
          anyNamedGear = true;
          recipe.pieces.forEach(p => {
            gearNamed[p.name] = (gearNamed[p.name] || 0) + p.qty;
          });
          const total = recipe.pieces.reduce((s, p) => s + p.qty, 0);
          bits.push(`Gear 1→13 (${cfg.name}): ${formatNum(total)} pieces — ${recipe.type}`);
        }
      }

      u.summaryEl.textContent = bits.length ? bits.join("  //  ") : "No upgrades set for this unit yet.";
    });

    // Credits
    document.getElementById("totalCredits").textContent = formatNum(relicTotals.credits);

    // Relic manifest
    const relicList = document.getElementById("relicManifest");
    const relicEmpty = document.getElementById("relicEmpty");
    relicList.innerHTML = "";
    const relicKeys = Object.keys(relicTotals.mats);
    relicEmpty.style.display = relicKeys.length ? "none" : "block";
    relicKeys
      .sort((a, b) => relicTotals.mats[b] - relicTotals.mats[a])
      .forEach(k => {
        const li = document.createElement("li");
        const matName = state.data.materials[k] ? state.data.materials[k].name : k;
        li.innerHTML = `<span class="mname">${matName}</span><span class="mqty">${formatNum(relicTotals.mats[k])}</span>`;
        relicList.appendChild(li);
      });

    // Gear manifest
    const gearList = document.getElementById("gearManifest");
    const gearEmpty = document.getElementById("gearEmpty");
    gearList.innerHTML = "";
    const gearKeys = Object.keys(gearNamed);
    const hasGear = gearKeys.length > 0 || gearGenericTotal > 0;
    gearEmpty.style.display = hasGear ? "none" : "block";
    gearKeys
      .sort((a, b) => gearNamed[b] - gearNamed[a])
      .forEach(name => {
        const li = document.createElement("li");
        li.innerHTML = `<span class="mname">${name}</span><span class="mqty">${formatNum(gearNamed[name])}</span>`;
        gearList.appendChild(li);
      });
    if (gearGenericTotal > 0) {
      const li = document.createElement("li");
      li.innerHTML = `<span class="mname">≈ Assorted salvage (generic estimate units)</span><span class="mqty">≈${formatNum(gearGenericTotal)}</span>`;
      gearList.appendChild(li);
    }

    // Badge
    const badge = document.getElementById("gearBadge");
    if (!anyGear) { badge.textContent = "—"; }
    else if (anyNamedGear && !anyGenericGear) { badge.textContent = "EXACT"; badge.className = "exact-badge"; }
    else if (anyGenericGear && !anyNamedGear) { badge.textContent = "ESTIMATE"; badge.className = "mixed-badge"; }
    else { badge.textContent = "MIXED"; badge.className = "mixed-badge"; }

    document.getElementById("manifestStatus").textContent = state.units.length ? "ACTIVE" : "STANDBY";
  }

  function buildManifestText() {
    const lines = [];
    lines.push("GALACTIC REQUISITIONS — MANIFEST");
    lines.push("Generated " + new Date().toLocaleString());
    lines.push("");
    state.units.forEach(u => {
      const cfg = u.get();
      if (!cfg.name) return;
      lines.push(`UNIT: ${cfg.name}`);
      lines.push(`  Gear plan: ${cfg.gearMode === "full" ? "1 -> 13" : "skip"}`);
      lines.push(`  Relic: ${cfg.relicStart} -> ${cfg.relicTarget}`);
      lines.push("");
    });
    lines.push("Totals shown in the manifest panel reflect the combined queue.");
    lines.push(document.getElementById("totalCredits").textContent + " credits");
    lines.push("");
    lines.push("-- Relic Materials --");
    document.querySelectorAll("#relicManifest li").forEach(li => {
      lines.push(li.querySelector(".mname").textContent + ": " + li.querySelector(".mqty").textContent);
    });
    lines.push("");
    lines.push("-- Gear Salvage --");
    document.querySelectorAll("#gearManifest li").forEach(li => {
      lines.push(li.querySelector(".mname").textContent + ": " + li.querySelector(".mqty").textContent);
    });
    return lines.join("\n");
  }

  async function init() {
    const res = await fetch("/api/data");
    state.data = await res.json();

    const datalist = document.getElementById("unitNamesList");
    state.data.unitNames.forEach(n => {
      const opt = document.createElement("option");
      opt.value = n;
      datalist.appendChild(opt);
    });

    document.getElementById("addUnitBtn").addEventListener("click", addUnit);
    document.getElementById("copyBtn").addEventListener("click", async () => {
      await navigator.clipboard.writeText(buildManifestText());
      const btn = document.getElementById("copyBtn");
      const orig = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => (btn.textContent = orig), 1500);
    });
    document.getElementById("downloadBtn").addEventListener("click", () => {
      const blob = new Blob([buildManifestText()], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "galactic-requisitions-manifest.txt";
      a.click();
    });

    addUnit();
    addUnit();
    refreshAddButton();
    renderAll();
  }

  init();
})();
