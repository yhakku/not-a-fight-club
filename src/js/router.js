import { toggleSlideToOpenModal } from './characters';

const router = () => {
  const body = document.querySelector('body');
  const menu = document.querySelector('.header__nav');
  const logo = document.querySelector('.logo');

  const route = location.hash.slice(1) || 'login';

  const backToLogin = () => {
    menu.classList.add('hidden');
    logo.classList.remove('hidden');
    body.classList.remove('overlay');
  };

  const hiddenUI = (route) => {
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
      hiddenUI('fight');
      menu.classList.remove('hidden');
      body.classList.remove('overlay');
      body.classList.add('fight-background');
      break;
    case 'characters':
      hiddenUI('characters');
      logo.classList.add('hidden');
      menu.classList.remove('hidden');
      menu.style.marginLeft = 'auto';
      body.classList.add('overlay');
      toggleSlideToOpenModal();
      break;
    case 'settings':
      hiddenUI('settings');
      logo.classList.add('hidden');
      menu.classList.remove('hidden');
      menu.style.marginLeft = 'auto';
      body.classList.add('overlay');
      break;
    default:
      hiddenUI('login');
      body.classList.remove('fight-background');
      backToLogin();
      break;
  }

  window.addEventListener('hashchange', router);
};

export default router;
