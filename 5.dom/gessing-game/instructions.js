/*
=============================================================================
  EXERCISE: NUMBER GUESSING GAME
=============================================================================

  WHAT YOU ARE BUILDING:
  ----------------------
  A browser-based number guessing game.
  The computer secretly picks a random number between 1 and 100.
  The player has 5 attempts to guess it correctly.
  After each guess, the game gives feedback: "Too low!", "Too high!", or "Correct!".
  The game ends when the player guesses the right number or runs out of attempts.

  WHAT IS ALREADY PROVIDED:
  --------------------------
  - index.html: The full UI structure — a title, subtitle, a number input,
    a "GUESS" button, and four feedback paragraphs.
  - style.css: All visual styling is done. You do not need to touch it.

  YOUR JOB:
  ---------
  Write all the JavaScript logic in script.js from scratch.
  The HTML button already calls play() via onclick — your job is to build it.

  WHAT THE FINAL RESULT LOOKS LIKE:
  ----------------------------------
  - On page load, the cursor is automatically placed inside the input field.
  - The player types a number and clicks GUESS (or presses Enter).
  - The feedback paragraph shows "Too low!", "Too high!", or "Correct!" in color.
  - The attempts paragraph counts down from 5 to 0.
  - If the player wins, a congratulations message appears and the game locks.
  - If the player loses, the mystery number is revealed and the game locks.
  - The input and button are disabled after the game ends.

=============================================================================
*/

// =============================================================================
//  STEP 1 — SELECT THE DOM ELEMENTS YOU WILL NEED
// =============================================================================

// Create a const variable called `feedback`.
// Use document.getElementById() to select the element with the id "feedback".
// This paragraph will display messages like "Too low!", "Too high!", "Correct!".
const feedback = document.getElementById("feedback");
// Create a const variable called `attempts`.
// Use document.getElementById() to select the element with the id "attempts".
// This paragraph shows how many attempts the player has left.
const attempts = document.getElementById("attempts");

// Create a const variable called `game_status`.
// Use document.getElementById() to select the element with the id "game_status".
// This paragraph will display the final win or loss message at the end of the game.
const game_status = document.getElementById("game_status");

// Create a const variable called `guess_input`.
// Use document.getElementById() to select the element with the id "guess".
// This is the number input where the player types their guess.
const guess_input = document.getElementById("guess");

// Create a const variable called `guess_button`.
// Use document.getElementById() to select the element with the id "my_btn".
// You will need this reference to disable the button when the game ends.
const guess_button = document.getElementById("my_btn");

// =============================================================================
//  STEP 2 — SET UP THE GAME STATE VARIABLES
// =============================================================================

// Create a let variable called `mystery_number`.
// Assign it a random integer between 1 and 100 (inclusive).
// Use: Math.floor(Math.random() * 100) + 1
// This is the number the player must try to guess. It is set once at page load.
const mystery_number = Math.floor(Math.random() * 100) + 1;

// Create a let variable called `attempts_remaining`.
// Initialize it to the number 5.
// This tracks how many guesses the player has left. It will decrease with each guess.
let attempts_remaining = 5;

// Create a let variable called `game_over`.
// Initialize it to false (boolean).
// This flag will become true when the game ends, either by winning or losing.
// It is used to prevent the player from continuing to guess after the game is over.
let game_over = false;

// =============================================================================
//  STEP 3 — CREATE THE MAIN GAME FUNCTION: play()
// =============================================================================

// Create a function called `play`.
// It takes no parameters.
// This function is called every time the player submits a guess
// (either by clicking the button or pressing Enter).
// The button in index.html already calls it via onclick="play()".
function play() {
  // Inside play(), do the following in order:

  //   3a. EARLY RETURN — Guard against post-game input
  //   -------------------------------------------------
  //   Check if `game_over` is true.
  //   If it is, immediately return from the function using `return`.
  //   This ensures nothing happens if the player somehow triggers the function
  //   after the game has already ended.
  if (game_over) return;

  //   3b. READ AND PARSE THE PLAYER'S INPUT
  //   ---------------------------------------
  //   Create a const variable called `user_guess`.
  //   Use parseInt() on guess_input.value to convert the text in the input to an integer.
  //   This gives you the number the player typed.
  const user_guess = parseInt(guess_input.value);

  //   3c. VALIDATE THE INPUT
  //   -----------------------
  //   Check if user_guess is NaN (not a valid number), OR less than 1, OR greater than 100.
  //   Use isNaN(user_guess) for the NaN check.
  //   If any condition is true, call alert() with the message:
  //     "Please enter a valid number between 1 and 100."
  //   Then return early so the invalid guess is ignored.
  if (isNaN(user_guess) || user_guess < 1 || user_guess > 100) {
    alert("Please enter a valid number between 1 and 100.");
    return;
  }

  //   3d. DECREMENT THE ATTEMPTS COUNTER
  //   ------------------------------------
  //   Subtract 1 from `attempts_remaining` using --.
  //   This must happen BEFORE you check win/loss and update the UI,
  //   so that the displayed count is always current.
  attempts_remaining--;

  //   3e. HANDLE THE THREE POSSIBLE OUTCOMES OF THE GUESS
  //   -----------------------------------------------------
  //   Use an if / else if / else block to cover all three cases:
  //   CASE 1 — Correct guess (user_guess === mystery_number):
  if (user_guess === mystery_number) {
    //     - Set feedback.textContent to "Correct!"
    feedback.textContent = "Correct!";
    //     - Set feedback.style.color to "#28a745"  (green)
    feedback.style.color = "#28a745";
    //     - Set game_status.textContent to:
    //         "Congratulations! You guessed the mystery number!"
    game_status.textContent =
      "Congratulations! You guessed the mystery number!";
    //     - Note: Do NOT update attempts.textContent here — the game is over.
  } else if (user_guess < mystery_number) {
    //   CASE 2 — Guess is too low (user_guess < mystery_number):
    //     - Set feedback.textContent to "Too low! Try again."
    feedback.textContent = "Too low! Try again.";

    //     - Set feedback.style.color to "#0066cc"  (blue)
    feedback.style.color = "#0066cc";

    //     - Update attempts.textContent to show the new count, using a template literal:
    //         `Attempts Remaining: ${attempts_remaining}`
    attempts.textContent = `Attempts Remaining: ${attempts_remaining}`;
  } else {
    //   CASE 3 — Guess is too high (everything else):
    //     - Set feedback.textContent to "Too high! Try again."
    feedback.textContent = "Too high! Try again.";

    //     - Set feedback.style.color to "#cc0000"  (red)
    feedback.style.color = "#cc0000";

    //     - Update attempts.textContent to show the new count, using a template literal:
    //         `Attempts Remaining: ${attempts_remaining}`
    attempts.textContent = `Attempts Remaining: ${attempts_remaining}`;
  }

  //   3f. CHECK FOR GAME OVER (LOSS)
  //   --------------------------------
  //   AFTER the if/else block above, write a separate if statement.
  //   Check if: attempts_remaining === 0  AND  user_guess is NOT equal to mystery_number.
  //   If both are true, the player has run out of guesses without winning. So:
  //     - Set game_status.textContent using a template literal that includes mystery_number:
  //         `Sorry, you've used all your attempts! The mystery number was ${mystery_number}. Game over!`
  //     - Set game_status.className to "loss"
  //       (this applies specific CSS styling to the loss message)
  if (user_guess !== mystery_number && attempts_remaining === 0) {
    game_status.textContent = `Sorry, you've used all your attempts! The mystery number was ${mystery_number}. Game over!`;
    game_status.classList.add("loss");
    // game_status.className = "loss"
  }

  //   3g. LOCK THE GAME IF IT IS OVER
  //   ---------------------------------
  //   Write another separate if statement.
  //   Check if: user_guess === mystery_number  OR  attempts_remaining === 0
  //   If either is true, the game has ended (win or loss). So:
  //     - Set game_over to true
  //     - Set guess_input.disabled to true  (disables the input field)
  //     - Set guess_button.disabled to true  (disables the GUESS button)
  //   This prevents the player from making more guesses after the game ends.
  if (user_guess === mystery_number || attempts_remaining === 0) {
    game_over = true;
    guess_input.disabled = true;
    guess_button.disabled = true;
  }

  //   3h. RESET THE INPUT FIELD
  //   --------------------------
  //   After all logic is done, set guess_input.value to "" (empty string).
  //   Then call guess_input.focus() to bring the cursor back to the input field.
  //   This makes it easy for the player to type the next guess immediately.
  guess_input.value = "";
  guess_input.focus();
}

// =============================================================================
//  STEP 4 — ADD A KEYPRESS EVENT LISTENER ON THE INPUT
// =============================================================================

// Call addEventListener on `guess_input`.
// Listen for the "keypress" event.
// The callback receives the event object as a parameter (you can call it `event`).
// Inside the callback:
//   - Check if event.key === "Enter"  AND  game_over is false (use !game_over).
//   - If both are true, call play().
// This allows the player to press Enter instead of clicking the button,
// which is a common and expected behavior in browser forms.

guess_input.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && !game_over) play();
});
// =============================================================================
//  STEP 5 — ADD A LOAD EVENT LISTENER ON THE WINDOW
// =============================================================================

// Call addEventListener on `window`.
// Listen for the "load" event.
// Inside the callback (no parameters needed), call guess_input.focus().
// This automatically places the cursor in the input field as soon as the page loads,
// so the player can start typing right away without clicking first.
window.addEventListener("load", function () {
  guess_input.focus();
});
/*
=============================================================================
  FINAL REMINDERS
=============================================================================

  BEFORE YOU START CODING:
  - Open index.html and read it carefully.
  - Write down every id and class name you see — you will need them.
  - Make sure you understand which element does what in the UI.

  AS YOU CODE:
  - Build one step at a time. Test in the browser after each step.
  - Use console.log() to check your variables at each stage.
    For example: console.log(mystery_number) lets you see the answer
    during development (remove it when you are done).
  - Open the browser's DevTools console (F12) to catch any errors.

  GOOD HABITS:
  - Type the code manually instead of copy-pasting — it builds muscle memory
    and helps you truly understand what each line does.
  - If something doesn't work, re-read the HTML to confirm the ids are correct
    and re-check your logic step by step.

  You've got this — good luck!

=============================================================================
*/
