import { state, saveState, loadState } from './state.js';
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

  let nickname = state.nickname;

  if (nickname) {
    toggleFormVisible(form, true);
    showGreeting(title, nickname);
  } else {
    formContainer.style.paddingBottom = '10px';
    toggleButtons([buttonFight, buttonChars, buttonSettings], false);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    nickname = input.value.trim();

    const validityState = input.validity;
    if (validityState.patternMismatch || validityState.valueMissing) {
      setInvalidState(input, messageError, true);
    } else {
      if (!nickname) {
        return;
      } else {
        toggleFormVisible(form, true);
        showGreeting(title, nickname);
        toggleButtons([buttonFight, buttonChars, buttonSettings], true);
      }

      state.nickname = nickname;
      initChars();
      initSettings();
    }
  });

  input.addEventListener('input', () => {
    const validityState = input.validity;

    if (validityState.patternMismatch) {
      setInvalidState(input, messageError, true);
    } else {
      setInvalidState(input, messageError, false);
    }

    if (validityState.valueMissing) {
      setInvalidState(input, messageError, true);
    }
  });

  input.addEventListener('blur', () => {
    const validityState = input.validity;

    if (validityState.valueMissing) {
      setInvalidState(input, messageError, false);
    }
  });

  document.addEventListener('click', (event) => {
    const validityState = input.validity;

    if (validityState.valueMissing && event.target !== input) {
      setInvalidState(input, messageError, false);
    }
  });
};

export default initLogin;
