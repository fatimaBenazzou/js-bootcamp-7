const btn = document.querySelector("#toggle");
const msg = document.querySelector("#secret");

msg.style.display = "none";

btn.addEventListener("click", () => {
  if (msg.style.display === "none") {
    msg.style.display = "block";
  } else {
    msg.style.display = "none";
  }
});
