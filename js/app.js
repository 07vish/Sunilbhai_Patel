/**
 * S.D. PATEL & CO. | Advocates & Tax Consultants
 * Interactive Engine & aglaw.in Design Adaptation
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Theme Manager (Light & Dark with auto OS preference)
  const STORAGE_KEY = 'sdpatel_theme';
  function getTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.style.colorScheme = t;
    document.querySelectorAll('.sw button').forEach(b => {
      b.setAttribute('aria-pressed', b.dataset.t === t ? 'true' : 'false');
    });
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch (e) {}
  }

  setTheme(getTheme());
  document.querySelectorAll('.sw button').forEach(b => {
    b.addEventListener('click', () => setTheme(b.dataset.t));
  });

  // 2. Bar Council of India Disclaimer Modal (Matching aglaw.in)
  const disclaimerOverlay = document.getElementById('disclaimerOverlay');
  const btnAgree = document.getElementById('btnAgreeDisclaimer');
  const btnOpenDisclaimer = document.getElementById('btnOpenDisclaimer');

  const hasAgreed = localStorage.getItem('bci_disclaimer_agreed');
  if (!hasAgreed && disclaimerOverlay) {
    // Show after slight natural delay
    setTimeout(() => {
      disclaimerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }, 300);
  }

  function closeDisclaimer() {
    if (disclaimerOverlay) {
      disclaimerOverlay.classList.remove('open');
      document.body.style.overflow = '';
      localStorage.setItem('bci_disclaimer_agreed', 'true');
    }
  }

  if (btnAgree) btnAgree.addEventListener('click', closeDisclaimer);

  if (btnOpenDisclaimer) {
    btnOpenDisclaimer.addEventListener('click', (e) => {
      e.preventDefault();
      if (disclaimerOverlay) {
        disclaimerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // 3. Header Sticky & Scroll Effect (Inspired by aglaw.in)
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 4. Mobile Navigation Drawer
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeDrawer();
    });
  }

  document.querySelectorAll('.drawer-links a').forEach(a => {
    a.addEventListener('click', closeDrawer);
  });

  // 5. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('nav.main-nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // 6. FAQ Accordion Handlers
  document.querySelectorAll('.faq-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.faq-row');
      const isOpen = row.classList.contains('active');

      // Close other rows for clean reading
      document.querySelectorAll('.faq-row').forEach(r => {
        if (r !== row) r.classList.remove('active');
      });

      row.classList.toggle('active', !isOpen);
    });
  });

  // 7. Contact Form & WhatsApp Direct Connect
  const form = document.getElementById('consultationForm');
  const btnWhatsApp = document.getElementById('btnWhatsAppSubmit');

  function getFormData() {
    return {
      name: document.getElementById('formName')?.value.trim() || '',
      phone: document.getElementById('formPhone')?.value.trim() || '',
      service: document.getElementById('formService')?.value || 'General Consultation',
      message: document.getElementById('formMessage')?.value.trim() || ''
    };
  }

  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      const d = getFormData();
      if (!d.name) {
        alert('Please enter your full name.');
        document.getElementById('formName')?.focus();
        return;
      }
      if (!d.phone) {
        alert('Please enter your contact phone number.');
        document.getElementById('formPhone')?.focus();
        return;
      }

      const text = `Hello Sunilbhai (S.D. Patel & Co.),\n\n` +
        `*Name:* ${d.name}\n` +
        `*Phone:* ${d.phone}\n` +
        `*Practice Area:* ${d.service}\n` +
        (d.message ? `*Inquiry Details:* ${d.message}\n` : '') +
        `\nI wish to schedule a consultation at your Varachha Road chambers.`;

      window.open(`https://wa.me/919377334229?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = getFormData();
      if (!d.name || !d.phone) return;

      const subject = `Legal & Tax Consultation Request: ${d.name} (${d.service})`;
      const body = `Client Name: ${d.name}\n` +
        `Contact Phone: ${d.phone}\n` +
        `Practice Area: ${d.service}\n\n` +
        `Inquiry Details:\n${d.message || 'No additional details provided.'}\n\n` +
        `Submitted via S.D. Patel & Co. Web Portal`;

      window.location.href = `mailto:sdpatel213@gmail.com?cc=shpatel55@yahoo.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
});
