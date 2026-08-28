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
}
