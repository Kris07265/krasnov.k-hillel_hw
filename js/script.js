const cards = document.querySelector(".cards");
cards.addEventListener("click", (e) => {
    const longText = e.target.closest(".card").querySelector(".card__long");
    const btn = e.target.closest(".card").querySelector("[data-read-more-btn]");
    if (e.target.closest("[data-read-more-btn]")) {
        if (longText.hasAttribute("hidden")) {
            longText.removeAttribute("hidden");
            btn.textContent = "Hide";
            btn.classList.add("expanded");
        } else {
            longText.setAttribute("hidden", "");
            btn.textContent = "Read more";
            btn.classList.remove("expanded");
        }
    }
});