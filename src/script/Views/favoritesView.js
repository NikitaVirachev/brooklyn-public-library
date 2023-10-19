class FavoritesView {
  #tabs = document.querySelector('#tabs');
  #books = Array.from(document.querySelectorAll('.book'));

  setState(user) {
    this.#books.forEach((book) => {
      const bookTitle = book.querySelector('.book__title').textContent.trim();
      const bookAuthor = book.querySelector('.book__author').textContent.trim();
      const bookName = `${bookTitle}, ${bookAuthor}`;
      const btn = book.querySelector('.btn');
      btn.setAttribute('data-book', bookName);

      if (user && user.rentedBooks?.includes(bookName)) {
        btn.classList.add('btn--inactive');
        btn.setAttribute('disabled', '');
        btn.innerHTML = 'Own';
      } else {
        btn.classList.remove('btn--inactive');
        btn.removeAttribute('disabled');
        btn.innerHTML = 'Buy';
      }
    });
  }

  #endShowedAnimation(newTab) {
    newTab.classList.remove('book__container--showed');
  }

  #endHiddenAnimation(oldTab, newTab) {
    oldTab.classList.remove(
      'book__container--hidden',
      'book__container--active'
    );
    newTab.classList.add('book__container--active', 'book__container--showed');
    newTab.addEventListener(
      'animationend',
      this.#endShowedAnimation.bind(this, newTab),
      { once: true }
    );
  }

  changeTab(oldTabId, newTabId) {
    const oldTab = document.querySelector(`#${oldTabId}`);
    const newTab = document.querySelector(`#${newTabId}`);

    oldTab.classList.add('book__container--hidden');
    oldTab.addEventListener(
      'animationend',
      this.#endHiddenAnimation.bind(this, oldTab, newTab),
      { once: true }
    );
  }

  addHandleTabsClick(handle) {
    this.#tabs.addEventListener('change', handle);
  }

  addHandleBookBtnsClick(handler) {
    this.#books.forEach((book) => {
      const btn = book.querySelector('.btn');
      btn.addEventListener('click', handler);
    });
  }
}

export default new FavoritesView();
