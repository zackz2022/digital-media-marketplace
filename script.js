document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('resource-search');
  const filterButtons = document.querySelectorAll('.filter-chip');
  const resourceCards = document.querySelectorAll('.resource-card');
  const noResults = document.getElementById('no-results');
  const categoryTitle = document.getElementById('category-title');

  if (!searchInput || resourceCards.length === 0) return;

  let activeCategory = 'all';
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get('category');

  if (categoryParam && [...filterButtons].some((button) => button.dataset.category === categoryParam)) {
    activeCategory = categoryParam;
  }

  const updateCards = () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    resourceCards.forEach((card) => {
      const title = card.querySelector('.resource-title')?.textContent.toLowerCase() || '';
      const category = card.dataset.category || 'all';
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = !searchValue || title.includes(searchValue) || category.includes(searchValue);
      const isVisible = matchesCategory && matchesSearch;
      card.classList.toggle('hidden', !isVisible);
      if (isVisible) visibleCount += 1;
    });

    if (noResults) {
      const hasResults = visibleCount > 0;
      noResults.classList.toggle('hidden', hasResults);
    }

    if (categoryTitle) {
      const selectedButton = document.querySelector(`.filter-chip[data-category="${activeCategory}"]`);
      const fallbackText = activeCategory === 'all' ? 'All resources' : selectedButton?.textContent || 'Resources';
      categoryTitle.textContent = fallbackText;
    }
  };

  searchInput.addEventListener('input', updateCards);

  filterButtons.forEach((button) => {
    const isSelected = (button.dataset.category || 'all') === activeCategory;
    button.classList.toggle('active', isSelected);

    button.addEventListener('click', () => {
      activeCategory = button.dataset.category || 'all';
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      updateCards();
    });
  });

  updateCards();
});
