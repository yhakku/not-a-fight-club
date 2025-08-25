import { loadState } from './state';

const initChars = () => {
  const body = document.querySelector('body');
  const overlay = document.querySelector('.overlay');
  const logo = document.querySelector('.logo');
  const buttonClose = document.querySelector('.characters__button-close');
  const nicknames = document.querySelectorAll('.characters__nickname');
  const wins = document.querySelectorAll('.characters__result-w');
  const loses = document.querySelectorAll('.characters__result-l');
  const selectedChars = document.querySelectorAll('.characters__selected');
  const settingsLink = document.querySelector('a[href="#settings"]');

  const data = loadState();

  if (data.user.nickname) {
    nicknames.forEach((nickname) => {
      nickname.innerHTML = data.user.nickname;
    });

    data.user.characters.forEach((char, index) => {
      if (wins[index]) {
        wins[index].innerHTML = char.stats.win;
      }

      if (loses[index]) {
        loses[index].innerHTML = char.stats.lose;
      }
    });

    const defaultChar = data.user.avatarId ?? 0;
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
        data.user.avatarId = index;
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

    if (prevHash === '#settings') {
      history.go(-2);
    } else {
      history.back();
    }
  };

  if (buttonClose) {
    buttonClose.addEventListener('click', closeModal);
  }
  if (overlay) {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeModal();
    });
  }
};

export default initChars;
