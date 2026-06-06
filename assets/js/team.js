document.addEventListener("DOMContentLoaded", () => {
  const memberCards = Array.from(document.querySelectorAll(".member-card"));

  const closeAllTips = (exceptCard = null) => {
    memberCards.forEach((card) => {
      if (card !== exceptCard) {
        card.classList.remove("is-tip-open");
        card.setAttribute("aria-expanded", "false");
      }
    });
  };

  memberCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !card.classList.contains("is-tip-open");
      closeAllTips(card);
      card.classList.toggle("is-tip-open", willOpen);
      card.setAttribute("aria-expanded", String(willOpen));
    });
  });

  document.addEventListener("click", () => closeAllTips());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllTips();
      document.activeElement?.blur?.();
    }
  });
});
