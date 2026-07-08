(function () {
  var sidebar = document.getElementById('site-sidebar');
  var toggle = document.getElementById('menu-toggle');
  var close = document.getElementById('menu-close');
  var backdrop = document.getElementById('site-sidebar-backdrop');

  if (!sidebar || !toggle) return;

  function openMenu() {
    sidebar.classList.add('is-open');
    document.documentElement.classList.add('has-open-drawer');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    sidebar.classList.remove('is-open');
    document.documentElement.classList.remove('has-open-drawer');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    if (sidebar.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  if (close) close.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });
})();
