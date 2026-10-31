/**
 * Single-Page Hash Router
 */
(function() {
  const TITLES = {
    home: 'S.D. Patel & Co. | Tax, Accounts & Legal, Surat',
    services: 'Services & Practice Areas | S.D. Patel & Co.',
    tools: 'Tax Tools & Checklists | S.D. Patel & Co.',
    about: 'About The Firm & Partners | S.D. Patel & Co.',
    contact: 'Contact & Office Directions | S.D. Patel & Co.'
  };

  function handleRoute() {
    let hash = window.location.hash.replace('#', '').trim();
    if (!hash || !document.getElementById(`v-${hash}`)) {
      hash = 'home';
    }

    // Toggle views
    document.querySelectorAll('.view').forEach(view => {
      const isTarget = view.id === `v-${hash}`;
      view.classList.toggle('active', isTarget);
    });

    // Update Desktop Nav Links
    document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      const isActive = href === hash;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    // Update Mobile Drawer Links
    document.querySelectorAll('.drawer-links .drawer-link').forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      const isActive = href === hash;
      link.classList.toggle('active', isActive);
      link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });

    // Close Mobile Drawer if open
    const drawer = document.getElementById('mobileDrawer');
    if (drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
    }

    // Set Document Title
    document.title = TITLES[hash] || TITLES.home;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('DOMContentLoaded', handleRoute);
})();

