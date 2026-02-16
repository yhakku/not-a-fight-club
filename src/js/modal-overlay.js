const initOverlayClose = (closeModal) => {
  document.addEventListener('click', (event) => {
    const overlay = document.querySelector('.overlay');
    if (overlay && event.target === overlay) {
      closeModal();
    }
  });
};

export default initOverlayClose;
