import { state } from './state';
import initChars from './characters.js';
import { changeGreeting, setInvalidState, toggleSectionVisible } from './ui.js';

const initSettings = () => {
  const body = document.querySelector('body');
  const logo = document.querySelector('.logo');
  const buttonClose = document.querySelector('.settings__button-close');
  const characterLink = document.querySelector('a[href="#characters"]');
  const form = document.querySelector('.change-name__form');
  const input = document.querySelector('.change-name__input');
  const messageError = document.querySelector('.change-name__error');
  const checkbox = document.querySelector(
    '.show-description__form-checkbox-input',
  );
  const checkboxFight = document.querySelector('.fight__panel-checkbox-input');
  const fightPanelContainer = document.querySelector(
    '.fight__panel-container--fight',
  );
  const descriptionPanelContainer = document.querySelector(
    '.fight__panel-container--description',
  );

  let nickname = state.nickname;

  if (state.nickname) {
    input.placeholder = nickname;
  } else {
    location.hash = '#login';
  }

  if (location.hash === '#settings') {
    characterLink.classList.add('disabled');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    nickname = input.value.trim();

    state.nickname = nickname;
    input.value = '';
    input.placeholder = nickname;
    initChars();
    changeGreeting(nickname);
    toggleSectionVisible(body, logo, false);
    history.back();
  });

  input.addEventListener('input', () => {
    const validityStateSettings = input.validity;

    input.setCustomValidity(' ');

    if (validityStateSettings.patternMismatch) {
      setInvalidState(input, messageError, true);
    } else {
      setInvalidState(input, messageError, false);
      input.setCustomValidity('');
    }
  });

  function toggleDescriptionFight() {
    const descriptionText = document.querySelector('.fight__panel-description');

    if (checkbox.checked) {
      state.isShowDescriptionFight = false;
      checkboxFight.checked = false;
      descriptionPanelContainer.style.display = 'flex';
      fightPanelContainer.style.display = 'none';
      descriptionText.innerHTML = `
      The fight has begun!
      <br>
      <br>
      Your task now is to select one zone to attack and ${state.battle?.player.countDefenceZone} zones to
      defend. Click on the parts of your opponent’s body that you want
      to strike — this is your attack. Then choose ${state.battle?.player.countDefenceZone} zones you want
      to defend — you’ll try to block your enemy’s hits.
      <br>
      <br>
      After choosing, press "Attack!" to exchange blows. Protected
      zones block damage; if unprotected, your health drops. Critical
      hits can deal extra damage and break defenses. A detailed battle
      log will appear below for each turn.
      <br>
      <br>
      Good luck in your fight!
      `;

      const titlePlayer = document.querySelector(
        '.fight__panel-versus--player',
      );
      const titleEnemy = document.querySelector('.fight__panel-versus--enemy');
      titlePlayer.innerHTML = `${state.battle?.player.name}`;
      titleEnemy.innerHTML = `${state.battle?.enemy.name}`;
    } else {
      state.isShowDescriptionFight = true;
      checkboxFight.checked = true;
      descriptionPanelContainer.style.display = 'none';
      fightPanelContainer.style.display = 'flex';
    }
  }

  let prevHash = null;
  let currentHash = location.hash;

  window.addEventListener('hashchange', () => {
    prevHash = currentHash;
    currentHash = location.hash;

    if (currentHash === '#settings') {
      characterLink.classList.add('disabled');
    } else {
      characterLink.classList.remove('disabled');
    }
  });

  const closeModal = () => {
    toggleSectionVisible(body, logo, false);
    history.back();
  };

  if (buttonClose) {
    buttonClose.addEventListener('click', closeModal);
  }

  checkbox.addEventListener('change', toggleDescriptionFight);
};

export default initSettings;
