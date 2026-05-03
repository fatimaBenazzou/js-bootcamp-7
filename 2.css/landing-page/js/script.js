const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.setAttribute("visible", "true");
      } else {
        entry.target.removeAttribute("visible");
      }
    }
  },
  {
    threshold: 0.2,
  },
);

document
  .querySelectorAll("[data-observe-me]")
  .forEach((elm) => observer.observe(elm));
