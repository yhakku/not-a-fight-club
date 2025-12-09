import { state } from './state';

export const showGreeting = (title, nickname) => {
  const greeting = document.createElement('p');
  greeting.className = 'login__greeting h2';
  greeting.textContent = `Konnichiwa, ${nickname}!`;

  title.insertAdjacentElement('afterend', greeting);
};

export const toggleFormVisible = (form, isVisible) => {
  form.classList.toggle('hidden', isVisible);
};

export const toggleButtons = (buttons, isVisible) => {
  buttons.forEach((button) => {
    button.classList.toggle('hidden', !isVisible);
  });
};

export const setInvalidState = (input, messageError, isInvalid) => {
  input.classList.toggle('invalid', isInvalid);
  messageError.classList.toggle('invalid', isInvalid);
};

export const changeGreeting = (nickname) => {
  const greeting = document.querySelector('.login__greeting');
  greeting.innerHTML = `Konnichiwa, ${nickname}!`;
};

export const toggleSectionVisible = (body, logo, isVisible) => {
  body.classList.toggle('overlay', isVisible);
  logo.classList.toggle('hidden', isVisible);
};

export function updateStatsUI() {
  const wins = document.querySelectorAll('.characters__result-w');
  const loses = document.querySelectorAll('.characters__result-l');

  console.log('characters:', state.characters);
  console.log('win elements:', wins);
  console.log('lose elements:', loses);

  if (!state.characters || !Array.isArray(state.characters)) return;

  state.characters.forEach((char, index) => {
    if (wins[index]) {
      wins[index].innerHTML = char.stats.win;
    }

    if (loses[index]) {
      loses[index].innerHTML = char.stats.lose;
    }
  });
}
