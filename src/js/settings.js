import { loadState, saveState } from './state';
import { state } from './storage.js';
import initChars from './characters.js';
import { changeGreeting, toggleSectionVisible } from './ui.js';

const initSettings = () => {
  const body = document.querySelector('body');
  const logo = document.querySelector('.logo');
  const buttonClose = document.querySelector('.settings__button-close');
  const settingsLink = document.querySelector('a[href="#characters"]');
  const form = document.querySelector('.change-name__form');
  const input = document.querySelector('.change-name__input');
  const title = document.querySelector('.login__title');

  const data = loadState();
  let nickname = data.user.nickname;

  if (data.user.nickname) {
    input.placeholder = nickname;
    console.log(input.placeholder);
  } else {
    location.hash = '#login';
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    nickname = input.value.trim();

    state.user.nickname = nickname;
    saveState(state);
    initChars();
    changeGreeting(nickname);
    toggleSectionVisible(body, logo, false);
    history.back();
  });

  let prevHash = null;
  let currentHash = location.hash;

  window.addEventListener('hashchange', () => {
    prevHash = currentHash;
    currentHash = location.hash;

    if (currentHash === '#settings') {
      settingsLink.classList.add('disabled');
    } else {
      settingsLink.classList.remove('disabled');
    }
  });

  const closeModal = () => {
    toggleSectionVisible(body, logo, false);
    history.back();
  };

  if (buttonClose) {
    buttonClose.addEventListener('click', closeModal);
  }
};

export default initSettings;
