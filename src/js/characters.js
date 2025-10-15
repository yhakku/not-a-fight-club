import { state } from './state';
import initOverlayClose from './modal-overlay';
import { resetFightByCharacterChange } from './fight';

const initChars = () => {
  const body = document.querySelector('body');
  const logo = document.querySelector('.logo');
  const buttonClose = document.querySelector('.characters__button-close');
  const nicknames = document.querySelectorAll('.characters__nickname');
  const wins = document.querySelectorAll('.characters__result-w');
  const loses = document.querySelectorAll('.characters__result-l');
  const selectedChars = document.querySelectorAll('.characters__selected');
  const settingsLink = document.querySelector('a[href="#settings"]');
  const attackButtons = document.querySelectorAll(
    '.attack-panel .fight__button',
  );
  const defenceButtons = document.querySelectorAll(
    '.defence-panel .fight__button',
  );

  if (state.nickname) {
    nicknames.forEach((nickname) => {
      nickname.innerHTML = state.nickname;
    });

    state.characters.forEach((char, index) => {
      if (wins[index]) {
        wins[index].innerHTML = char.stats.win;
      }

      if (loses[index]) {
        loses[index].innerHTML = char.stats.lose;
      }
    });

    const defaultChar = state.avatarId ?? 0;
    selectedChars[defaultChar].checked = true;

    selectedChars.forEach((selectedChar, index) => {
      selectedChar.addEventListener('change', () => {
        if (selectedChar.checked) {
          selectedChars.forEach((notSelectedChar, j) => {
            if (j !== index) {
              notSelectedChar.checked = false;
            }
          });
        }
        state.avatarId = index;
      });
    });
  }

  let prevHash = null;
  let currentHash = location.hash;

  window.addEventListener('hashchange', () => {
    prevHash = currentHash;
    currentHash = location.hash;

    if (currentHash === '#characters') {
      settingsLink.classList.add('disabled');
    } else {
      settingsLink.classList.remove('disabled');
    }
  });

  const closeModal = () => {
    body.classList.remove('overlay');
    logo.classList.remove('hidden');

    if (prevHash && prevHash !== currentHash) {
      location.hash = prevHash;
    } else {
      location.hash = '#login';
    }

    if (state.battle?.player.id !== state.avatarId) {
      resetFightByCharacterChange();

      attackButtons.forEach((attackButton) => {
        attackButton.classList.remove('selected');
      });

      defenceButtons.forEach((defenceButton) => {
        defenceButton.classList.remove('selected');
      });
    }
  };

  if (buttonClose) {
    buttonClose.addEventListener('click', closeModal);
  }

  initOverlayClose(closeModal);
};

export default initChars;
