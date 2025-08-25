const initSettings = () => {
  const body = document.querySelector('body');
  const logo = document.querySelector('.logo');
  const overlay = document.querySelector('.overlay');
  const buttonClose = document.querySelector('.settings__button-close');
  const settingsLink = document.querySelector('a[href="#characters"]');

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
    body.classList.remove('overlay');
    logo.classList.remove('hidden');

    history.back();
  };

  if (buttonClose) {
    buttonClose.addEventListener('click', closeModal);
  }
};

export default initSettings;
