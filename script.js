const TILE = {
  FLOOR: ".",
  WALL: "#",
  TABLE: "T",
  CHAIR: "C",
  CHEESE: "H",
  FRUIT: "F",
  VEG: "V"
};

const mapRows = [
  "##############",
  "#..HHH.FFF.VV#",
  "#............#",
  "#.CCTTTC.....#",
  "#.CCTTTC.....#",
  "#............#",
  "#....TT......#",
  "#....TT......#",
  "#............#",
  "#............#",
  "#............#",
  "##############"
];

const stations = {
  cheese: {
    id: "cheese",
    title: "Cheese Station",
    tiles: [
      { x: 3, y: 1 },
      { x: 4, y: 1 },
      { x: 5, y: 1 }
    ],
    message: "The cheese station looks extra fancy. Press Enter or Space to inspect it.",
    foods: [
      { name: "Sliced Gouda", note: "Golden slices with soft shine.", type: "cheese", shape: "slice", color: "#ebb75a" },
      { name: "Sliced American", note: "Stacked squares, smooth and bright.", type: "cheese", shape: "square", color: "#f7c856" },
      { name: "Cheddar", note: "Rich orange wedges with bold color.", type: "cheese", shape: "block", color: "#dd8c24" },
      { name: "Chunks of Brie", note: "Creamy wedges with pale rinds.", type: "cheese", shape: "brie", color: "#f5ebd4" },
      { name: "Swiss", note: "Nutty slices with classic holes.", type: "cheese", shape: "swiss", color: "#efd96f" },
      { name: "Smoked Gouda", note: "Warm amber rounds with a smoky glow.", type: "cheese", shape: "smoked", color: "#b96f2d" }
    ]
  },
  fruit: {
    id: "fruit",
    title: "Fruit Station",
    tiles: [
      { x: 7, y: 1 },
      { x: 8, y: 1 },
      { x: 9, y: 1 }
    ],
    message: "Bright fruit bowls are ready for a close look. Press Enter or Space.",
    foods: [
      { name: "Sliced Mango", note: "Sunny slices fanned out on a plate.", type: "fruit", shape: "mango", color: "#ffb64a" },
      { name: "Bowl of Oranges", note: "Round oranges tucked into a bowl.", type: "fruit", shape: "orangeBowl", color: "#ff8e2d" },
      { name: "Bowl of Apples", note: "Shiny apples in red and green.", type: "fruit", shape: "appleBowl", color: "#dd5647" },
      { name: "Bowl of Blueberries", note: "Little blue berries in a heap.", type: "fruit", shape: "blueberryBowl", color: "#4e69c8" },
      { name: "Bowl of Strawberries", note: "Sweet strawberries with tiny tops.", type: "fruit", shape: "strawberryBowl", color: "#ea4a58" }
    ]
  },
  vegetable: {
    id: "vegetable",
    title: "Vegetable Station",
    tiles: [
      { x: 11, y: 1 },
      { x: 12, y: 1 }
    ],
    message: "Fresh vegetables are lined up here. Press Enter or Space.",
    foods: [
      { name: "Baby Carrots", note: "Tiny carrots with bright crunch.", type: "veg", shape: "carrots", color: "#f8912f" },
      { name: "Broccoli", note: "Little green tree tops.", type: "veg", shape: "broccoli", color: "#4a9a43" },
      { name: "Tomatoes", note: "Glossy red tomatoes ready to grab.", type: "veg", shape: "tomato", color: "#e24a3d" },
      { name: "Zucchini", note: "Fresh green slices with pale centers.", type: "veg", shape: "zucchini", color: "#87b856" }
    ]
  }
};

const walkableTiles = new Set([TILE.FLOOR]);

const state = {
  player: { x: 2, y: 9 },
  nearbyStationId: null,
  currentView: "restaurant"
};

const gameBoard = document.getElementById("gameBoard");
const playerEl = document.getElementById("player");
const statusText = document.getElementById("statusText");
const detailOverlay = document.getElementById("detailOverlay");
const detailTitle = document.getElementById("detailTitle");
const detailHint = document.getElementById("detailHint");
const detailFoods = document.getElementById("detailFoods");
const backButton = document.getElementById("backButton");

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
    case TILE.CHEESE:
    case TILE.FRUIT:
    case TILE.VEG:
      return "buffet";
    default:
      return "floor";
  }
}

function shortStationLabel(id) {
  if (id === "cheese") return "Cheese";
  if (id === "fruit") return "Fruit";
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
  const tileSize = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue("--tile-size"),
    10
  );

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
  detailHint.textContent = "Press Escape or click Back to return to the restaurant.";
  detailFoods.innerHTML = "";

  station.foods.forEach(food => {
    detailFoods.appendChild(createFoodCard(food));
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

function createFoodCard(food) {
  const card = document.createElement("article");
  card.className = `food-card ${food.type}`;

  const art = document.createElement("div");
  art.className = "food-art";

  const plate = document.createElement("div");
  plate.className = "plate";
  art.appendChild(plate);

  getFoodPieces(food).forEach(pieceStyles => {
    const piece = document.createElement("div");
    piece.className = "food-piece";
    Object.assign(piece.style, pieceStyles);
    plate.appendChild(piece);
  });

  const title = document.createElement("h3");
  title.className = "food-title";
  title.textContent = food.name;

  const label = document.createElement("p");
  label.className = "food-label";
  label.textContent = food.note;

  card.appendChild(art);
  card.appendChild(title);
  card.appendChild(label);

  return card;
}

function getFoodPieces(food) {
  switch (food.shape) {
    case "slice":
      return [
        piece(24, 28, 54, 18, food.color, "12px", "rotate(-8deg)"),
        piece(50, 42, 52, 18, "#f5c76d", "12px", "rotate(5deg)"),
        piece(36, 58, 56, 18, "#ebb04a", "12px", "rotate(-4deg)")
      ];
    case "square":
      return [
        piece(28, 34, 34, 34, food.color, "8px", "rotate(-4deg)"),
        piece(48, 42, 34, 34, "#ffd16b", "8px", "rotate(4deg)"),
        piece(38, 54, 34, 34, "#f2bc4e", "8px", "rotate(-2deg)")
      ];
    case "block":
      return [
        piece(28, 30, 32, 48, food.color, "10px", "rotate(-8deg)"),
        piece(60, 42, 24, 36, "#e59a39", "10px", "rotate(8deg)")
      ];
    case "brie":
      return [
        piece(28, 38, 38, 30, food.color, "12px 12px 20px 12px", "rotate(-7deg)"),
        piece(58, 48, 34, 26, "#fff5de", "12px 12px 20px 12px", "rotate(8deg)")
      ];
    case "swiss":
      return [
        swissPiece(28, 36, 36, 34, food.color, "rotate(-6deg)"),
        swissPiece(58, 46, 36, 34, "#f0d96f", "rotate(6deg)")
      ];
    case "smoked":
      return [
        piece(30, 32, 34, 34, food.color, "999px", "rotate(0deg)"),
        piece(58, 44, 34, 34, "#d98b42", "999px", "rotate(0deg)")
      ];
    case "mango":
      return [
        piece(26, 42, 18, 42, food.color, "12px", "rotate(-24deg)"),
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
        piece(30, 40, 14, 40, food.color, "14px", "rotate(-22deg)"),
        piece(50, 42, 14, 38, "#ffa242", "14px", "rotate(-8deg)"),
        piece(70, 40, 14, 42, "#f78421", "14px", "rotate(18deg)")
      ];
    case "broccoli":
      return [
        piece(36, 52, 8, 22, "#72b760", "8px", "rotate(0deg)"),
        piece(30, 34, 24, 24, food.color, "999px", "rotate(0deg)"),
        piece(46, 30, 24, 24, "#5aa34c", "999px", "rotate(0deg)"),
        piece(58, 40, 24, 24, "#4d8f41", "999px", "rotate(0deg)")
      ];
    case "tomato":
      return [
        piece(32, 40, 24, 24, food.color, "999px", "rotate(0deg)"),
        piece(56, 48, 24, 24, "#f26053", "999px", "rotate(0deg)")
      ];
    case "zucchini":
      return [
        piece(28, 38, 18, 42, food.color, "14px", "rotate(-22deg)"),
        piece(50, 42, 18, 42, "#9acc66", "14px", "rotate(6deg)"),
        piece(72, 38, 16, 42, "#78aa4a", "14px", "rotate(18deg)")
      ];
    default:
      return [piece(34, 34, 40, 40, food.color, "12px", "rotate(0deg)")];
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

  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", updatePlayerPosition);
  backButton.addEventListener("click", closeStation);
}

init();
