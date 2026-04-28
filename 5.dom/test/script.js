const header = document.getElementById("header");
console.log(header.textContent);
header.textContent = "Welcome to Advanced DOM Manipulation!";
console.log(header.textContent);

const newElement = document.createElement("button");
newElement.textContent = "Click me!";

document.body.appendChild(newElement);

newElement.addEventListener("click", function () {
  alert("Who's That !!!!");
});
