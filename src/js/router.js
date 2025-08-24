const router = () => {
  const menu = document.querySelector('.header__nav');
  const logo = document.querySelector('.logo');

  const route = location.hash.slice(1) || 'login';

  const backToLogin = () => {
    menu.classList.add('hidden');
    logo.classList.remove('hidden');
    document.querySelector('body').classList.remove('overlay');
  };

  const hiddenUi = (route) => {
    document.querySelectorAll('[data-route]').forEach((section) => {
      if (section.dataset.route !== route) {
        section.classList.add('hidden');
      } else {
        section.classList.remove('hidden');
      }
    });
  };

  switch (route) {
    case 'fight':
      hiddenUi('fight');
      menu.classList.remove('hidden');
      break;
    case 'characters':
      hiddenUi('characters');
      logo.classList.add('hidden');
      menu.classList.remove('hidden');
      menu.style.marginLeft = 'auto';
      document.querySelector('body').classList.add('overlay');
      break;
    case 'settings':
      hiddenUi('settings');
      logo.classList.add('hidden');
      menu.classList.remove('hidden');
      menu.style.marginLeft = 'auto';
      document.querySelector('body').classList.add('overlay');
      break;
    default:
      hiddenUi('login');
      backToLogin();
      break;
  }

  window.addEventListener('hashchange', router);
};

export default router;
