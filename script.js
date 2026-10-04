document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('resource-search');
  const filterButtons = document.querySelectorAll('.filter-chip');
  const resourceCards = document.querySelectorAll('.resource-card');

  if (!searchInput || resourceCards.length === 0) return;

  let activeCategory = 'all';

  const updateCards = () => {
    const searchValue = searchInput.value.trim().toLowerCase();

    resourceCards.forEach((card) => {
      const title = card.querySelector('.resource-title')?.textContent.toLowerCase() || '';
      const category = card.dataset.category || 'all';
      const matchesCategory = activeCategory === 'all' || category === activeCategory;
      const matchesSearch = !searchValue || title.includes(searchValue) || category.includes(searchValue);
      card.classList.toggle('hidden', !(matchesCategory && matchesSearch));
    });
  };

  searchInput.addEventListener('input', updateCards);

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeCategory = button.dataset.category || 'all';
      filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
      updateCards();
    });
  });

  updateCards();
});
