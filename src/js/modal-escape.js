const initEscapeModal = (closeModal) => {
  document.addEventListener('keydown', (event) => {
    const overlay = document.querySelector('.overlay');
    if (overlay && event.code === 'Escape') {
      closeModal();
    }
  });
};

export default initEscapeModal;
