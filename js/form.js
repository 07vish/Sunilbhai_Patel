/**
 * Contact Form & FAQ Interactive Handlers
 */
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('consultationForm');
  const btnWhatsApp = document.getElementById('btnFormWhatsApp');
  const btnEmail = document.getElementById('btnFormEmail');

  function getFormData() {
    const name = document.getElementById('formName')?.value.trim() || '';
    const phone = document.getElementById('formPhone')?.value.trim() || '';
    const service = document.getElementById('formService')?.value || 'General Consultation';
    const message = document.getElementById('formMessage')?.value.trim() || '';
    return { name, phone, service, message };
  }

  function validate(data) {
    if (!data.name) {
      if (window.toast) window.toast.error('Please enter your name.');
      document.getElementById('formName')?.focus();
      return false;
    }
    if (!data.phone) {
      if (window.toast) window.toast.error('Please enter your phone number.');
      document.getElementById('formPhone')?.focus();
      return false;
    }
    return true;
  }

  // 1. Send via WhatsApp
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validate(data)) return;

      const text = `Hello Sunilbhai (S.D. Patel & Co.),\n\n` +
        `*Name:* ${data.name}\n` +
        `*Phone:* ${data.phone}\n` +
        `*Service Required:* ${data.service}\n` +
        (data.message ? `*Details:* ${data.message}\n` : '') +
        `\nI would like to schedule a consultation at your Varachha office.`;

      const url = `https://wa.me/919377334229?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
      if (window.toast) {
        window.toast.success('Opening WhatsApp to message Sunil D. Patel...');
      }
    });
  }

  // 2. Send via Email
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validate(data)) return;

      const subject = `Tax & Legal Consultation Request: ${data.name} (${data.service})`;
      const body = `Client Name: ${data.name}\n` +
        `Phone Number: ${data.phone}\n` +
        `Service Needed: ${data.service}\n\n` +
        `Message:\n${data.message || 'No additional details provided.'}\n\n` +
        `Sent via S.D. Patel & Co. website`;

      const mailtoUrl = `mailto:sdpatel213@gmail.com?cc=shpatel55@yahoo.com&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      if (window.toast) {
        window.toast.success('Opening email client pre-filled with your inquiry...');
      }
    });
  }

  // 3. FAQ Accordion Toggle with Smooth Animation
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all other accordions for clean UX
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.classList.remove('open');
      });

      item.classList.toggle('open', !isOpen);
    });
  });

  // 4. Click to Copy Phone Numbers
  document.querySelectorAll('[data-copy-phone]').forEach(el => {
    el.addEventListener('click', (e) => {
      const phone = el.dataset.copyPhone;
      if (phone) {
        navigator.clipboard.writeText(phone).then(() => {
          if (window.toast) window.toast.success(`Copied ${phone} to clipboard`);
        });
      }
    });
  });
});

