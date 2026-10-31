/**
 * Theme Manager (Light & Dark with auto OS preference)
 */
(function() {
  const STORAGE_KEY = 'sdpatel_theme';

  function getInitialTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;
    
    // Update theme toggle buttons
    document.querySelectorAll('.theme-switch-btn').forEach(btn => {
      const isMatch = btn.dataset.theme === theme;
      btn.classList.toggle('active', isMatch);
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  window.setAppTheme = setTheme;

  document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = getInitialTheme();
    setTheme(currentTheme);

    document.querySelectorAll('.theme-switch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setTheme(btn.dataset.theme);
      });
    });

    // Listen to OS theme changes if user has not explicitly set a preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  });
})();

