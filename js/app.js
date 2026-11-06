/**
 * S.D. PATEL & CO. | Advocates & Tax Consultants, Surat
 * Minimal, Pure Warm Alabaster Engine
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Bar Council of India Disclaimer Modal
  const disclaimerOverlay = document.getElementById('disclaimerOverlay');
  const btnAgree = document.getElementById('btnAgreeDisclaimer');
  const btnOpenDisclaimer = document.getElementById('btnOpenDisclaimer');

  const hasAgreed = localStorage.getItem('bci_disclaimer_agreed');
  if (!hasAgreed && disclaimerOverlay) {
    setTimeout(() => {
      disclaimerOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }, 250);
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

  // 2. FAQ Accordion (Clean Minimal Toggle)
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close other accordions for quiet reading
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
    });
  });

  // 3. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('nav.desktop-nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
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

  // 4. Contact Form: Direct Email & WhatsApp Handlers
  const form = document.getElementById('f');
  const btnWhatsApp = document.getElementById('btnWhatsApp');

  function getFormData() {
    return {
      name: document.getElementById('nameInput')?.value.trim() || '',
      phone: document.getElementById('phoneInput')?.value.trim() || '',
      message: document.getElementById('msgInput')?.value.trim() || ''
    };
  }

  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      const d = getFormData();
      if (!d.name) {
        alert('Please enter your name.');
        document.getElementById('nameInput')?.focus();
        return;
      }
      if (!d.phone) {
        alert('Please enter your phone number.');
        document.getElementById('phoneInput')?.focus();
        return;
      }

      const text = `Hello Sunilbhai (S.D. Patel & Co.),\n\n` +
        `*Name:* ${d.name}\n` +
        `*Phone:* ${d.phone}\n` +
        (d.message ? `*Inquiry:* ${d.message}\n` : '') +
        `\nI would like to schedule a consultation at your Varachha Road chambers.`;

      window.open(`https://wa.me/919377334229?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const d = getFormData();
      if (!d.name || !d.phone) return;

      const subject = `Tax & Legal Consultation Inquiry: ${d.name}`;
      const body = `Client Name: ${d.name}\n` +
        `Phone Number: ${d.phone}\n\n` +
        `Inquiry Details:\n${d.message || 'No additional details provided.'}\n\n` +
        `Sent via S.D. Patel & Co. Web Portal`;

      window.location.href = `mailto:sdpatel213@gmail.com?cc=shpatel55@yahoo.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
});
