/* Good Mood Cruises — splash page behavior */
(function () {
  'use strict';

  /* ── Sticky header state ───────────────────────────────── */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    header.classList.toggle('is-stuck', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile nav ────────────────────────────────────────── */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('primaryNav');

  function closeNav() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeNav();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) closeNav();
  });

  /* ── Reveal on scroll ──────────────────────────────────── */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = Array.prototype.slice.call(el.parentNode.children);
        el.style.transitionDelay = Math.min(siblings.indexOf(el), 5) * 70 + 'ms';
        el.classList.add('is-in');
        observer.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    reveals.forEach(function (el) { observer.observe(el); });
  }

  /* ── Quote form ────────────────────────────────────────────
     No backend yet: validate client-side, then hand the details
     off to the agency inbox via a prefilled email. Swap the
     submit handler for a fetch() to your form endpoint or CRM
     when one is available.
  ─────────────────────────────────────────────────────────── */
  var form = document.getElementById('planForm');
  var status = document.getElementById('formStatus');
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var INBOX = 'hello@goodmoodcruises.com';

  function setError(field, message) {
    var wrap = field.closest('.field');
    var slot = wrap.querySelector('[data-error-for="' + field.id + '"]');
    wrap.classList.toggle('has-error', Boolean(message));
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (slot) slot.textContent = message || '';
  }

  function validate() {
    var name = form.elements.name;
    var email = form.elements.email;
    var ok = true;

    if (!name.value.trim()) { setError(name, 'Please tell us your name.'); ok = false; }
    else setError(name, '');

    if (!EMAIL_RE.test(email.value.trim())) {
      setError(email, 'We need a valid email to send your options.');
      ok = false;
    } else setError(email, '');

    return ok;
  }

  ['name', 'email'].forEach(function (id) {
    form.elements[id].addEventListener('blur', function () {
      if (this.closest('.field').classList.contains('has-error')) validate();
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validate()) {
      var bad = form.querySelector('.field.has-error input');
      if (bad) bad.focus();
      return;
    }

    var f = form.elements;
    var body = [
      'Name: ' + f.name.value.trim(),
      'Email: ' + f.email.value.trim(),
      'Destination: ' + (f.destination.value || 'Not sure yet'),
      'Travelers: ' + f.travelers.value,
      'Dates: ' + (f.when.value.trim() || 'Flexible'),
      '',
      'Notes:',
      f.notes.value.trim() || '(none)'
    ].join('\n');

    status.textContent = 'Thanks, ' + f.name.value.trim().split(' ')[0] +
      '! Your email app is opening with the request — send it and a specialist will reply within one business day.';
    status.classList.add('is-visible');

    window.location.href = 'mailto:' + INBOX +
      '?subject=' + encodeURIComponent('Cruise quote request — ' + f.name.value.trim()) +
      '&body=' + encodeURIComponent(body);
  });

  /* ── Footer year ───────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
