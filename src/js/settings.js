import { state } from './state';
import { changeGreeting, setInvalidState, toggleSectionVisible } from './ui.js';

const initSettings = () => {
  const body = document.querySelector('body');
  const logo = document.querySelector('.logo');
  const buttonClose = document.querySelector('.settings__button-close');
  const characterLink = document.querySelector('a[href="#characters"]');
  const settingsLink = document.querySelector('a[href="#settings"]');
  const settingLinkContainer = document.querySelector(
    '.header__item--settings',
  );
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

  if (nickname) {
    input.placeholder = nickname;
  } else {
    location.hash = '#login';
  }

  if (location.hash === '#settings') {
    characterLink.classList.add('disabled');
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const validityStateSettings = input.validity;

    if (
      validityStateSettings.patternMismatch ||
      validityStateSettings.valueMissing
    ) {
      setInvalidState(input, messageError, true);
    } else {
      nickname = input.value.trim();

      state.nickname = nickname;
      input.value = '';
      input.placeholder = nickname;
      changeGreeting(nickname);
    }
  });

  input.addEventListener('input', () => {
    const validityStateSettings = input.validity;

    if (validityStateSettings.patternMismatch) {
      setInvalidState(input, messageError, true);
    } else {
      setInvalidState(input, messageError, false);
    }

    if (validityStateSettings.valueMissing) {
      setInvalidState(input, messageError, true);
    }
  });

  input.addEventListener('blur', () => {
    const validityStateSettings = input.validity;

    if (validityStateSettings.valueMissing) {
      setInvalidState(input, messageError, false);
    }
  });

  document.addEventListener('click', (event) => {
    const validityStateSettings = input.validity;

    if (validityStateSettings.valueMissing && event.target !== input) {
      setInvalidState(input, messageError, false);
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

  checkbox.addEventListener('keydown', (event) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      checkbox.checked = !checkbox.checked;
      checkbox.dispatchEvent(new Event('change'));
    }
  });

  const createButtonClose = () => {
    settingsLink.style.display = 'none';
    const settingButtonClose = document.createElement('button');
    settingButtonClose.classList.add('header__close-button--settings');
    settingButtonClose.innerHTML = `<img src="/not-a-fight-club/src/assets/images/header/close.svg" alt="close"/>`;
    settingLinkContainer.appendChild(settingButtonClose);
    settingButtonClose.addEventListener('click', () => {
      settingButtonClose.style.display = 'none';
      closeModal();
    });
  };

  const deleteButtonClose = () => {
    const settingButtonClose = document.querySelector(
      '.header__close-button--settings',
    );
    settingButtonClose?.remove();
  };

  let currentHash = location.hash;

  window.addEventListener('hashchange', () => {
    const prevHash = currentHash;
    currentHash = location.hash;

    if (currentHash === '#settings') {
      characterLink.classList.add('disabled');
      createButtonClose();

      if (state.prevHash === null) {
        state.prevHash = prevHash;
      }
    } else {
      characterLink.classList.remove('disabled');
      settingsLink.style.display = 'flex';
      deleteButtonClose();
    }
  });

  function closeModal() {
    toggleSectionVisible(body, logo, true);
    // body.classList.remove('overlay');
    // logo.classList.remove('hidden');

    if (currentHash === '#settings') {
      location.hash = state.prevHash;
    } else {
      location.hash = '#login';
    }
    state.prevHash = null;
  }

  if (buttonClose) {
    buttonClose.addEventListener('click', closeModal);
  }

  checkbox.addEventListener('change', toggleDescriptionFight);

  // if (location.hash === '#settings') {
  //   createButtonClose();
  // }
};

export default initSettings;
