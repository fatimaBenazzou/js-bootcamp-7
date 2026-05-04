const tabContainers = document.querySelectorAll(".web-ressources > .container");

tabContainers.forEach((container) => {
  const tabs = container.querySelectorAll(".tabs .tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabAttr = tab.getAttribute("data-tab");

      container
        .querySelectorAll(".tab-pane")
        .forEach((pane) => pane.classList.remove("active"));

      tabs.forEach((t) => t.classList.remove("tab-active"));

      tab.classList.add("tab-active");

      const correspendingPane = container.querySelector(
        `.tab-pane[data-tab-pane="${tabAttr}"]`,
      );

      correspendingPane.classList.add("active");
    });
  });
});
