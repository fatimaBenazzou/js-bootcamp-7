/*
 * ============================================================
 *  EXERCISE: Build the JavaScript Logic for Minesweeper
 * ============================================================
 *
 *  In this exercise you will write the entire JavaScript brain
 *  of a classic Minesweeper game — from scratch.
 *
 *  What is already done for you:
 *    - index.html contains the full page structure: a grid container
 *      (.grid), a header with a flag counter (#flags-left) and a timer
 *      (.counter), a difficulty dropdown (.dropdown), a refresh button
 *      (#refresh), and a result modal (#modal) that appears at the end
 *      of each game.
 *    - style.css takes care of all the visual styling.
 *      You do not need to modify either of those files.
 *
 *  Your job:
 *    Inside the instructions.js file, write all the JavaScript logic.
 *    When finished, the game should:
 *      - Render a square grid of clickable cells.
 *      - Left-click to reveal a cell; right-click to place or remove a flag.
 *      - Flood-fill: automatically reveal neighbouring empty cells when
 *        an empty cell is uncovered.
 *      - Display the number of adjacent mines on each revealed cell.
 *      - Guarantee that the first cell clicked is never a mine.
 *      - Run a live timer and keep the flag counter up to date.
 *      - Detect win and loss, then show the result modal.
 *      - Allow the player to start a new game at any time.
 *
 *  Work through the steps below in order — each one builds on the last.
 *  Wrap all your code inside a DOMContentLoaded event listener so the
 *  script only runs once the page is fully loaded.
 * ============================================================
 */

// ============================================================
// === STEP 1: Collect DOM References ===
// ============================================================
//
//  Goal: Store references to every HTML element you will need to
//        read or update during the game, so you do not have to call
//        querySelector() repeatedly throughout your code.
//
//  Create the following constant variables using document.querySelector():
//
//  - gridEl        — the <section> with class "grid"
//                    (this is where the tile <div>s will be inserted)
//  - flagsLeftEl   — the <span> with id "flags-left"
//                    (displays the number of flags still available)
//  - resultMsgEl   — the <h1> with id "result-message"
//                    (shows "YOU WIN!" or "GAME OVER" in the modal)
//  - resultIconEl  — the <div> with id "result-icon"
//                    (shows a 🏆 or 💣 emoji in the modal)
//  - modalEl       — the <div> with id "modal"
//                    (the overlay that appears when the game ends)
//  - timerEl       — the <span> with class "counter"
//                    (displays the elapsed time in seconds)
//  - timeDisplayEl — the <span> with class "time-display"
//                    (shows the final time inside the modal on a win)
//  - resultTimeEl  — the <p> with class "result-time"
//                    (the paragraph wrapping timeDisplayEl; hidden on loss)
const gridEl = document.querySelector(".grid");
const flagsLeftEl = document.querySelector("#flags-left");
const resultMsgEl = document.querySelector("#result-message");
const resultIconEl = document.querySelector("#result-icon");
const modalEl = document.querySelector("#modal");
const timerEl = document.querySelector(".counter");
const timeDisplayEl = document.querySelector(".time-display");
const resultTimeEl = document.querySelector(".result-time");

// ============================================================
// === STEP 2: Define Difficulty Levels ===
// ============================================================
//
//  Goal: Store all the settings that change between difficulty levels
//        in one reusable place.
//
//  - Create a constant array called LEVELS.
//    Each element of the array is an object with three properties:
//      • name  (string)  — the display name: "Easy", "Medium", or "Hard"
//      • cols  (number)  — the number of columns (and rows) in the grid
//      • mines (number)  — the number of mines hidden in the grid
//    Suggested values:
//      Easy   → cols: 10, mines: 10
//      Medium → cols: 15, mines: 30
//      Hard   → cols: 20, mines: 70
const LEVELS = [
  { name: "Easy", cols: 10, mines: 10 },
  { name: "Medium", cols: 15, mines: 30 },
  { name: "Hard", cols: 20, mines: 70 },
];
//
//  - Create a constant array called NUMBER_COLORS.
//    It should contain exactly 8 colour strings (one per possible
//    adjacent-mine count, from 1 to 8).
//    These colours will be applied to the number shown on a revealed cell.
//    Use any 8 hex values you like — they will style the 1, 2, 3 … 8 labels.
const NUMBER_COLORS = [
  "#8B6AF5",
  "#74c2f9",
  "#42dfbc",
  "#f9dd5b",
  "#FEAC5E",
  "#ff5d9e",
  "#F29FF5",
  "#c154d8",
];
// ============================================================
// === STEP 3: Define the Game State Object ===
// ============================================================
//
//  Goal: Keep all data that changes during a game in one object so
//        it is easy to reset when a new game starts.
//
//  - Create a constant object called state with the following properties:
//      • level       (object)  — the currently active difficulty level;
//                                set it to LEVELS[0] (Easy) by default
//      • tiles       (array)   — the list of tile <div> elements in the grid;
//                                starts as an empty array []
//      • flagCount   (number)  — how many flags are currently placed;
//                                starts at 0
//      • isGameOver  (boolean) — whether the game has ended;
//                                starts as false
//      • firstClick  (boolean) — whether the player has not yet clicked
//                                any cell; starts as true (used for
//                                first-click mine-safety in Step 5)
//      • timerId     (any)     — the ID returned by setInterval for the
//                                running timer; starts as null
//      • elapsedSecs (number)  — how many seconds have passed since the
//                                first click; starts at 0
const state = {
  level: LEVELS[0],
  tiles: [],
  flagCount: 0,
  isGameOver: false,
  firstClick: true,
  timerId: null,
  elapsedSecs: 0,
};
// ============================================================
// === STEP 4: Build and Render the Grid ===
// ============================================================
//
//  Goal: Create all the tile elements and display them on the page.
//
//  Prerequisites: Steps 1–3.
//
//  - Create a function called buildGrid() that takes no parameters.
//
//  Inside buildGrid():
//
//  a) Read state.level.cols to know how wide the grid is.
//     Set the CSS custom property "--grid-width" on document.documentElement
//     to cols * 35 + "px" (35 is the tile size in pixels, matching the CSS).
//     Also set "--tile-size" to "35px".
//     This makes the container resize automatically for each difficulty.
//
//  b) Clear the grid container: set gridEl.innerHTML to an empty string.
//     Also reset state.tiles to an empty array [].
//
//  c) Loop from 0 to cols * cols (exclusive).
//     For each index i:
//       - Create a new <div> element.
//       - Add the CSS class "tile" to it.
//       - Append it to gridEl.
//       - Push it into state.tiles so you can access it later by index.
//       - Attach two event listeners to it (you will implement the
//         handler functions in Steps 7 and 9):
//           • "click"       → calls handleLeftClick(i)
//           • "contextmenu" → calls e.preventDefault(), then handleRightClick(i)
//
//  d) Call buildGrid() once at the bottom of your script (after all
//     function definitions) to render the grid when the page loads.
//     Also set flagsLeftEl.textContent to state.level.mines at the same time.
function buildGrid() {
  const { cols, mines } = state.level;
  const tileSize = 35;

  document.documentElement.style.setProperty(
    "--grid-width",
    `${cols * tileSize}px`,
  );
  document.documentElement.style.setProperty("--tile-size", `${tileSize}px`);

  gridEl.innerHTML = "";
  state.tiles = [];

  for (let i = 0; i < cols * cols; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    gridEl.appendChild(tile);
    state.tiles.push(tile);

    tile.addEventListener("click", () => handleLeftClick(i));
    tile.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      handleRightClick(i);
    });
  }

  flagsLeftEl.textContent = mines;
}
// ============================================================
// === STEP 5: Get Neighbouring Cell Indices ===
// ============================================================
//
//  Goal: Write a reusable helper that, given any cell's position,
//        returns the positions of all its valid neighbours.
//        You will call this helper in Steps 6, 7, and 8.
//
//  - Create a function called getNeighbours(idx) that takes one
//    parameter: idx (number), the index of a cell in state.tiles.
//
//  Inside getNeighbours():
//
//  a) Derive the cell's row and column from its index:
//       row = Math.floor(idx / cols)
//       col = idx % cols
//     where cols comes from state.level.cols.
//
//  b) Create an empty array called result.
//
//  c) Use two nested loops: an outer loop for dr from -1 to 1 and
//     an inner loop for dc from -1 to 1.
//     Skip the case where both dr and dc are 0 (that is the cell itself).
//     For each (dr, dc) pair:
//       - Compute the neighbour's row: r = row + dr
//       - Compute the neighbour's col: c = col + dc
//       - Only add r * cols + c to result if r and c are both within
//         the bounds of the grid (≥ 0 and < cols).
//
//  d) Return result — an array of valid neighbour indices.
function getNeighbours(idx) {
  const { cols } = state.level;
  const row = Math.floor(idx / cols);
  const col = idx % cols;

  const result = [];

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const r = row + dr;
      const c = col + dc;

      if (r >= 0 && r < cols && c >= 0 && c < cols) {
        result.push(r * cols + c);
      }
    }
  }
  return result;
}
// ============================================================
// === STEP 6: Place Mines (with First-Click Safety) ===
// ============================================================
//
//  Goal: Randomly assign mines to tiles, but guarantee that the
//        first tile the player clicks — and all its neighbours —
//        can never be a mine.
//
//  Prerequisites: Steps 3–5.
//
//  - Create a function called placeMines(safeIdx) that takes one
//    parameter: safeIdx (number), the index of the first-clicked tile.
//
function placeMines(safeIdx) {
  //  Inside placeMines():
  //
  //  a) Build an array called safeZone that contains safeIdx plus every
  //     index returned by getNeighbours(safeIdx).
  //     No mine may be placed on any index inside this array.
  const { cols, mines } = state.level;
  const total = cols * cols;

  const safeZone = [safeIdx, ...getNeighbours(safeIdx)];
  //
  //  b) Build an array called candidates that contains every index
  //     from 0 to (cols * cols - 1) that is NOT in safeZone.
  //     Use safeZone.includes(i) to check.
  const candidates = [];
  for (let i = 0; i < total; i++) {
    if (!safeZone.includes(i)) candidates.push(i);
  }
  //
  //  c) Shuffle candidates using the Fisher-Yates algorithm:
  //     loop from the last index down to 1, swap candidates[i] with
  //     candidates[j] where j is a random integer between 0 and i.
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  //
  //  d) Create an array called mineSet using candidates.slice(0, mines)
  //     to take the first state.level.mines elements.
  const mineSet = candidates.slice(0, mines);
  //
  //  e) Loop over every tile in state.tiles using forEach(tile, idx):
  //       - If mineSet.includes(idx), set tile.dataset.mine = "true".
  //       - Otherwise, count how many of the tile's neighbours are in
  //         mineSet using mineSet.includes(n) and store the result
  //         in tile.dataset.adjacent.
  //         (Use getNeighbours(idx) to get the neighbours.)
  state.tiles.forEach((tile, idx) => {
    if (mineSet.includes(idx)) {
      tile.dataset.mine = "true";
    } else {
      const adjacent = getNeighbours(idx).filter((n) =>
        mineSet.includes(mineSet),
      ).length;
      tile.dataset.adjacent = adjacent;
    }
  });
}
// ============================================================
// === STEP 7: Reveal a Tile (with Flood-Fill) ===
// ============================================================
//
//  Goal: Mark a tile as revealed and, if it has no adjacent mines,
//        automatically reveal all connected empty tiles.
//
//  Prerequisites: Steps 4–6.
//
//  - Create a function called revealTile(idx) that takes one
//    parameter: idx (number), the index of the tile to reveal.
//
//  Inside revealTile():
//
//  a) Get the tile element: state.tiles[idx].
//
//  b) If the tile already has the CSS class "checked" or "flag",
//     return immediately — do nothing. This is the guard that
//     prevents infinite recursion.
//
//  c) Add the CSS class "checked" to the tile.
//
//  d) Read the adjacent mine count: Number(tile.dataset.adjacent).
//
//  e) If the count is greater than 0:
//       - Set tile.textContent to the count number.
//       - Set tile.style.color to NUMBER_COLORS[count - 1].
//       - Stop here (do not recurse).
//
//  f) If the count is 0 (an empty tile):
//       - Call getNeighbours(idx) and for each neighbour index,
//         call revealTile(ni) recursively.
//         The guard in step (b) ensures this terminates correctly.

// ============================================================
// === STEP 8: Handle Left-Click ===
// ============================================================
//
//  Goal: Respond when the player left-clicks a tile — either by
//        revealing it or by triggering a game-over.
//
//  Prerequisites: Steps 3–7.
//
//  - Create a function called handleLeftClick(idx) that takes one
//    parameter: idx (number), the index of the clicked tile.
//
//  Inside handleLeftClick():
//
//  a) If state.isGameOver is true, return immediately.
//
//  b) Get the tile: state.tiles[idx].
//     If the tile has the class "checked" or "flag", return immediately.
//
//  c) If state.firstClick is true:
//       - Set state.firstClick to false.
//       - Call placeMines(idx) to place the mines now that you know
//         which tile is safe.
//       - Call startTimer() (defined in Step 11).
//
//  d) If tile.dataset.mine is truthy:
//       - Call triggerGameOver(idx) (defined in Step 10).
//
//  e) Otherwise:
//       - Call revealTile(idx).
//       - Call checkForWin() (defined in Step 10).

// ============================================================
// === STEP 9: Handle Right-Click (Flag) ===
// ============================================================
//
//  Goal: Let the player mark or unmark a tile as a suspected mine.
//
//  Prerequisites: Steps 1, 3, and 4.
//
//  - Create a function called handleRightClick(idx) that takes one
//    parameter: idx (number), the index of the right-clicked tile.
//
//  Inside handleRightClick():
//
//  a) If state.isGameOver is true, return immediately.
//
//  b) If the tile already has the CSS class "checked", return
//     immediately — revealed tiles cannot be flagged.
//
//  c) Call a helper function called toggleFlag(idx).
//
//  - Create a function called toggleFlag(idx) that takes one
//    parameter: idx (number).
//
//  Inside toggleFlag():
//
//  a) Get the tile: state.tiles[idx].
//
//  b) If the tile has the CSS class "flag":
//       - Remove the class "flag".
//       - Set tile.innerHTML to "" (clear the flag icon).
//       - Decrease state.flagCount by 1.
//
//  c) Otherwise, if state.flagCount is less than state.level.mines:
//       - Add the CSS class "flag".
//       - Set tile.innerHTML to FLAG_ICON (the SVG string defined
//         at the top of your file — copy it from the reference game.js).
//       - Increase state.flagCount by 1.
//
//  d) Always update flagsLeftEl.textContent to
//     state.level.mines - state.flagCount.

// ============================================================
// === STEP 10: Detect Win and Loss ===
// ============================================================
//
//  Goal: End the game as soon as the player wins or hits a mine.
//
//  Prerequisites: Steps 1–9.
//
//  --- Loss ---
//
//  - Create a function called triggerGameOver(clickedIdx) that takes
//    one parameter: clickedIdx (number), the index of the mine that
//    was clicked.
//
//  Inside triggerGameOver():
//
//  a) Set state.isGameOver to true.
//  b) Call stopTimer() (defined in Step 11).
//  c) Add the CSS class "shake" to the element with class "container"
//     to trigger the shake animation.
//  d) Loop over state.tiles with forEach(tile, idx):
//       - If tile.dataset.mine is truthy:
//           • Set tile.innerHTML to MINE_ICON (the SVG string from the
//             top of your file — copy it from game.js).
//           • Remove the CSS class "flag" (in case it was flagged).
//           • Add the CSS class "checked".
//           • If idx equals clickedIdx, also add the CSS class "mine-hit"
//             so that tile is highlighted differently.
//  e) Use setTimeout() with a 600 ms delay to call showModal(false).
//
//  --- Win ---
//
//  - Create a function called checkForWin() that takes no parameters.
//
//  Inside checkForWin():
//
//  a) Count the number of tiles that have the CSS class "checked":
//     filter state.tiles and get the length of the result.
//  b) If that count equals (cols * cols - mines):
//       - Call stopTimer().
//       - Set state.isGameOver to true.
//       - Call showModal(true).

// ============================================================
// === STEP 11: Update the UI — Timer and Modal ===
// ============================================================
//
//  Goal: Keep the timer display, flag counter, and result modal
//        in sync with the game state.
//
//  Prerequisites: Steps 1–3.
//
//  --- Timer functions ---
//
//  - Create a function called startTimer() that takes no parameters.
//      • If state.timerId is not null, return immediately (already running).
//      • Use setInterval() to run a callback every 1000 ms that:
//          - Increments state.elapsedSecs by 1.
//          - Sets timerEl.textContent to state.elapsedSecs padded to
//            3 digits with leading zeros (cap the displayed value at 999).
//            Hint: String(n).padStart(3, "0") produces "007" from 7.
//      • Store the interval ID in state.timerId.
//
//  - Create a function called stopTimer() that takes no parameters.
//      • Call clearInterval(state.timerId).
//      • Set state.timerId to null.
//
//  - Create a function called resetTimer() that takes no parameters.
//      • Call stopTimer().
//      • Set state.elapsedSecs to 0.
//      • Set timerEl.textContent to "000".
//
//  --- Modal function ---
//
//  - Create a function called showModal(isWin) that takes one parameter:
//    isWin (boolean) — true on a win, false on a loss.
//
//  Inside showModal():
//
//  a) Set resultIconEl.textContent to "🏆" if isWin, or "💣" if not.
//  b) Set resultMsgEl.textContent to "YOU WIN!" if isWin, or "GAME OVER".
//  c) Set timeDisplayEl.textContent to state.elapsedSecs.
//  d) Set resultTimeEl.style.display to "block" if isWin, or "none" if not.
//     (This shows the time line only when the player wins.)
//  e) Add the CSS class "show" to modalEl to make the modal visible.

// ============================================================
// === STEP 12: New Game and Difficulty Dropdown ===
// ============================================================
//
//  Goal: Let the player restart at any time and switch difficulty.
//
//  Prerequisites: All previous steps.
//
//  --- New game ---
//
//  - Create a function called newGame() that takes no parameters.
//
//  Inside newGame():
//
//  a) Remove the CSS class "show" from modalEl (hide the modal).
//  b) Call resetTimer().
//  c) Reset the following state properties:
//       • state.flagCount  → 0
//       • state.isGameOver → false
//       • state.firstClick → true
//  d) Remove the CSS class "shake" from the element with class "container".
//  e) Set flagsLeftEl.textContent to state.level.mines.
//  f) Call buildGrid() to rebuild the grid from scratch.
//
//  - Attach newGame as the click listener for two elements:
//      • The <button> with id "new-game" (inside the modal).
//      • The <svg> with id "refresh" (the restart icon in the header).
//
//  --- Difficulty dropdown ---
//
//  - Select the following three DOM elements:
//      • dropdownTitle   — the <div> with class "dropdown .title"
//                          (shows the current level name)
//      • dropdownMenu    — the <div> with class "dropdown .menu"
//                          (the list of options, hidden by default)
//      • dropdownOptions — all <div> elements with class "option"
//                          (one per difficulty level)
//
//  - Add a click listener on dropdownTitle that toggles the class
//    "show" on dropdownMenu (opens/closes the menu).
//
//  - Add a click listener on the whole document that removes the
//    class "show" from dropdownMenu whenever the click target is
//    NOT inside an element with class "dropdown".
//    Use e.target.closest(".dropdown") to check this.
//
//  - Loop over dropdownOptions and for each option add a click listener:
//      • Find the matching level in LEVELS where level.name equals
//        option.textContent.trim() — store it as chosen.
//      • If chosen exists, set state.level = chosen and update
//        dropdownTitle.textContent to chosen.name.
//      • Remove the class "show" from dropdownMenu.
//      • Call newGame().

// ============================================================
//  FINAL REMINDER — You've got this!
// ============================================================
//
//  Test after every step before moving on:
//    - Open index.html in your browser and check that the behaviour
//      matches what the step describes.
//    - Use console.log() to inspect values at key moments:
//        console.log(state.tiles)       — see all tile elements
//        console.log(tile.dataset)      — see a tile's mine/adjacent data
//        console.log(getNeighbours(12)) — verify the neighbour list
//
//  When something goes wrong:
//    - Open the browser DevTools with F12 and check the Console tab.
//      Error messages will usually point you to the exact line.
//    - Re-read index.html to confirm the id and class names you are
//      targeting — a single typo ("cheked" vs "checked") is enough
//      to break styles and logic.
//
//  Good luck, and have fun building Minesweeper!
buildGrid();
