var T = {
  home: 'S.D. Patel & Co. | Tax, Accounts & Legal, Surat',
  services: 'Services | S.D. Patel & Co.',
  about: 'About | S.D. Patel & Co.',
  contact: 'Contact | S.D. Patel & Co.'
};

function route() {
  var h = location.hash.slice(1);
  if (!T[h]) h = 'home';
  document.querySelectorAll('.view').forEach(function(v) {
    v.classList.toggle('on', v.id === 'v-' + h);
  });
  document.querySelectorAll('nav a').forEach(function(a) {
    a.setAttribute('aria-current', a.hash === '#' + h ? 'page' : 'false');
  });
  document.title = T[h];
  window.scrollTo(0, 0);
}

function theme(m) {
  document.documentElement.setAttribute('data-theme', m);
  document.querySelectorAll('.sw button').forEach(function(b) {
    b.setAttribute('aria-pressed', b.dataset.t === m);
  });
  try {
    localStorage.setItem('th', m);
  } catch (e) {}
}

var th = 'light';
try {
  th = localStorage.getItem('th') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
} catch (e) {}
theme(th);

document.querySelectorAll('.sw button').forEach(function(b) {
  b.addEventListener('click', function() {
    theme(b.dataset.t);
  });
});

window.addEventListener('hashchange', route);
route();

// Form handler: Email & WhatsApp
var form = document.getElementById('f');
if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var d = new FormData(e.target);
    var name = d.get('n') || '';
    var phone = d.get('p') || '';
    var msg = d.get('m') || '';

    var subject = encodeURIComponent('Enquiry from website: ' + name);
    var body = encodeURIComponent(msg + '\n\nName: ' + name + (phone ? '\nPhone: ' + phone : ''));
    location.href = 'mailto:sdpatel213@gmail.com?cc=shpatel55@yahoo.com&subject=' + subject + '&body=' + body;
  });

  // Dynamic WhatsApp button updating with form inputs
  var waBtn = document.getElementById('btnWhatsApp');
  if (waBtn) {
    waBtn.addEventListener('click', function(e) {
      var d = new FormData(form);
      var name = d.get('n') || '';
      var phone = d.get('p') || '';
      var msg = d.get('m') || '';
      var text = 'Hello Sunilbhai (S.D. Patel & Co.),\n\n' +
        (name ? 'Name: ' + name + '\n' : '') +
        (phone ? 'Phone: ' + phone + '\n' : '') +
        (msg ? 'Message: ' + msg + '\n' : '') +
        'I would like to consult regarding tax/legal matters.';
      waBtn.href = 'https://wa.me/919377334229?text=' + encodeURIComponent(text);
    });
  }
}
