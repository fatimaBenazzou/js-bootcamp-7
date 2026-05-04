const OPTIONST = { align: "start", loop: true };

const emblaNodeT = document.querySelector("#review-slider");
const prevBtn = emblaNodeT.querySelector(".action .prev");
const nextBtn = emblaNodeT.querySelector(".action .next");

const emblaApiT = EmblaCarousel(emblaNodeT, OPTIONST);

const addTogglePrevNextButtonsActive = (emblaApi, prevBtn, nextBtn) => {
  const togglePrevNextButtonsState = () => {
    if (emblaApi.canScrollPrev()) {
      prevBtn.removeAttribute("disabled");
    } else {
      prevBtn.setAttribute("disabled", "true");
    }

    if (emblaApi.canScrollNext()) {
      nextBtn.removeAttribute("disabled");
    } else {
      nextBtn.setAttribute("disabled", "true");
    }
  };

  togglePrevNextButtonsState();

  emblaApi
    .on("select", togglePrevNextButtonsState)
    .on("reinit", togglePrevNextButtonsState);
};

const addPrevNextButtonClickHandlers = (emblaApi, prevBtn, nextBtn) => {
  const scrollPrev = () => {
    emblaApi.scrollPrev();
  };
  const scrollNext = () => {
    emblaApi.scrollNext();
  };
  prevBtn.addEventListener("click", scrollPrev, false);
  nextBtn.addEventListener("click", scrollNext, false);

  addTogglePrevNextButtonsActive(emblaApi, prevBtn, nextBtn);
};

addPrevNextButtonClickHandlers(emblaApiT, prevBtn, nextBtn);
