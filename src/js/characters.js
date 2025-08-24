import { loadState } from './state';

const initChars = () => {
  const nicknames = document.querySelectorAll('.characters__nickname');
  const wins = document.querySelectorAll('.characters__result-w');
  const loses = document.querySelectorAll('.characters__result-l');
  const selectedChars = document.querySelectorAll('.characters__selected');

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
  } else {
    location.hash = 'login';
  }
};

export default initChars;
