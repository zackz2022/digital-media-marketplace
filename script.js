document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     SCRUFFY BUTT DESIGN CATALOG FILTER
  ========================================== */

  const filterButtons =
    document.querySelectorAll(".filter-btn");

  const productCards =
    document.querySelectorAll(".product-card");


  if (
    filterButtons.length > 0 &&
    productCards.length > 0
  ) {

    filterButtons.forEach(button => {

      button.addEventListener("click", () => {

        const selectedCategory =
          button.dataset.filter || "all";


        /* Update active button */

        filterButtons.forEach(btn => {
          btn.classList.remove("active");
        });

        button.classList.add("active");


        /* Filter design cards */

        productCards.forEach(card => {

          const cardCategory =
            card.dataset.category;


          const shouldShow =
            selectedCategory === "all" ||
            cardCategory === selectedCategory;


          card.style.display =
            shouldShow ? "" : "none";

        });

      });

    });

  }

});
