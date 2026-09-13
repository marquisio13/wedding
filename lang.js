// Shared language toggle logic
// Usage: include this script, then call initLang() after DOM is ready.

function applyLang(lang) {
  document.documentElement.lang = lang === 'en' ? 'en' : 'es';
  document.querySelectorAll('[data-es]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.es;
  });
  document.querySelectorAll('[data-es-placeholder]').forEach(el => {
    el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : el.dataset.esPlaceholder;
  });
  document.querySelectorAll('[data-es-html]').forEach(el => {
    el.innerHTML = lang === 'en' ? el.dataset.enHtml : el.dataset.esHtml;
  });
  // Toggle button states
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  localStorage.setItem('lang', lang);
}

function initLang() {
  const saved = localStorage.getItem('lang') || 'es';
  applyLang(saved);
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
  initNav();
  initInvite();
}

// Envelope invitation intro (frame-sequence flipbook)
function initInvite() {
  const inv = document.getElementById('invite');
  if (!inv) return;
  const seq = document.getElementById('inviteSeq');
  const frames = seq ? seq.querySelectorAll('.fr') : [];
  const enter = document.getElementById('inviteEnter');
  const replay = document.getElementById('inviteReplay');
  let playing = false;

  function play() {
    if (playing || inv.classList.contains('open') || frames.length === 0) return;
    playing = true;
    inv.classList.add('open');
    let i = 1;
    const t = setInterval(() => {
      frames[i - 1].style.opacity = 0;
      frames[i].style.opacity = 1;
      i++;
      if (i >= frames.length) {
        clearInterval(t);
        setTimeout(() => inv.classList.add('reveal'), 450);
      }
    }, 260);
  }
  function resetFrames() {
    frames.forEach((f, idx) => { f.style.opacity = idx === 0 ? 1 : 0; });
  }
  function show() {
    resetFrames();
    playing = false;
    inv.classList.remove('open', 'reveal', 'hide');
    inv.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function dismiss() {
    inv.classList.add('hide');
    try { localStorage.setItem('inviteSeen', '1'); } catch (e) {}
    setTimeout(() => { inv.style.display = 'none'; document.body.style.overflow = ''; }, 850);
  }

  if (seq) seq.addEventListener('click', play);
  if (enter) enter.addEventListener('click', dismiss);
  if (replay) replay.addEventListener('click', (e) => { e.preventDefault(); show(); });
}

// Mobile navigation (hamburger) toggle
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // Close the menu after tapping a link
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
