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

  // Search bar: on the homepage, redirect to property.html with the search term.
  // On property.html itself, filter the visible listings instead.
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  const onListingsPage = window.location.pathname.toLowerCase().includes('property.html');

  if (searchInput && searchButton) {
    searchButton.addEventListener('click', function (e) {
      e.preventDefault();
      const term = searchInput.value.trim();
      if (onListingsPage) {
        filterListings(term);
      } else {
        window.location.href = 'property.html' + (term ? '?search=' + encodeURIComponent(term) : '');
      }
    });
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        searchButton.click();
      }
    });
  }

  // Filters cards intelligently: a number (optionally with "bed"/"beds"/"br") filters by
  // exact bedroom count; anything else searches location and title text instead.
  window.filterListings = function (term) {
    const trimmed = term.trim();
    const cards = document.querySelectorAll('.feature-div > div, .landlord-card');

    if (!trimmed) {
      cards.forEach(card => card.style.display = '');
      return;
    }

    const lower = trimmed.toLowerCase();
    const bedMatch = lower.match(/^(\d+)\s*(bed|beds|bedroom|bedrooms|bd|bds|br)?$/);

    cards.forEach(card => {
      let match;
      if (bedMatch) {
        match = card.dataset.beds === bedMatch[1];
      } else {
        const location = (card.dataset.location || '').toLowerCase();
        const title = (card.dataset.title || '').toLowerCase();
        match = location.includes(lower) || title.includes(lower);
      }
      card.style.display = match ? '' : 'none';
    });
  };

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

  // Dark mode toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      if (themeIcon) {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
      }
    } else {
      document.body.classList.remove('dark-mode');
      if (themeIcon) {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
      }
    }
  }

  applyTheme(localStorage.getItem('zeyriTheme') || 'light');

  if (themeToggle) {
    themeToggle.addEventListener('click', function (e) {
      e.preventDefault();
      const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      localStorage.setItem('zeyriTheme', newTheme);
      applyTheme(newTheme);
    });
  }
});