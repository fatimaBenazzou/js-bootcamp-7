const cards = document.querySelectorAll("#services .card");

cards.forEach((card) => {
  card.addEventListener("click", function () {
    cards.forEach((c) => c.classList.remove("card-selected"));

    card.classList.add("card-selected");
  });
});
