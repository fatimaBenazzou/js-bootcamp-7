const navigation = document.querySelector("header nav .navigation");
const closeNavigation = document.querySelector("header nav .navigation .close");
const hamburgerMenu = document.querySelector("header nav .hamburger");

closeNavigation.addEventListener("click", () => {
  navigation.classList.remove("open");
});

hamburgerMenu.addEventListener("click", () => {
  navigation.classList.add("open");
});
