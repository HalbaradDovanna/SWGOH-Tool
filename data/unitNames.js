// A convenience autocomplete list of well-known units. Not exhaustive — the app accepts
// any typed unit name for both the Gear and Relic calculators, since Relic costs are
// universal and Gear falls back to the generic estimate (or an imported recipe) for
// anything not in this list.
const UNIT_NAMES = [
  "General Skywalker", "Darth Revan", "Jedi Knight Revan", "Grand Admiral Thrawn",
  "Bastila Shan", "Bastila Shan (Fallen)", "Padme Amidala", "Rey", "Rey (Jedi Training)",
  "Kylo Ren", "Kylo Ren (Unmasked)", "Supreme Leader Kylo Ren", "Darth Vader",
  "Emperor Palpatine", "Sith Eternal Emperor", "Grand Master Yoda", "Yoda",
  "Ahsoka Tano", "Ahsoka Tano (Fulcrum)", "Boba Fett", "Boba Fett (Scion of Jango)",
  "Han Solo", "Chewbacca", "Luke Skywalker", "Jedi Knight Luke Skywalker",
  "Commander Luke Skywalker", "Grand Admiral Thrawn (Fleet Commander)",
  "General Grievous", "Count Dooku", "Darth Maul", "Savage Opress", "Mother Talzin",
  "Jedi Master Kenobi", "Obi-Wan Kenobi", "Mace Windu", "Plo Koon", "Aayla Secura",
  "Qui-Gon Jinn", "Sith Trooper", "Moff Gideon", "The Mandalorian", "The Armorer",
  "Bo-Katan Kryze", "Cad Bane", "IG-11", "IG-88", "Zam Wesell", "Jango Fett",
  "Sith Empire Trooper", "Darth Malak", "Darth Nihilus", "Darth Traya",
  "Hermit Yoda", "General Skywalker's 501st", "Captain Rex", "Commander Ahsoka Tano",
  "Padawan Obi-Wan", "Anakin Skywalker (Fallen)", "Wat Tambor", "General Kalani",
  "B1 Battle Droid", "B2 Super Battle Droid", "Nute Gunray", "Rose Tico",
  "Finn", "Poe Dameron", "BB-8", "C-3PO", "R2-D2", "Chirrut Imwe", "Baze Malbus",
  "Jyn Erso", "Cassian Andor", "K-2SO", "Director Krennic", "Grand Moff Tarkin",
  "Admiral Piett", "Veers", "Snowtrooper", "Range Trooper", "Shoretrooper",
  "Death Trooper", "Wampa", "Hoth Rebel Scout", "Hoth Rebel Soldier",
  "Ewok Elder", "Chief Chirpa", "Logray", "Wicket", "Paploo",
  "Nightsister Zombie", "Nightsister Acolyte", "Talia", "Old Daka",
  "Asajj Ventress", "Sith Assassin", "Sith Marauder", "Barriss Offee",
  "Luminara Unduli", "Kit Fisto", "Shaak Ti", "Ima-Gun Di",
  "Jedi Knight Anakin", "Clone Wars Chewbacca", "Wrecker", "Hunter",
  "Omega", "Echo", "Crosshair", "Hera Syndulla", "Kanan Jarrus",
  "Ezra Bridger", "Sabine Wren", "Zeb Orrelios", "Chopper",
  "Thrawn (Season 4)", "Grand Inquisitor", "Fifth Brother", "Seventh Sister",
  "Darth Sion", "HK-47", "T3-M4", "Bindo", "Old Ben",
  "Enfys Nest", "Qi'ra", "Lando Calrissian", "L3-37", "Beckett",
  "Jabba the Hutt", "Bossk", "Dengar", "IG-86", "4-LOM", "Zuckuss",
  "Nightsister Spirit", "Mother Talzin's Handmaiden", "Geonosian Soldier",
  "Poggle the Lesser", "Sun Fac", "Aurra Sing", "Embo", "Hondo Ohnaka",
  "First Order Executioner", "First Order Officer", "First Order Stormtrooper",
  "Kylo Ren (Reborn Vader)", "General Hux", "Captain Phasma",
  "Resistance Trooper", "Resistance Pilot", "Amilyn Holdo", "Vice Admiral Holdo",
  "Rey (Scavenger)", "Rey & BB-8", "Finn (Resistance Fighter)"
];

module.exports = { UNIT_NAMES };
