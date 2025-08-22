const initLogin = () => {
  const title = document.querySelector('.login__title');
  const form = document.querySelector('.form');
  const formContainer = document.querySelector('.form__form-container');
  const input = document.querySelector('.form__input');
  const formError = document.querySelector('.form__error');
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
    formContainer.style.paddingBottom = '10px';
    buttonChars.classList.add('hidden');
    buttonSettings.classList.add('hidden');
  } else {
    form.classList.add('hidden');
    createElementP(nickname);
  }

  input.addEventListener('input', () => {
    const validityState = input.validity;
    console.log(validityState);

    input.setCustomValidity(' ');

    if (validityState.patternMismatch) {
      input.classList.add('invalid');
      formError.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
      formError.classList.remove('invalid');
      input.setCustomValidity('');
    }
  });
};

export default initLogin;
