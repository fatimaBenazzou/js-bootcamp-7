// 1. SELECT THE "NO" BUTTON
//    - Use document.getElementById to get the button with the ID "No" and store it in a variable.
const noButton = document.getElementById("No");
// 2. MAKE THE "NO" BUTTON MOVE WHEN HOVERED
//    - Add an event listener to the "No" button that triggers on "mouseover".
noButton.addEventListener("mouseover", () => {
  //    - Inside the listener:
  //        a. Calculate a random horizontal position (X) within the browser window:
  //            - It should be between 0 and (window width minus button width), so the button stays fully visible.
  const randomX = Math.random() * (window.innerWidth - noButton.offsetWidth);
  //        b. Calculate a random vertical position (Y) similarly using window height and button height.
  const randomY = Math.random() * (window.innerHeight - noButton.offsetHeight);
  //        c. Set the button's CSS 'position' to "fixed" so it moves relative to the viewport.
  noButton.style.position = "fixed";
  //        d. Update the button's 'left' and 'top' styles to the random X and Y values (in pixels).
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
  //    - (Optional: log the X value to the console for debugging or curiosity.)
});

// 3. SELECT THE "YES" BUTTON
//    - Use document.getElementById to get the button with the ID "Yes" and store it in a variable.
const yesButton = document.getElementById("Yes");

// 4. HANDLE THE "YES" BUTTON CLICK
//    - Add a "click" event listener to the "Yes" button.
yesButton.addEventListener("click", () => alert("I Know itttttt !!!!!!!!!"));
//    - When clicked, show an alert with a playful message like "I knew it!".
