const initLogin = () => {
  const title = document.querySelector('.login__title');
  const form = document.querySelector('.form');
  const input = document.querySelector('.form__input');
  const buttonSubmit = document.querySelector('.form__submit');
  const buttonChars = document.querySelector('.login__button-chars');
  const buttonSettings = document.querySelector('.login__button-settings');

  let nickname = null;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    nickname = input.value.trim();
    if (!nickname) {
      return;
    } else {
      form.classList.add('hidden');
      createElementP(nickname);
      buttonChars.classList.remove('hidden');
      buttonSettings.classList.remove('hidden');
    }

    saveState(nickname);
  });

  const saveState = (nickname) => {
    const data = {
      nickname,
    };

    localStorage.setItem('data', JSON.stringify(data));
  };

  const loadState = () => {
    const loadData = localStorage.getItem('data');

    if (loadData) {
      const data = JSON.parse(loadData);
      nickname = data.nickname;
    }
  };

  loadState();

  const createElementP = (nickname) => {
    const greeting = document.createElement('p');
    greeting.className = 'login__greeting h2';
    greeting.textContent = `Konnichiwa, ${nickname}!`;

    title.insertAdjacentElement('afterend', greeting);
  };

  if (nickname === null) {
    buttonChars.classList.add('hidden');
    buttonSettings.classList.add('hidden');
  } else {
    form.classList.add('hidden');
    createElementP(nickname);
  }
};

export default initLogin;
