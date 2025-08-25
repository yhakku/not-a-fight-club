import { saveState, loadState } from './state.js';
import { state } from './storage.js';
import {
  showGreeting,
  toggleFormVisible,
  toggleButtons,
  setInvalidState,
} from './ui.js';
import initChars from './characters.js';
import initSettings from './settings.js';

const initLogin = () => {
  const title = document.querySelector('.login__title');
  const form = document.querySelector('.form');
  const formContainer = document.querySelector('.form__form-container');
  const input = document.querySelector('.form__input');
  const messageError = document.querySelector('.form__error');
  const buttonFight = document.querySelector('.login__button-fight');
  const buttonChars = document.querySelector('.login__button-chars');
  const buttonSettings = document.querySelector('.login__button-settings');

  const data = loadState();
  let nickname = data.user.nickname;

  if (nickname === null) {
    formContainer.style.paddingBottom = '10px';
    input.focus();
    toggleButtons([buttonFight, buttonChars, buttonSettings], false);
  } else {
    toggleFormVisible(form, true);
    showGreeting(title, nickname);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    nickname = input.value.trim();
    if (!nickname) {
      return;
    } else {
      toggleFormVisible(form, true);
      showGreeting(title, nickname);
      toggleButtons([buttonFight, buttonChars, buttonSettings], true);
    }

    state.user.nickname = nickname;
    saveState(state);
    initChars();
    initSettings();
  });

  input.addEventListener('input', () => {
    const validityState = input.validity;

    input.setCustomValidity(' ');

    if (validityState.patternMismatch) {
      setInvalidState(input, messageError, true);
    } else {
      setInvalidState(input, messageError, false);
      input.setCustomValidity('');
    }
  });
};

export default initLogin;
