const OPTIONSP = { align: "start", loop: true };

const emblaNodeP = document.querySelector("#project-slider");
const dotsNodeP = document.querySelector(".project-dots");

const emblaApiP = EmblaCarousel(emblaNodeP, OPTIONSP);

const addDotButtonAndClickHandlers = (emblaApi, dotsNode) => {
  let dotNodes = [];

  const addDotBtnsWithClickHandlers = () => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => '<button class="dot" type="button"></button>')
      .join("");

    const scrollTo = (index) => {
      emblaApi.scrollTo(index);
    };

    dotNodes = Array.from(dotsNode.querySelectorAll(".dot"));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener("click", () => scrollTo(index), false);
    });
  };

  const toggleDotButtonsActive = () => {
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();
    dotNodes[previous].classList.remove("dot--selected");
    dotNodes[selected].classList.add("dot--selected");
  };

  addDotBtnsWithClickHandlers();
  toggleDotButtonsActive();

  emblaApi
    .on("reinit", addDotBtnsWithClickHandlers)
    .on("reinit", toggleDotButtonsActive)
    .on("select", toggleDotButtonsActive);
};

addDotButtonAndClickHandlers(emblaApiP, dotsNodeP);
