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

  // Mobile hamburger menu toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('show');
    });
  }

  // On mobile, tap to open the Contact Us dropdown instead of relying on hover
  document.querySelectorAll('li.dropdown > .dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.parentElement.classList.toggle('open');
      }
    });
  });

  // Close the mobile menu after tapping a normal nav link (not the dropdown toggle)
  document.querySelectorAll('#navMenu > li > a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768 && navMenu) {
        navMenu.classList.remove('show');
      }
    });
  });
});