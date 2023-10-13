import fs from "fs";
const file = "./products.json";

const names = [
    "Aiden",
    "Ethan",
    "Matthew",
    "Michael",
    "Daniel",
    "Jackson",
    "Levi",
    "Owen",
    "Logan",
    "Caden",
    "Carter",
    "Grayson",
    "Benjamin",
    "Liam",
    "Noah",
    "William",
    "James",
    "Henry",
    "Theodore",
    "Lucas",
    "Oliver",
    "Elijah",
    "Jackson",
    "Levi",
    "Owen",
    "Logan",
    "Caden",
    "Carter",
    "Grayson",
    "Benjamin",
    "Liam",
    "Noah",
    "William",
    "James",
    "Henry",
    "Theodore",
    "Lucas",
    "Oliver",
    "Elijah",
    "Isabella",
    "Sophia",
    "Emma",
    "Olivia",
    "Ava",
    "Mia",
    "Evelyn",
    "Abigail",
    "Charlotte",
    "Amelia",
    "Harper",
    "Avery",
    "Sofia",
    "Lily",
    "Emily",
    "Aria",
    "Aaliyah",
    "Amelia",
    "Isla",
    "Ava",
    "Aurora",
    "Zoe",
    "Olivia",
    "Sophia",
    "Emma",
    "Olivia",
    "Ava",
    "Mia",
    "Evelyn",
    "Abigail",
    "Charlotte",
    "Amelia",
    "Harper",
    "Avery",
    "Sofia",
    "Lily",
    "Emily",
    "Aria",
    "Aaliyah",
];

const projectNames = [
    "Ace",
    "Acumen",
    "Apex",
    "Astra",
    "Aurora",
    "Beacon",
    "Catalyst",
    "Celestial",
    "Citadel",
    "Comet",
    "Compendium",
    "Constellation",
    "Cosmos",
    "Crest",
    "Crucible",
    "Cyber",
    "Dawn",
    "Delta",
    "Discovery",
    "Dynamo",
    "Eclipse",
    "Elevation",
    "Ember",
    "Empyrean",
    "Enigma",
    "Eon",
    "Equinox",
    "Essence",
    "Eternity",
    "Everest",
    "Evolution",
    "Exemplar",
    "Eximious",
    "Exodus",
    "Exemplar",
    "Eximious",
    "Exodus",
    "Exosphere",
    "Fahrenheit",
    "Fahrenheit",
    "Finity",
    "Flair",
    "Flourish",
    "Flux",
    "Forefront",
    "Forever",
    "Fortify",
    "Frontier",
    "Fusion",
    "Galaxy",
    "Genesis",
    "Horizon",
    "Illuminate",
    "Infinity",
    "Inspire",
    "Insight",
    "Innovation",
    "Inspire",
    "Insight",
    "Innovation",
    "Intellect",
    "Kaleidoscope",
    "Legacy",
    "Lighthouse",
    "Limitless",
    "Luminosity",
    "Magellan",
    "Magnum Opus",
    "Mavericks",
    "Momentum",
    "Mosaic",
    "Muse",
    "Mystique",
    "Nebula",
    "Nexus",
    "Nova",
    "Oasis",
    "Odyssey",
    "Omega",
    "Orbit",
    "Origin",
    "Overture",
    "Paradox",
    "Paradigm",
    "Paragon",
    "Passion",
    "Phoenix",
    "Pioneer",
    " Pinnacle",
    "Prism",
    "Prodigy",
    "Pulse",
    "Quantum",
    "Radiance",
    "Renaissance",
    "Revolution",
    "Rise",
    "Sanctuary",
    "Satori",
    "Serendipity",
    "Shimmer",
    "Skyline",
    "Soar",
    "Solitude",
    "Solstice",
    "Sovereign",
    "Spectrum",
    "Spire",
    "Sputnik",
    "Starburst",
    "Stellar",
    "Stratosphere",
    "Summit",
    "Synergy",
    "Tempest",
    "Tenacity",
    "Terra",
    "Titan",
    "Transcend",
    "Triumph",
    "Unity",
    "Unveiling",
    "Utopia",
    "Velocity",
    "Vision",
    "Voyager",
    "Whirlwind",
    "Zenith",
    "Zephyr",
];

let idCounter = 0;
const idLength = 8;

let namePool = [];
let productId = "";
let productName = "";
let productOwnerName = "";
let Developers = [];
let scrumMasterName = "";
let startDate = "";
let year = 2021;
let month = 0;
let date = "01";
let methodology = "";
let data = [];

// create 40 products
for (let i = 0; i < 40; i++) {
  namePool = [...names];
  Developers = [];

  productId = (idCounter + 1).toString();
  while (productId.length < idLength) {
    productId = "0" + productId;
  }

  productName = projectNames[Math.floor(Math.random() * projectNames.length)];
  projectNames.splice(projectNames.indexOf(productName), 1);

  productOwnerName = namePool[Math.floor(Math.random() * namePool.length)];
  Developers.push(productOwnerName);
  namePool.splice(namePool.indexOf(productOwnerName), 1);

  // productOwner is in the developer team
  for (let j = 0; j < 4; j++) {
    let selectedName = namePool[Math.floor(Math.random() * namePool.length)];
    Developers.push(selectedName);
    namePool.splice(namePool.indexOf(selectedName), 1);
  }

  scrumMasterName = namePool[Math.floor(Math.random() * namePool.length)];

  if (idCounter > 1 && idCounter % 12 === 0) {
    year++;
  }
  year = year.toString();
  month = ((idCounter % 12) + 1).toString();
  if (month < 10) {
    month = "0" + month;
  }

  startDate = `${year}-${month}-${date}`;

  methodology = Math.floor(Math.random() * 100) % 2 === 0 ? "Agile" : "Waterfall";

  let schema = {
    productId: `${productId}`,
    productName: `${productName}`,
    productOwnerName: `${productOwnerName}`,
    Developers: Developers,
    scrumMasterName: `${scrumMasterName}`,
    startDate: `${startDate}`,
    methodology: `${methodology}`,
    location:'https://github.com/bcgov'
  };

  data.push(schema);
  idCounter++;
  month++;
}

fs.writeFile(file, JSON.stringify(data), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});