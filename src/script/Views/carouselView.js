class CarouselView {
  #leftCarret = document.querySelector('#left-carret');
  #rightCarret = document.querySelector('#right-carret');
  #pagination = document.querySelector('#pagination');
  #paginationCircle = Array.from(
    document.querySelectorAll('.carousel__circle')
  );
  #paginationBtns = Array.from(document.querySelectorAll('.carousel__btn'));
  #imagesContainer = document.querySelector('#carousel-images-container');
  #mediaQuery = window.matchMedia('(max-width: 1439px)');
  #columnWidth = 45 + 2.5;
  #positions = [
    0,
    -this.#columnWidth,
    -this.#columnWidth * 2,
    -this.#columnWidth * 3,
    -this.#columnWidth * 4,
  ];

  #updateCurrentCircle(newPosition) {
    this.#paginationCircle.forEach((circle) => {
      circle.classList.remove('carousel__circle--active');
    });
    this.#paginationCircle[newPosition].classList.add(
      'carousel__circle--active'
    );
  }

  render(newPosition) {
    this.#updateCurrentCircle(newPosition);

    this.#rightCarret.removeAttribute('disabled');
    this.#leftCarret.removeAttribute('disabled');
    if (newPosition === this.#positions.length - 1)
      this.#rightCarret.setAttribute('disabled', '');
    if (newPosition === 0) this.#leftCarret.setAttribute('disabled', '');

    this.#paginationBtns.forEach((btn) => {
      btn.removeAttribute('disabled');
    });
    this.#paginationBtns[newPosition].setAttribute('disabled', '');

    document.documentElement.style.setProperty(
      '--carousel-position',
      this.#positions[newPosition] + 'rem'
    );
  }

  #endMoveToAnimation() {
    this.#imagesContainer.classList.remove('move-to');
  }

  moveTo(oldPosition, newPosition) {
    document.documentElement.style.setProperty(
      '--animation-position-from',
      this.#positions[oldPosition] + 'rem'
    );
    document.documentElement.style.setProperty(
      '--animation-position-to',
      this.#positions[newPosition] + 'rem'
    );

    this.#imagesContainer.classList.add('move-to');

    this.#imagesContainer.addEventListener(
      'animationend',
      this.#endMoveToAnimation.bind(this),
      { once: true }
    );

    this.render(newPosition);
  }

  addHandleTabletChange(handle) {
    this.#mediaQuery.addEventListener('change', handle);
    handle(this.#mediaQuery);
  }

  addHandleRightCarretClick(handle) {
    this.#rightCarret.addEventListener('click', handle);
  }

  addHandleLeftCarretClick(handle) {
    this.#leftCarret.addEventListener('click', handle);
  }

  addHeandlePaginationClick(handle) {
    this.#pagination.addEventListener('click', handle);
  }
}

export default new CarouselView();
