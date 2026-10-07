document.addEventListener("DOMContentLoaded", () => {
  const serviceSearch = document.getElementById("serviceSearch");
  const heroSearch = document.getElementById("heroSearch");
  const heroSearchBtn = document.getElementById("heroSearchBtn");
  const clearSearch = document.getElementById("clearSearch");
  const cards = [...document.querySelectorAll(".service-card")];
  const resultCount = document.getElementById("resultCount");
  const noResults = document.getElementById("noResults");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const backTop = document.getElementById("backTop");

  function normalize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function filterCards(value) {
    const query = normalize(value.trim());
    let visible = 0;

    cards.forEach(card => {
      const name = normalize(card.dataset.name || card.textContent);
      const show = !query || name.includes(query);
      card.style.display = show ? "grid" : "none";
      if (show) visible++;
    });

    resultCount.textContent = `${visible} ${visible === 1 ? "dirección" : "direcciones"}`;
    noResults.style.display = visible === 0 ? "block" : "none";
    clearSearch.style.display = query ? "block" : "none";
  }

  serviceSearch.addEventListener("input", e => filterCards(e.target.value));

  clearSearch.addEventListener("click", () => {
    serviceSearch.value = "";
    filterCards("");
    serviceSearch.focus();
  });

  function sendHeroSearch() {
    serviceSearch.value = heroSearch.value;
    filterCards(heroSearch.value);
    document.getElementById("direcciones").scrollIntoView({ behavior: "smooth" });
  }

  heroSearchBtn.addEventListener("click", sendHeroSearch);
  heroSearch.addEventListener("keydown", e => {
    if (e.key === "Enter") sendHeroSearch();
  });

  menuToggle.addEventListener("click", () => {
    const opened = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", opened ? "true" : "false");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 500);
  });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
