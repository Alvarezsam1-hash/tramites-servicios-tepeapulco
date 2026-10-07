document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ELEMENTOS
  ====================================================== */

  const heroSearchForm =
    document.getElementById("heroSearchForm");

  const heroSearch =
    document.getElementById("heroSearch");

  const serviceSearch =
    document.getElementById("serviceSearch");

  const cards =
    Array.from(
      document.querySelectorAll(".service-card")
    );

  const resultCount =
    document.getElementById("resultCount");

  const noResults =
    document.getElementById("noResults");

  const backTop =
    document.getElementById("backTop");


  /* =====================================================
     NORMALIZAR TEXTO
  ====================================================== */

  function normalize(text) {

    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  }


  /* =====================================================
     FILTRAR DIRECCIONES
  ====================================================== */

  function filterCards(value) {

    const search =
      normalize(value);

    let visible =
      0;


    cards.forEach(card => {

      const title =
        card.querySelector(
          ".card-content strong"
        )?.textContent || "";

      const subtitle =
        card.querySelector(
          ".card-content small"
        )?.textContent || "";

      const dataSearch =
        card.dataset.search || "";


      const completeText =
        normalize(
          title +
          " " +
          subtitle +
          " " +
          dataSearch
        );


      const matches =
        search === "" ||
        completeText.includes(search);


      if (matches) {

        card.style.display =
          "flex";

        visible++;

      } else {

        card.style.display =
          "none";

      }

    });


    /* Contador */

    if (resultCount) {

      resultCount.textContent =
        visible === 1
          ? "1 dirección"
          : `${visible} direcciones`;

    }


    /* Mensaje sin resultados */

    if (noResults) {

      if (visible === 0) {

        noResults.classList.add(
          "visible"
        );

      } else {

        noResults.classList.remove(
          "visible"
        );

      }

    }

  }


  /* =====================================================
     BUSCADOR PRINCIPAL
  ====================================================== */

  if (heroSearchForm) {

    heroSearchForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const value =
          heroSearch.value.trim();


        /* Bajar a las direcciones */

        document
          .getElementById("direcciones")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });


        /* Copiar búsqueda */

        if (serviceSearch) {

          serviceSearch.value =
            value;

        }


        filterCards(value);

      }
    );

  }


  /* =====================================================
     BUSCADOR DE DIRECCIONES
  ====================================================== */

  if (serviceSearch) {

    serviceSearch.addEventListener(
      "input",
      () => {

        filterCards(
          serviceSearch.value
        );

      }
    );

  }


  /* =====================================================
     TECLA ESC
  ====================================================== */

  if (serviceSearch) {

    serviceSearch.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Escape"
        ) {

          serviceSearch.value =
            "";

          filterCards("");

          serviceSearch.blur();

        }

      }
    );

  }


  /* =====================================================
     BOTÓN REGRESAR ARRIBA
  ====================================================== */

  window.addEventListener(
    "scroll",
    () => {

      if (
        window.scrollY > 500
      ) {

        backTop?.classList.add(
          "visible"
        );

      } else {

        backTop?.classList.remove(
          "visible"
        );

      }

    }
  );


  if (backTop) {

    backTop.addEventListener(
      "click",
      () => {

        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

      }
    );

  }


  /* =====================================================
     INICIO
  ====================================================== */

  filterCards("");


});
