/*
 * ============================================================
 *  EXERCISE: POMODORO FOCUS TIMER
 * ============================================================
 *
 *  You are building a Pomodoro Timer — a productivity tool
 *  that alternates between focus sessions (25 min) and short
 *  breaks (5 min). Each phase ends and the next one begins
 *  automatically. The app also tracks how many sessions you
 *  have completed and how many minutes you have focused.
 *
 *  The following files are already provided. Do not edit them:
 *    - index.html  (the full UI: timer, buttons, settings, stats)
 *    - style.css   (all the styling)
 *
 *  Before you write any code, open index.html and read every
 *  id attribute you see. Each one must match exactly in your JS.
 *
 * ============================================================
 *  TIPS TO FOLLOW AT EVERY STEP
 * ============================================================
 *  - After finishing each step, reload the page and open
 *    DevTools (F12) to test before moving on.
 *  - Use console.log() to inspect your variables as you go,
 *    then remove those logs once everything works.
 *  - Type every line yourself. Do not copy-paste.
 * ============================================================
 */

// ============================================================
// STEP 1 — STATE VARIABLES
// ============================================================
// These variables hold the current state of the app. Declare
// each one with `let` because their values will change at runtime.
//
//  Variable name        Type      Description                                  Initial value
//  -------------------  --------  -------------------------------------------  -------------
//  sessionDuration      number    Length of a focus session in minutes         25
//  breakDuration        number    Length of a break in minutes                 5
//  timeRemaining        number    Seconds left in the current countdown        25 * 60
//  totalTime            number    Total seconds for the current phase          25 * 60
//  isRunning            boolean   Whether the timer is currently ticking       false
//  isSessionMode        boolean   true = focus session, false = break          true
//  intervalId           —         Stores the ID returned by setInterval        null
//  sessionsCompleted    number    Number of focus sessions finished so far     0
//  totalMinutesFocused  number    Total minutes spent focusing                 0
let sessionDuration = 25;
let breakDuration = 5;
let timeRemaining = 25 * 60;
let totalTime = 25 * 60;
let isRunning = false;
let isSessionMode = true;
let intervalId = null;
let sessionsCompleted = 0;
let totalMinutesFocused = 0;

// ============================================================
// STEP 2 — DOM ELEMENT REFERENCES
// ============================================================
// Use document.getElementById() to grab each element and store
// it in a `const`. Do this once here — never call
// getElementById() anywhere else in the file.
//
//  Variable name        Element id              Notes
//  -------------------  ----------------------  -----------------------
//  timerEl              "timer"                 The MM:SS countdown display
//  statusTextEl         "status-text"           The status label
//  progressBarEl        "progress-bar"          The bar that fills over time
//  startBtn             "start-btn"
//  pauseBtn             "pause-btn"
//  resetBtn             "reset-btn"
//  sessionValueEl       "session-value"         Displays the focus duration
//  sessionIncBtn        "session-inc"
//  sessionDecBtn        "session-dec"
//  breakValueEl         "break-value"           Displays the break duration
//  breakIncBtn          "break-inc"
//  breakDecBtn          "break-dec"
//  sessionsCompletedEl  "sessions-completed"
//  totalTimeEl          "total-time"
//  themeToggleBtn       "theme-toggle"
const timerEl = document.getElementById("timer");
const statusTextEl = document.getElementById("status-text");
const progressBarEl = document.getElementById("progress-bar");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const sessionValueEl = document.getElementById("session-value");
const sessionIncBtn = document.getElementById("session-inc");
const sessionDecBtn = document.getElementById("session-dec");
const breakValueEl = document.getElementById("break-value");
const breakIncBtn = document.getElementById("break-inc");
const breakDecBtn = document.getElementById("break-dec");
const sessionsCompletedEl = document.getElementById("sessions-completed");
const totalTimeEl = document.getElementById("total-time");
const themeToggleBtn = document.getElementById("theme-toggle");
// ============================================================
// STEP 3 — formatTime(seconds)
// ============================================================
// A small helper function that converts a number of seconds
// into a formatted string like "MM:SS".
//
//  Parameter  : seconds — a number
//  Returns    : a string, for example "25:00" or "04:07"
//
//  Steps inside the function:
//    1. Divide seconds by 60 and round down to get the minutes.
//    2. Use the remainder (%) to get the leftover seconds.
//    3. Pad both numbers to 2 digits so that 5 becomes "05".
//       Use String(value).padStart(2, "0") for each one.
//    4. Return them joined by a colon inside a template literal.
//
//  Expected results:
//    formatTime(65)  →  "01:05"
//    formatTime(5)   →  "00:05"
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
// ============================================================
// STEP 4 — updateUI()
// ============================================================
// Call this function after any state change to keep the entire
// interface in sync with the current variables.
// No parameters. No return value.
//
//  Inside the function:
//    1. Set timerEl.textContent to formatTime(timeRemaining).
//    2. Set the "datetime" attribute on timerEl.
//         The value should look like "PT25M" for 25 minutes.
//    3. Calculate how much of the bar should be filled:
//         elapsed seconds / totalTime × 100  (gives a percentage)
//    4. Set progressBarEl.style.width to that percentage
//         as a string that ends with "%", e.g. "40%".
//    5. Disable startBtn when the timer is running;
//       enable it when the timer is stopped.
//    6. Disable pauseBtn when the timer is stopped;
//       enable it when the timer is running.
//    7. Set sessionsCompletedEl.textContent to sessionsCompleted.
//    8. Set totalTimeEl.textContent to totalMinutesFocused.
function updateUI() {
  timerEl.textContent = formatTime(timeRemaining);
  timerEl.setAttribute("datetime", `PT${Math.floor(timeRemaining / 60)}M`);

  const progress = ((totalTime - timeRemaining) / totalTime) * 100;
  progressBarEl.style.width = `${progress}%`;

  startBtn.disabled = isRunning;
  pauseBtn.disabled = !isRunning;

  sessionsCompletedEl.textContent = sessionsCompleted;
  totalTimeEl.textContent = totalMinutesFocused;
}
// ============================================================
// STEP 5 — setStatus(text)
// ============================================================
// A small helper that updates the status label on screen.
//
//  Parameter  : text — a string
//  Returns    : nothing
//
//  Set statusTextEl.textContent to the text parameter.
//
//  Example calls:
//    setStatus("Focusing... 🎯")
//    setStatus("Break Time! 🎉")
//    setStatus("Paused")
function setStatus(text) {
  statusTextEl.textContent = text;
}

// ============================================================
// STEP 6 — tick()
// ============================================================
// This function is called automatically every second by
// setInterval. No parameters. No return value.
//
//  If timeRemaining is greater than 0:
//    1. Subtract 1 from timeRemaining.
//    2. Update timerEl.textContent using formatTime(timeRemaining).
//    3. Recalculate the progress percentage (same formula as step 4)
//       and update progressBarEl.style.width.
//
//  If timeRemaining has reached 0:
//    Call handleTimerComplete().

function tick() {
  if (timeRemaining > 0) {
    timeRemaining--;
    timerEl.textContent = formatTime(timeRemaining);
    const progress = ((totalTime - timeRemaining) / totalTime) * 100;
    progressBarEl.style.width = `${progress}%`;
  } else {
    handleTimerComplete();
  }
}
// ============================================================
// STEP 7 — handleTimerComplete()
// ============================================================
// Called by tick() when the countdown reaches 0.
// It updates the statistics, switches to the next phase,
// and starts it automatically.
// No parameters. No return value.
//
//  1. Call stopTimer() to clear the interval safely.
//
//  2. Check which phase just ended:
//
//     If it was a FOCUS session (isSessionMode is true):
//       - Add 1 to sessionsCompleted.
//       - Add sessionDuration to totalMinutesFocused.
//       - Set isSessionMode to false.
//       - Set timeRemaining and totalTime to breakDuration * 60.
//       - Call setStatus("Break Time! 🎉").
//
//     If it was a BREAK (isSessionMode is false):
//       - Set isSessionMode to true.
//       - Set timeRemaining and totalTime to sessionDuration * 60.
//       - Call setStatus("Ready to Focus").
//
//  3. Call updateUI() to refresh the screen.
//  4. Call startTimer() to begin the next phase automatically.
function handleTimerComplete() {
  stopTimer();

  if (isSessionMode) {
    sessionsCompleted++;
    totalMinutesFocused += sessionDuration;
    isSessionMode = false;
    timeRemaining = breakDuration * 60;
    totalTime = breakDuration * 60;
    setStatus("Break Time! 🎉");
  } else {
    isSessionMode = true;
    timeRemaining = sessionDuration * 60;
    totalTime = sessionDuration * 60;
    setStatus("Ready to Focus");
  }

  updateUI();
  startTimer();
}
// ============================================================
// STEP 8 — startTimer()
// ============================================================
// Starts the countdown. No parameters. No return value.
//
//  Run the following steps only if isRunning is false
//  (this prevents accidentally starting two intervals at once):
//    1. Set isRunning to true.
//    2. Call setStatus with the appropriate message:
//         focus session → "Focusing... 🎯"
//         break         → "On Break ☕"
//    3. Call setInterval(tick, 1000) and store the returned ID
//       in intervalId.
//    4. Disable startBtn and enable pauseBtn.
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    setStatus(isSessionMode ? "Focusing... 🎯" : "On Break ☕");
    intervalId = setInterval(tick, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
  }
}
// ============================================================
// STEP 9 — stopTimer()
// ============================================================
// Pauses the countdown without changing any time values.
// No parameters. No return value.
//
//  Run the following steps only if isRunning is true:
//    1. Set isRunning to false.
//    2. Call clearInterval(intervalId) to stop the ticking.
//    3. Set intervalId to null.
//    4. Call setStatus with the appropriate message:
//         focus session → "Paused"
//         break         → "Break Paused"
//    5. Enable startBtn and disable pauseBtn.
function stopTimer() {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
    intervalId = null;
    setStatus(isSessionMode ? "Paused" : "Break Paused");
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}
// ============================================================
// STEP 10 — resetTimer()
// ============================================================
// Stops the timer and restores it to the start of the current
// session duration. No parameters. No return value.
//
//  1. Call stopTimer().
//  2. Set isSessionMode to true.
//  3. Set timeRemaining and totalTime to sessionDuration * 60.
//  4. Call setStatus("Ready to Focus").
//  5. Call updateUI().
function resetTimer() {
  stopTimer();
  isSessionMode = true;
  timeRemaining = sessionDuration * 60;
  totalTime = sessionDuration * 60;
  setStatus("Ready to Focus");
  updateUI();
}
// ============================================================
// STEP 11 — updateSessionDuration(change)
// ============================================================
// Adjusts the focus session duration when the + or − button
// is clicked. The parameter `change` is either 1 or -1.
//
//  1. Compute newDuration = sessionDuration + change.
//  2. Proceed only if newDuration is between 1 and 60 (inclusive).
//  3. Update sessionDuration and sessionValueEl.textContent
//     to the new value.
//  4. If the timer is not running and we are in session mode,
//     also update timeRemaining and totalTime to newDuration * 60,
//     then call updateUI() so the clock preview updates live.
function updateSessionDuration(change) {
  const newDuration = sessionDuration + change;
  if (newDuration >= 1 && newDuration <= 60) {
    sessionDuration = newDuration;
    sessionValueEl.textContent = newDuration;
    if (!isRunning && isSessionMode) {
      timeRemaining = newDuration * 60;
      totalTime = newDuration * 60;
      updateUI();
    }
  }
}
// ============================================================
// STEP 12 — updateBreakDuration(change)
// ============================================================
// Adjusts the break duration when the + or − button is clicked.
// The parameter `change` is either 1 or -1.
//
//  1. Compute newDuration = breakDuration + change.
//  2. Proceed only if newDuration is between 1 and 30 (inclusive).
//  3. Update breakDuration and breakValueEl.textContent
//     to the new value.
//  4. If the timer is not running and we are in break mode
//     (isSessionMode is false), also update timeRemaining and
//     totalTime to newDuration * 60, then call updateUI().
function updateSessionDuration(change) {
  const newDuration = breakDuration + change;
  if (newDuration >= 1 && newDuration <= 30) {
    breakDuration = newDuration;
    breakValueEl.textContent = newDuration;
    if (!isRunning && !isSessionMode) {
      timeRemaining = newDuration * 60;
      totalTime = newDuration * 60;
      updateUI();
    }
  }
}
// ============================================================
// STEP 13 — toggleTheme()
// ============================================================
// Switches between dark mode and light mode.
// No parameters. No return value.
//
//  1. Call classList.toggle("light") on document.body.
//     This adds the class if it is missing, or removes it if
//     it is already there.
//  2. Check whether the class is now present using
//     classList.contains("light") and store the result.
//  3. Save the current theme to localStorage under the key "theme":
//     use the value "light" if light mode is active, "dark" otherwise.
function toggleTheme() {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// ============================================================
// STEP 14 — loadThemePreference()
// ============================================================
// Reads the saved theme from localStorage and applies it
// immediately when the page loads.
// No parameters. No return value.
//
//  1. Read the value stored under the key "theme" in localStorage.
//  2. If the value is "light", add the class "light" to document.body.
function loadThemePreference() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
}
// ============================================================
// STEP 15 — EVENT LISTENERS
// ============================================================
// Attach all button listeners and keyboard shortcuts here.
// Write them directly — no wrapper function needed.
//
//  Buttons:
//    startBtn       → click → startTimer
//    pauseBtn       → click → stopTimer
//    resetBtn       → click → resetTimer
//    sessionIncBtn  → click → call updateSessionDuration with  1
//    sessionDecBtn  → click → call updateSessionDuration with -1
//    breakIncBtn    → click → call updateBreakDuration with  1
//    breakDecBtn    → click → call updateBreakDuration with -1
//    themeToggleBtn → click → toggleTheme
//
//  Keyboard shortcuts — attach one "keydown" listener to `document`:
//    Space bar (e.code === "Space"), only when e.target is document.body:
//      - Call e.preventDefault() to prevent the page from scrolling.
//      - If isRunning is true, call stopTimer(); otherwise call startTimer().
//    R key (e.code === "KeyR"), only when e.target is document.body:
//      - Call e.preventDefault().
//      - Call resetTimer().
startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

sessionIncBtn.addEventListener("click", () => updateSessionDuration(1));
sessionDecBtn.addEventListener("click", () => updateSessionDuration(-1));
breakIncBtn.addEventListener("click", () => updateBreakDuration(1));
breakDecBtn.addEventListener("click", () => updateBreakDuration(-1));

themeToggleBtn.addEventListener("click", toggleTheme);

document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
    isRunning ? stopTimer() : startTimer();
  }
  if (e.code === "KeyR" && e.target === document.body) {
    e.preventDefault();
    resetTimer();
  }
});

// ============================================================
// STEP 16 — START THE APP
// ============================================================
// Place these two calls at the very bottom of the file.
// They run once when the page loads.
//
//  1. loadThemePreference()  — restore the saved dark/light choice
//  2. updateUI()             — render the initial timer state
loadThemePreference();
updateUI();
