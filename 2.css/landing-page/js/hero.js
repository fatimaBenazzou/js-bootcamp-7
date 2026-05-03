const numberSpans = document.querySelectorAll(".number[data-count]");

numberSpans.forEach((span) => {
  if (span.hasAttribute("data-animated")) return;

  span.setAttribute("data-animated", "true");

  const target = parseInt(span.getAttribute("data-count"), 10);

  let counter = 0;
  const duration = 2000;

  const stepTime = Math.max(1, Math.floor(duration / target));

  const increment = Math.max(1, Math.floor(target / (duration / stepTime)));

  const timer = setInterval(() => {
    counter += increment;

    if (counter >= target) {
      counter = target;
      clearInterval(timer);
    }

    span.textContent = counter;
  }, stepTime);

  observer.observe(span);
});
