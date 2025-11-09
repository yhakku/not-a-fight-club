import './styles/main.scss';

import router from './js/router';
import login from './js/login';
import chars from './js/characters';
import settings from './js/settings';
import fight from './js/fight';

router();
login();
chars();
settings();
fight();

window.onload = () => {
  const header = document.querySelector('.header');
  const main = document.querySelector('main');
  if (header) header.style.display = 'flex';
  if (main) main.style.display = 'flex';
};
