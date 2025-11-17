import { state } from './state';
import initOverlayClose from './modal-overlay';
import { resetFightByCharacterChange } from './fight';
import { updateStatsUI } from './ui';
import initEscapeModal from './modal-escape';

const track = document.querySelector('.characters__list');
const trackButtonNext = document.querySelector(
  '.characters__slider-button--next',
);
const trackButtonPrev = document.querySelector(
  '.characters__slider-button--prev',
);
const buttonsPagination = document.querySelectorAll(
  '.characters__pagination-button',
);

let countSlide = 0;

export const toggleSlideToOpenModal = () => {
  countSlide <= 0 ? (countSlide = 0) : (countSlide -= 1);
  if (state.avatarId < 3) {
    track.style.transform = `translateX(0%)`;
    track.style.transition = '0s';
    buttonsPagination[countSlide].classList.add('active');
    buttonsPagination[countSlide + 1].classList.remove('active');
    trackButtonPrev.style.opacity = '0';
    trackButtonPrev.style.visibility = 'hidden';
    trackButtonNext.style.opacity = '1';
    trackButtonNext.style.visibility = 'visible';
  } else {
    track.style.transform = `translateX(-${(countSlide + 1) * 100}%)`;
    track.style.transition = '0s';
    buttonsPagination[countSlide + 1].classList.add('active');
    buttonsPagination[countSlide].classList.remove('active');
    trackButtonNext.style.opacity = '0';
    trackButtonNext.style.visibility = 'hidden';
    trackButtonPrev.style.opacity = '1';
    trackButtonPrev.style.visibility = 'visible';
  }
};

const initChars = () => {
  const body = document.querySelector('body');
  const logo = document.querySelector('.logo');
  const modal = document.querySelector('.characters');
  const buttonClose = document.querySelector('.characters__button-close');
  const nicknames = document.querySelectorAll('.characters__nickname');
  const selectedChars = document.querySelectorAll('.characters__selected');
  const settingsLink = document.querySelector('a[href="#settings"]');
  const attackButtons = document.querySelectorAll(
    '.attack-panel .fight__button',
  );
  const defenceButtons = document.querySelectorAll(
    '.defence-panel .fight__button',
  );

  if (location.hash === '#characters') {
    settingsLink.classList.add('disabled');
  }

  const updateStatsOnModalOpen = () => {
    if (location.hash === '#characters') {
      updateStatsUI();
    }
  };

  if (state.nickname) {
    nicknames.forEach((nickname) => {
      nickname.innerHTML = state.nickname;
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
      updateStatsOnModalOpen();
    } else {
      settingsLink.classList.remove('disabled');
    }

    updateStatsOnModalOpen();
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
  initEscapeModal(closeModal);
  updateStatsUI();

  trackButtonNext.addEventListener('click', () => {
    countSlide <= 0 ? (countSlide += 1) : (countSlide = 1);
    track.style.transform = `translateX(-${countSlide * 100}%)`;
    track.style.transition = '0.3s';

    buttonsPagination[countSlide].classList.add('active');
    buttonsPagination[countSlide - 1].classList.remove('active');

    if (track.style.transform !== 'translateX(0%)') {
      trackButtonNext.style.opacity = '0';
      trackButtonNext.style.visibility = 'hidden';
      trackButtonPrev.style.opacity = '1';
      trackButtonPrev.style.visibility = 'visible';
    }
  });

  trackButtonPrev.addEventListener('click', () => {
    countSlide <= 0 ? (countSlide = 0) : (countSlide -= 1);
    track.style.transform = `translateX(-${countSlide * 100}%)`;
    track.style.transition = '0.3s';

    buttonsPagination[countSlide].classList.add('active');
    buttonsPagination[countSlide + 1].classList.remove('active');

    if (track.style.transform === 'translateX(0%)') {
      trackButtonPrev.style.opacity = '0';
      trackButtonPrev.style.visibility = 'hidden';
      trackButtonNext.style.opacity = '1';
      trackButtonNext.style.visibility = 'visible';
    }
  });

  buttonsPagination.forEach((button, index) => {
    button.addEventListener('click', () => {
      track.style.transform = `translateX(-${index * 100}%)`;
      track.style.transition = '0.3s';
      countSlide = index;

      if (track.style.transform === `translateX(-${countSlide * 100}%)`) {
        trackButtonNext.style.opacity = '0';
        trackButtonNext.style.visibility = 'hidden';
        trackButtonPrev.style.opacity = '1';
        trackButtonPrev.style.visibility = 'visible';
      }

      if (track.style.transform === `translateX(0%)`) {
        trackButtonPrev.style.opacity = '0';
        trackButtonPrev.style.visibility = 'hidden';
        trackButtonNext.style.opacity = '1';
        trackButtonNext.style.visibility = 'visible';
      }

      buttonsPagination.forEach((btn, i) => {
        if (i === index) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    });
  });

  // toggleSlidetoOpenModal();
};

export default initChars;
