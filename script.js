const TILE = {
  FLOOR: ".",
  WALL: "#",
  TABLE: "T",
  CHAIR: "C",
  MEAT: "M",
  CHEESE: "H",
  FRUIT: "F",
  VEG: "V",
  DRINK: "D",
  DESSERT: "S"
};

const PLATE_CAPACITY = 8;
const CUP_CAPACITY = 4;

const mapRows = [
  "##############",
  "#.MM..HH.....#",
  "#............#",
  "#...........F#",
  "#.CCTTTC....F#",
  "#.CCTTTC....F#",
  "#............#",
  "#D...TT......#",
  "#D...TT......#",
  "#............#",
  "#.....VV..SS.#",
  "##############"
];

const stations = {
  meat: {
    id: "meat",
    title: "Meat Station",
    tiles: [
      { x: 2, y: 1 },
      { x: 3, y: 1 }
    ],
    message: "The meat station is nearby. Press Enter or Space to inspect it.",
    items: [
      { name: "Chicken", note: "Tender golden pieces ready for a plate.", type: "meat", shape: "chicken", color: "#d8a15f", target: "plate" },
      { name: "Beef", note: "Warm brown slices with a hearty look.", type: "meat", shape: "beef", color: "#8e4f35", target: "plate" },
      { name: "Salmon", note: "Pink salmon fillets with soft stripes.", type: "meat", shape: "salmon", color: "#f08e76", target: "plate" },
      { name: "Tuna", note: "Deep rosy tuna pieces with a smooth finish.", type: "meat", shape: "tuna", color: "#c95f67", target: "plate" },
      { name: "White Fish", note: "Light flaky fish with a buttery glow.", type: "meat", shape: "whiteFish", color: "#f1e2c8", target: "plate" }
    ]
  },
  cheese: {
    id: "cheese",
    title: "Cheese Station",
    tiles: [
      { x: 6, y: 1 },
      { x: 7, y: 1 }
    ],
    message: "The cheese station looks extra fancy. Press Enter or Space to inspect it.",
    items: [
      { name: "Sliced Gouda", note: "Golden slices with soft shine.", type: "cheese", shape: "slice", color: "#ebb75a", target: "plate" },
      { name: "Sliced American", note: "Stacked squares, smooth and bright.", type: "cheese", shape: "square", color: "#f7c856", target: "plate" },
      { name: "Cheddar", note: "Rich orange wedges with bold color.", type: "cheese", shape: "block", color: "#dd8c24", target: "plate" },
      { name: "Chunks of Brie", note: "Creamy wedges with pale rinds.", type: "cheese", shape: "brie", color: "#f5ebd4", target: "plate" },
      { name: "Swiss", note: "Nutty slices with classic holes.", type: "cheese", shape: "swiss", color: "#efd96f", target: "plate" },
      { name: "Smoked Gouda", note: "Warm amber rounds with a smoky glow.", type: "cheese", shape: "smoked", color: "#b96f2d", target: "plate" }
    ]
  },
  fruit: {
    id: "fruit",
    title: "Fruit Station",
    tiles: [
      { x: 12, y: 3 },
      { x: 12, y: 4 },
      { x: 12, y: 5 }
    ],
    message: "Bright fruit bowls are ready for a close look. Press Enter or Space.",
    items: [
      { name: "Sliced Mango", note: "Sunny slices fanned out on a plate.", type: "fruit", shape: "mango", color: "#ffb64a", target: "plate" },
      { name: "Bowl of Oranges", note: "Round oranges tucked into a bowl.", type: "fruit", shape: "orangeBowl", color: "#ff8e2d", target: "plate" },
      { name: "Bowl of Apples", note: "Shiny apples in red and green.", type: "fruit", shape: "appleBowl", color: "#dd5647", target: "plate" },
      { name: "Bowl of Blueberries", note: "Little blue berries in a heap.", type: "fruit", shape: "blueberryBowl", color: "#4e69c8", target: "plate" },
      { name: "Bowl of Strawberries", note: "Sweet strawberries with tiny tops.", type: "fruit", shape: "strawberryBowl", color: "#ea4a58", target: "plate" }
    ]
  },
  vegetable: {
    id: "vegetable",
    title: "Vegetable Station",
    tiles: [
      { x: 6, y: 10 },
      { x: 7, y: 10 }
    ],
    message: "Fresh vegetables are lined up here. Press Enter or Space.",
    items: [
      { name: "Baby Carrots", note: "Tiny carrots with bright crunch.", type: "veg", shape: "carrots", color: "#f8912f", target: "plate" },
      { name: "Broccoli", note: "Little green tree tops.", type: "veg", shape: "broccoli", color: "#4a9a43", target: "plate" },
      { name: "Tomatoes", note: "Glossy red tomatoes ready to grab.", type: "veg", shape: "tomato", color: "#e24a3d", target: "plate" },
      { name: "Zucchini", note: "Fresh green slices with pale centers.", type: "veg", shape: "zucchini", color: "#87b856", target: "plate" }
    ]
  },
  drink: {
    id: "drink",
    title: "Drink Station",
    tiles: [
      { x: 1, y: 7 },
      { x: 1, y: 8 }
    ],
    message: "The drink station is nearby. Press Enter or Space to fill your cup.",
    items: [
      { name: "Lemonade", note: "Bright and tangy with a sunny sparkle.", type: "drink", shape: "lemonade", color: "#f5db63", liquid: "linear-gradient(180deg, rgba(255,238,140,0.92), rgba(232,201,74,0.98))", target: "cup" },
      { name: "Apple Juice", note: "Golden juice with a mellow shine.", type: "drink", shape: "appleJuice", color: "#e1b24f", liquid: "linear-gradient(180deg, rgba(247,207,112,0.92), rgba(210,150,52,0.98))", target: "cup" },
      { name: "Orange Juice", note: "Cheerful citrus orange in a chilled pour.", type: "drink", shape: "orangeJuice", color: "#f49837", liquid: "linear-gradient(180deg, rgba(255,179,92,0.92), rgba(235,127,31,0.98))", target: "cup" },
      { name: "Seltzer", note: "Clear bubbly fizz with tiny sparkling bubbles.", type: "drink", shape: "seltzer", color: "#a8daf7", liquid: "linear-gradient(180deg, rgba(214,241,255,0.75), rgba(146,204,236,0.92))", target: "cup" },
      { name: "Beer", note: "Foamy golden beer for grown-ups only.", type: "drink", shape: "beer", color: "#e0a43f", liquid: "linear-gradient(180deg, rgba(246,198,87,0.94), rgba(198,128,38,0.98))", warning: "21+ only", target: "cup" }
    ]
  },
  dessert: {
    id: "dessert",
    title: "Dessert Station",
    tiles: [
      { x: 10, y: 10 },
      { x: 11, y: 10 }
    ],
    message: "The dessert station smells sweet. Press Enter or Space to inspect it.",
    items: [
      { name: "Cookies with Rainbow Sprinkles", note: "Soft cookies dotted with bright rainbow sprinkles.", type: "dessert", shape: "sprinkleCookies", color: "#c98c54", target: "plate" },
      { name: "Chocolate Cake", note: "Rich chocolate cake with a silky frosted top.", type: "dessert", shape: "chocolateCake", color: "#6c3d2c", target: "plate" },
      { name: "Vanilla Cake", note: "Fluffy vanilla cake with creamy frosting.", type: "dessert", shape: "vanillaCake", color: "#f2ddb0", target: "plate" },
      { name: "Strawberry Cake", note: "Pink strawberry cake with a sweet berry swirl.", type: "dessert", shape: "strawberryCake", color: "#ea8ba7", target: "plate" },
      { name: "Cupcakes", note: "Little party cupcakes with swirly frosting tops.", type: "dessert", shape: "cupcakes", color: "#f4a1b4", target: "plate" }
    ]
  }
};

const walkableTiles = new Set([TILE.FLOOR]);

const state = {
  player: { x: 2, y: 9 },
  nearbyStationId: null,
  currentView: "restaurant",
  plateItems: [],
  cupItems: []
};

const gameBoard = document.getElementById("gameBoard");
const playerEl = document.getElementById("player");
const statusText = document.getElementById("statusText");
const detailOverlay = document.getElementById("detailOverlay");
const detailTitle = document.getElementById("detailTitle");
const detailHint = document.getElementById("detailHint");
const detailFoods = document.getElementById("detailFoods");
const backButton = document.getElementById("backButton");
const platePercent = document.getElementById("platePercent");
const plateCount = document.getElementById("plateCount");
const plateMeterFill = document.getElementById("plateMeterFill");
const plateItemsEl = document.getElementById("plateItems");
const plateMessage = document.getElementById("plateMessage");
const plateVisual = document.getElementById("plateVisual");
const cupPercent = document.getElementById("cupPercent");
const cupCount = document.getElementById("cupCount");
const cupMeterFill = document.getElementById("cupMeterFill");
const cupItemsEl = document.getElementById("cupItems");
const cupMessage = document.getElementById("cupMessage");
const cupVisual = document.getElementById("cupVisual");
const cupLiquid = document.getElementById("cupLiquid");
const animationLayer = document.getElementById("animationLayer");
const clearPlateButton = document.getElementById("clearPlateButton");
const clearCupButton = document.getElementById("clearCupButton");

const stationTileElements = {};

function buildMap() {
  const fragment = document.createDocumentFragment();

  mapRows.forEach((row, y) => {
    [...row].forEach((char, x) => {
      const tile = document.createElement("div");
      tile.className = `tile ${tileClassFor(char)}`;

      const stationId = getStationIdAt(x, y);
      if (stationId) {
        const pip = document.createElement("span");
        pip.className = "station-pip";
        tile.appendChild(pip);

        const label = document.createElement("span");
        label.className = "tile-label";
        label.textContent = shortStationLabel(stationId);
        tile.appendChild(label);

        if (!stationTileElements[stationId]) {
          stationTileElements[stationId] = [];
        }
        stationTileElements[stationId].push(tile);
      } else if (char === TILE.TABLE) {
        const label = document.createElement("span");
        label.className = "tile-label";
        label.textContent = "Table";
        tile.appendChild(label);
      }

      fragment.appendChild(tile);
    });
  });

  gameBoard.appendChild(fragment);
  gameBoard.appendChild(playerEl);
}

function tileClassFor(char) {
  switch (char) {
    case TILE.WALL:
      return "wall";
    case TILE.TABLE:
      return "table";
    case TILE.CHAIR:
      return "chair";
    case TILE.MEAT:
    case TILE.CHEESE:
    case TILE.FRUIT:
    case TILE.VEG:
    case TILE.DRINK:
    case TILE.DESSERT:
      return "buffet";
    default:
      return "floor";
  }
}

function shortStationLabel(id) {
  if (id === "meat") return "Meat";
  if (id === "cheese") return "Cheese";
  if (id === "fruit") return "Fruit";
  if (id === "drink") return "Drink";
  if (id === "dessert") return "Dessert";
  return "Veg";
}

function getStationIdAt(x, y) {
  for (const station of Object.values(stations)) {
    if (station.tiles.some(tile => tile.x === x && tile.y === y)) {
      return station.id;
    }
  }
  return null;
}

function isWalkable(x, y) {
  const row = mapRows[y];
  if (!row) return false;
  return walkableTiles.has(row[x]);
}

function updatePlayerPosition() {
  const tileSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--tile-size"), 10);
  playerEl.style.transform = `translate(${state.player.x * tileSize}px, ${state.player.y * tileSize}px)`;
}

function findNearbyStation() {
  for (const station of Object.values(stations)) {
    const isNear = station.tiles.some(tile => {
      const distance = Math.abs(state.player.x - tile.x) + Math.abs(state.player.y - tile.y);
      return distance === 1;
    });
    if (isNear) return station.id;
  }
  return null;
}

function updateNearbyStationState() {
  state.nearbyStationId = findNearbyStation();

  Object.entries(stationTileElements).forEach(([stationId, tiles]) => {
    tiles.forEach(tile => {
      tile.classList.toggle("nearby", stationId === state.nearbyStationId);
    });
  });

  if (!state.nearbyStationId) {
    statusText.textContent = "Walk to a buffet station and press Enter or Space.";
    return;
  }

  statusText.textContent = stations[state.nearbyStationId].message;
}

function movePlayer(dx, dy) {
  if (state.currentView !== "restaurant") return;

  const nextX = state.player.x + dx;
  const nextY = state.player.y + dy;
  if (!isWalkable(nextX, nextY)) return;

  state.player.x = nextX;
  state.player.y = nextY;
  updatePlayerPosition();
  updateNearbyStationState();
}

function openStation(stationId) {
  if (!stationId) return;
  const station = stations[stationId];
  state.currentView = "detail";
  detailTitle.textContent = station.title;
  detailHint.textContent = station.id === "drink"
    ? "Click Pour Into Cup on any drink. Press Escape or click Back to return to the restaurant."
    : "Click Add To Plate on any food. Press Escape or click Back to return to the restaurant.";
  detailFoods.innerHTML = "";

  station.items.forEach(item => {
    detailFoods.appendChild(createItemCard(item));
  });

  detailOverlay.classList.remove("hidden");
  detailOverlay.setAttribute("aria-hidden", "false");
}

function closeStation() {
  state.currentView = "restaurant";
  detailOverlay.classList.add("hidden");
  detailOverlay.setAttribute("aria-hidden", "true");
  updateNearbyStationState();
}

function createItemCard(item) {
  const card = document.createElement("article");
  card.className = `food-card ${item.type}`;

  const art = document.createElement("div");
  art.className = "food-art";

  const plate = document.createElement("div");
  plate.className = "plate";
  art.appendChild(plate);

  getItemPieces(item).forEach(pieceStyles => {
    const piece = document.createElement("div");
    piece.className = "food-piece";
    Object.assign(piece.style, pieceStyles);
    plate.appendChild(piece);
  });

  const title = document.createElement("h3");
  title.className = "food-title";
  title.textContent = item.name;

  const label = document.createElement("p");
  label.className = "food-label";
  label.textContent = item.note;

  card.appendChild(art);
  card.appendChild(title);
  card.appendChild(label);

  if (item.warning) {
    const warning = document.createElement("div");
    warning.className = "warning-badge";
    warning.textContent = item.warning;
    card.appendChild(warning);
  }

  const button = document.createElement("button");
  button.className = "add-button";
  button.type = "button";
  button.textContent = item.target === "cup" ? "Pour Into Cup" : "Add To Plate";
  button.addEventListener("click", event => addItemToContainer(item, card, event.currentTarget));
  card.appendChild(button);

  return card;
}

function addItemToContainer(item, card, triggerEl) {
  const sourceEl = card.querySelector(".food-art") || triggerEl;
  const destination = item.target === "cup" ? cupVisual : plateVisual;
  animateItemToHud(sourceEl, destination);

  const saved = {
    id: `${item.name}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: item.name,
    color: item.color,
    type: item.type,
    liquid: item.liquid || null
  };

  if (item.target === "cup") {
    state.cupItems.push(saved);
    renderCup();
  } else {
    state.plateItems.push(saved);
    renderPlate();
  }
}

function renderPlate() {
  plateItemsEl.innerHTML = "";

  state.plateItems.forEach(item => {
    const token = document.createElement("div");
    token.className = "plate-token";
    token.appendChild(createTokenSwatch(item.color));
    token.appendChild(createTokenText(item.name));
    plateItemsEl.appendChild(token);
  });

  const fullness = Math.min(100, Math.round((state.plateItems.length / PLATE_CAPACITY) * 100));
  platePercent.textContent = `${fullness}% full`;
  plateCount.textContent = `${state.plateItems.length} item${state.plateItems.length === 1 ? "" : "s"}`;
  plateMeterFill.style.width = `${fullness}%`;

  if (state.plateItems.length === 0) {
    plateMessage.textContent = "Your plate is empty. Pick foods from the stations.";
  } else if (fullness < 50) {
    plateMessage.textContent = "Nice start. There is still lots of room on your plate.";
  } else if (fullness < 85) {
    plateMessage.textContent = "Your plate is filling up. You may want to head back to your table soon.";
  } else {
    plateMessage.textContent = "That plate is getting packed. Time to think about heading back to the table.";
  }
}

function renderCup() {
  cupItemsEl.innerHTML = "";

  state.cupItems.forEach(item => {
    const token = document.createElement("div");
    token.className = "cup-token";
    token.appendChild(createTokenSwatch(item.color));
    token.appendChild(createTokenText(item.name));
    cupItemsEl.appendChild(token);
  });

  const fullness = Math.min(100, Math.round((state.cupItems.length / CUP_CAPACITY) * 100));
  cupPercent.textContent = `${fullness}% full`;
  cupCount.textContent = `${state.cupItems.length} drink${state.cupItems.length === 1 ? "" : "s"}`;
  cupMeterFill.style.width = `${fullness}%`;
  cupLiquid.style.height = `${Math.max(6, fullness)}%`;

  const latestDrink = state.cupItems[state.cupItems.length - 1];
  cupLiquid.style.background = latestDrink && latestDrink.liquid
    ? latestDrink.liquid
    : "linear-gradient(180deg, rgba(120, 210, 255, 0.82), rgba(48, 143, 212, 0.95))";

  if (state.cupItems.length === 0) {
    cupLiquid.style.height = "0%";
    cupMessage.textContent = "Your cup is empty. Visit the drink station for a sip.";
  } else if (fullness < 50) {
    cupMessage.textContent = "A little drink is in your cup. You can still add more.";
  } else if (fullness < 100) {
    cupMessage.textContent = "Your cup is getting full. One more pour might do it.";
  } else {
    cupMessage.textContent = "Your cup is full. That should be enough to take back to the table.";
  }
}

function createTokenSwatch(color) {
  const swatch = document.createElement("span");
  swatch.className = "token-swatch";
  swatch.style.background = color;
  return swatch;
}

function createTokenText(textValue) {
  const text = document.createElement("span");
  text.textContent = textValue;
  return text;
}

function animateItemToHud(sourceEl, destinationEl) {
  if (!sourceEl || !destinationEl) return;

  const sourceRect = sourceEl.getBoundingClientRect();
  const targetRect = destinationEl.getBoundingClientRect();
  const flying = document.createElement("div");
  flying.className = "flying-food";
  flying.style.left = `${sourceRect.left}px`;
  flying.style.top = `${sourceRect.top}px`;
  flying.style.width = `${sourceRect.width}px`;
  flying.style.height = `${sourceRect.height}px`;

  flying.appendChild(sourceEl.cloneNode(true));
  animationLayer.appendChild(flying);

  requestAnimationFrame(() => {
    const targetX = targetRect.left + targetRect.width / 2 - sourceRect.width / 2;
    const targetY = targetRect.top + targetRect.height / 2 - sourceRect.height / 2;
    flying.style.transform = `translate(${targetX - sourceRect.left}px, ${targetY - sourceRect.top}px) scale(0.32) rotate(12deg)`;
    flying.style.opacity = "0.3";
  });

  window.setTimeout(() => flying.remove(), 700);
}

function getItemPieces(item) {
  switch (item.shape) {
    case "chicken":
      return [
        piece(28, 40, 28, 22, item.color, "14px", "rotate(-12deg)"),
        piece(52, 48, 30, 22, "#e2b16e", "14px", "rotate(10deg)"),
        piece(68, 36, 14, 14, "#f5ecdd", "999px", "rotate(0deg)")
      ];
    case "beef":
      return [
        piece(28, 36, 30, 22, item.color, "12px", "rotate(-10deg)"),
        piece(52, 48, 34, 24, "#a55b3f", "12px", "rotate(8deg)"),
        piece(42, 60, 28, 18, "#7f402a", "12px", "rotate(-2deg)")
      ];
    case "salmon":
      return [
        stripedPiece(28, 38, 32, 20, item.color, "#ffd2c5", "rotate(-8deg)"),
        stripedPiece(54, 48, 34, 20, "#f39b83", "#ffd7cc", "rotate(8deg)")
      ];
    case "tuna":
      return [
        stripedPiece(30, 38, 30, 20, item.color, "#e8a1a8", "rotate(-8deg)"),
        stripedPiece(56, 50, 30, 20, "#d06f76", "#f0b0b5", "rotate(10deg)")
      ];
    case "whiteFish":
      return [
        piece(28, 40, 34, 20, item.color, "14px", "rotate(-10deg)"),
        piece(56, 48, 32, 20, "#f8eddc", "14px", "rotate(8deg)"),
        piece(64, 34, 14, 10, "#fff8ef", "999px", "rotate(0deg)")
      ];
    case "slice":
      return [
        piece(24, 28, 54, 18, item.color, "12px", "rotate(-8deg)"),
        piece(50, 42, 52, 18, "#f5c76d", "12px", "rotate(5deg)"),
        piece(36, 58, 56, 18, "#ebb04a", "12px", "rotate(-4deg)")
      ];
    case "square":
      return [
        piece(28, 34, 34, 34, item.color, "8px", "rotate(-4deg)"),
        piece(48, 42, 34, 34, "#ffd16b", "8px", "rotate(4deg)"),
        piece(38, 54, 34, 34, "#f2bc4e", "8px", "rotate(-2deg)")
      ];
    case "block":
      return [
        piece(28, 30, 32, 48, item.color, "10px", "rotate(-8deg)"),
        piece(60, 42, 24, 36, "#e59a39", "10px", "rotate(8deg)")
      ];
    case "brie":
      return [
        piece(28, 38, 38, 30, item.color, "12px 12px 20px 12px", "rotate(-7deg)"),
        piece(58, 48, 34, 26, "#fff5de", "12px 12px 20px 12px", "rotate(8deg)")
      ];
    case "swiss":
      return [
        swissPiece(28, 36, 36, 34, item.color, "rotate(-6deg)"),
        swissPiece(58, 46, 36, 34, "#f0d96f", "rotate(6deg)")
      ];
    case "smoked":
      return [
        piece(30, 32, 34, 34, item.color, "999px", "rotate(0deg)"),
        piece(58, 44, 34, 34, "#d98b42", "999px", "rotate(0deg)")
      ];
    case "mango":
      return [
        piece(26, 42, 18, 42, item.color, "12px", "rotate(-24deg)"),
        piece(46, 36, 18, 44, "#ffc55f", "12px", "rotate(-8deg)"),
        piece(66, 34, 18, 44, "#ffaf31", "12px", "rotate(10deg)")
      ];
    case "orangeBowl":
      return bowlPieces(["#ff8d2b", "#ffa339", "#f37b1f", "#ffb253"], 18);
    case "appleBowl":
      return bowlPieces(["#d84e41", "#b84537", "#90b44f", "#e0685a"], 18);
    case "blueberryBowl":
      return bowlPieces(["#4f66bf", "#657dde", "#3a4fa7", "#7d90e5"], 12);
    case "strawberryBowl":
      return bowlPieces(["#ee4b5a", "#d93a48", "#f56d78", "#cd2f43"], 14);
    case "carrots":
      return [
        piece(30, 40, 14, 40, item.color, "14px", "rotate(-22deg)"),
        piece(50, 42, 14, 38, "#ffa242", "14px", "rotate(-8deg)"),
        piece(70, 40, 14, 42, "#f78421", "14px", "rotate(18deg)")
      ];
    case "broccoli":
      return [
        piece(36, 52, 8, 22, "#72b760", "8px", "rotate(0deg)"),
        piece(30, 34, 24, 24, item.color, "999px", "rotate(0deg)"),
        piece(46, 30, 24, 24, "#5aa34c", "999px", "rotate(0deg)"),
        piece(58, 40, 24, 24, "#4d8f41", "999px", "rotate(0deg)")
      ];
    case "tomato":
      return [
        piece(32, 40, 24, 24, item.color, "999px", "rotate(0deg)"),
        piece(56, 48, 24, 24, "#f26053", "999px", "rotate(0deg)")
      ];
    case "zucchini":
      return [
        piece(28, 38, 18, 42, item.color, "14px", "rotate(-22deg)"),
        piece(50, 42, 18, 42, "#9acc66", "14px", "rotate(6deg)"),
        piece(72, 38, 16, 42, "#78aa4a", "14px", "rotate(18deg)")
      ];
    case "sprinkleCookies":
      return [
        sprinkleCookie(28, 38, 28, 28, item.color, ["#ff6b6b", "#4ecdc4", "#ffe66d", "#8e7dff"]),
        sprinkleCookie(56, 48, 28, 28, "#d29c63", ["#ff8fab", "#6bcB77", "#4d96ff", "#ffd93d"])
      ];
    case "chocolateCake":
      return cakeSlice("#5d3425", "#8b523b", "#f2dfc4", "#4c291d");
    case "vanillaCake":
      return cakeSlice("#f1ddb4", "#e7c989", "#fff6e5", "#d9b46a");
    case "strawberryCake":
      return cakeSlice("#ea8ba7", "#d96c8f", "#fff1f5", "#f4b7c8");
    case "cupcakes":
      return cupcakeSet();
    case "lemonade":
      return drinkGlass(item.color, "#fff0a2");
    case "appleJuice":
      return drinkGlass(item.color, "#f7d27a");
    case "orangeJuice":
      return drinkGlass(item.color, "#ffbf74");
    case "seltzer":
      return bubblyDrink(item.color);
    case "beer":
      return beerGlass(item.color);
    default:
      return [piece(34, 34, 40, 40, item.color, "12px", "rotate(0deg)")];
  }
}

function piece(left, top, width, height, background, radius, transform) {
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    background,
    borderRadius: radius,
    transform
  };
}

function stripedPiece(left, top, width, height, base, stripe, transform) {
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    transform,
    borderRadius: "12px",
    background: `repeating-linear-gradient(180deg, ${base} 0 6px, ${stripe} 6px 9px)`
  };
}

function swissPiece(left, top, width, height, color, transform) {
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    transform,
    borderRadius: "10px",
    background: `
      radial-gradient(circle at 30% 35%, rgba(240, 223, 166, 0.95) 0 10%, transparent 11%),
      radial-gradient(circle at 68% 60%, rgba(240, 223, 166, 0.95) 0 9%, transparent 10%),
      ${color}
    `
  };
}

function bowlPieces(colors, size) {
  return [
    piece(24, 58, 70, 20, "#f5f1ea", "0 0 18px 18px", "rotate(0deg)"),
    piece(30, 36, size, size, colors[0], "999px", "rotate(0deg)"),
    piece(46, 30, size, size, colors[1], "999px", "rotate(0deg)"),
    piece(62, 36, size, size, colors[2], "999px", "rotate(0deg)"),
    piece(50, 48, size, size, colors[3], "999px", "rotate(0deg)")
  ];
}

function drinkGlass(color, highlight) {
  return [
    piece(38, 24, 34, 58, "rgba(255,255,255,0.78)", "10px 10px 14px 14px", "rotate(0deg)"),
    piece(42, 36, 26, 38, `linear-gradient(180deg, ${highlight}, ${color})`, "8px", "rotate(0deg)"),
    piece(58, 18, 6, 24, "#ffffff", "999px", "rotate(12deg)")
  ];
}

function bubblyDrink(color) {
  return [
    piece(38, 24, 34, 58, "rgba(255,255,255,0.78)", "10px 10px 14px 14px", "rotate(0deg)"),
    piece(42, 36, 26, 38, `linear-gradient(180deg, rgba(236,250,255,0.95), ${color})`, "8px", "rotate(0deg)"),
    piece(48, 44, 4, 4, "rgba(255,255,255,0.95)", "999px", "rotate(0deg)"),
    piece(58, 54, 4, 4, "rgba(255,255,255,0.95)", "999px", "rotate(0deg)"),
    piece(52, 64, 5, 5, "rgba(255,255,255,0.95)", "999px", "rotate(0deg)")
  ];
}

function beerGlass(color) {
  return [
    piece(38, 24, 34, 58, "rgba(255,255,255,0.78)", "10px 10px 14px 14px", "rotate(0deg)"),
    piece(42, 40, 26, 34, `linear-gradient(180deg, #f0c165, ${color})`, "8px", "rotate(0deg)"),
    piece(40, 30, 30, 14, "#fff5dc", "999px", "rotate(0deg)"),
    piece(68, 42, 10, 24, "rgba(255,255,255,0.76)", "0 12px 12px 0", "rotate(0deg)")
  ];
}

function sprinkleCookie(left, top, width, height, color, sprinkleColors) {
  const sprinkles = sprinkleColors.map((sprinkleColor, index) => `linear-gradient(${25 + index * 20}deg, transparent 0 40%, ${sprinkleColor} 40% 60%, transparent 60% 100%)`).join(", ");
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: "999px",
    transform: "rotate(0deg)",
    background: `${sprinkles}, radial-gradient(circle at 35% 35%, #f4c88f 0 18%, ${color} 19% 100%)`
  };
}

function cakeSlice(base, side, frosting, stripe) {
  return [
    piece(26, 48, 56, 20, side, "8px", "rotate(0deg)"),
    piece(28, 36, 52, 18, base, "6px 6px 2px 2px", "rotate(0deg)"),
    piece(24, 28, 60, 14, frosting, "10px 10px 4px 4px", "rotate(0deg)"),
    piece(56, 30, 10, 32, stripe, "999px", "rotate(26deg)")
  ];
}

function cupcakeSet() {
  return [
    piece(24, 56, 18, 22, "#d28a58", "4px 4px 8px 8px", "rotate(0deg)"),
    piece(22, 42, 22, 18, "#f6b5c5", "999px 999px 10px 10px", "rotate(0deg)"),
    piece(48, 54, 18, 24, "#b87a4d", "4px 4px 8px 8px", "rotate(0deg)"),
    piece(46, 40, 22, 18, "#f9d77a", "999px 999px 10px 10px", "rotate(0deg)"),
    piece(72, 56, 18, 22, "#cd8b62", "4px 4px 8px 8px", "rotate(0deg)"),
    piece(70, 42, 22, 18, "#f0a0b8", "999px 999px 10px 10px", "rotate(0deg)")
  ];
}

function clearPlate() {
  state.plateItems = [];
  renderPlate();
}

function clearCup() {
  state.cupItems = [];
  renderCup();
}

function handleKeydown(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    movePlayer(0, -1);
    return;
  }
  if (event.key === "ArrowDown") {
    event.preventDefault();
    movePlayer(0, 1);
    return;
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    movePlayer(-1, 0);
    return;
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    movePlayer(1, 0);
    return;
  }
  if ((event.key === "Enter" || event.key === " ") && state.currentView === "restaurant") {
    event.preventDefault();
    openStation(state.nearbyStationId);
    return;
  }
  if (event.key === "Escape" && state.currentView === "detail") {
    event.preventDefault();
    closeStation();
  }
}

function init() {
  buildMap();
  updatePlayerPosition();
  updateNearbyStationState();
  renderPlate();
  renderCup();

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", updatePlayerPosition);
  backButton.addEventListener("click", closeStation);
  clearPlateButton.addEventListener("click", clearPlate);
  clearCupButton.addEventListener("click", clearCup);
}

init();
