const counterElm = document.querySelector("h1");
const incrementButton = document.getElementById("increment");
const decrementButton = document.getElementById("decrement");
const resetButton = document.querySelector("#reset");

let counter = 0;

incrementButton.addEventListener("click", () => {
  counter++;
  counterElm.textContent = counter;
});

counterElm.style.color = "red";
