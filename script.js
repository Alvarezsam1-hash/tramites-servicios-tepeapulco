/* =========================================================
   PORTAL DE TRÁMITES Y SERVICIOS MUNICIPALES
   MUNICIPIO DE TEPEAPULCO, HIDALGO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTOS DEL PORTAL
  ======================================================= */

  const heroForm =
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


  /* =======================================================
     NORMALIZAR TEXTO
     
     Permite buscar:
     "Ecología"
     aunque se escriba:
     "ecologia"
  ======================================================= */

  function normalize(text) {

    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .trim();

  }


  /* =======================================================
     FILTRAR DIRECCIONES
  ======================================================= */

  function filterCards(value) {

    const term =
      normalize(value);

    let visible =
      0;


    cards.forEach(card => {

      const name =
        normalize(
          card.dataset.name ||
          card.innerText
        );


      /* Si no hay búsqueda,
         mostrar todas */

      if (
        !term ||
        name.includes(term)
      ) {

        card.style.display =
          "";

        visible++;

      }

      /* Si no coincide,
         ocultar */

      else {

        card.style.display =
          "none";

      }

    });


    /* =====================================================
       ACTUALIZAR CONTADOR
    ===================================================== */

    if (resultCount) {

      if (visible === 1) {

        resultCount.textContent =
          "1 dirección";

      }

      else {

        resultCount.textContent =
          `${visible} direcciones`;

      }

    }


    /* =====================================================
       MOSTRAR / OCULTAR MENSAJE
    ===================================================== */

    if (noResults) {

      noResults.style.display =
        visible === 0
          ? "block"
          : "none";

    }

  }


  /* =======================================================
     BUSCADOR DE LA SECCIÓN DE DIRECCIONES
  ======================================================= */

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


  /* =======================================================
     BUSCADOR PRINCIPAL DEL ENCABEZADO
  ======================================================= */

  if (heroForm) {

    heroForm.addEventListener(
      "submit",
      event => {

        /* Evitar que la página
           se recargue */

        event.preventDefault();


        const value =
          heroSearch
            ? heroSearch.value.trim()
            : "";


        /* Ir a la sección
           de direcciones */

        const directions =
          document.getElementById(
            "direcciones"
          );


        if (directions) {

          directions.scrollIntoView({
            behavior: "smooth"
          });

        }


        /* Pasar la búsqueda
           al segundo buscador */

        if (serviceSearch) {

          serviceSearch.value =
            value;

          filterCards(
            value
          );

          serviceSearch.focus();

        }

      }
    );

  }


  /* =======================================================
     BOTÓN "VOLVER ARRIBA"
  ======================================================= */

  window.addEventListener(
    "scroll",
    () => {

      if (!backTop) {
        return;
      }


      if (
        window.scrollY > 450
      ) {

        backTop.classList.add(
          "visible"
        );

      }

      else {

        backTop.classList.remove(
          "visible"
        );

      }

    }
  );


  /* =======================================================
     FUNCIONAMIENTO DEL BOTÓN
  ======================================================= */

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


  /* =======================================================
     BUSCAR AL PRESIONAR ENTER
     
     El buscador funciona también
     directamente con la tecla Enter.
  ======================================================= */

  if (serviceSearch) {

    serviceSearch.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter"
        ) {

          event.preventDefault();

          filterCards(
            serviceSearch.value
          );

        }

      }
    );

  }


  /* =======================================================
     LIMPIAR BÚSQUEDA CON ESC
  ======================================================= */

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


  /* =======================================================
     INICIO
     
     Mostrar las 18 direcciones
     al cargar el portal.
  ======================================================= */

  filterCards("");

});
