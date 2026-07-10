// Fade-in animation for property cards as they scroll into view
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.feature-div > div');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Slight stagger so cards don't all pop in at once
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, index * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => observer.observe(card));

  // Simple search bar interaction: pressing Enter triggers the Search button
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  if (searchInput && searchButton) {
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        searchButton.click();
      }
    });
  }
});