import ModalView from './modalView';

class ModalProfileView extends ModalView {
  addHandleModalProfile(handler) {
    this._wrapper.addEventListener('click', handler);
  }

  _createModalProfileMarkup(user) {
    return `
      <div class="close-btn" id="modal-profile-close-btn"></div>

      <div class="modal-profile__user">
        <div class="modal-profile__avatar">
          ${user.firstName.charAt(0).toUpperCase()}
          ${user.lastName.charAt(0).toUpperCase()}
        </div>
        <div class="modal-profile__name">
          ${user.firstName} ${user.lastName}
        </div>
      </div>

      <div class="modal-profile__about">
        <p class="modal-profile__header">My profile</p>

        <div class="modal-profile__data">
          <div class="cards-profile">
            <div class="cards-profile__info">
              <p class="cards-profile__title">visits</p>
              <img src="./src/img/icons/Union.svg" alt="Man icon" />
              <p class="cards-profile__value">${user.visits}</p>
            </div>
            <div class="cards-profile__info">
              <p class="cards-profile__title">bonuses</p>
              <img src="./src/img/icons/Star 1.svg" alt="Star icon" />
              <p class="cards-profile__value">${user.bonuses}</p>
            </div>
            <div class="cards-profile__info">
              <p class="cards-profile__title">books</p>
              <img src="./src/img/icons/book.svg" alt="Man icon" />
              <p class="cards-profile__value">${
                user.rentedBooks?.length || 0
              }</p>
            </div>
          </div>

          <div class="modal-profile__books">
            <p>Rented books</p>
            <ul class="modal-profile__list">
              ${
                user.rentedBooks
                  ?.map(
                    (book) => `<li class="modal-profile__item">${book}</li>`
                  )
                  .reduce((acc, str) => acc + str) || ''
              }
            </ul>
          </div>
        </div>

        <div class="modal-profile__card">
          <span>Card number</span>
          <span class="modal-profile__card-number">${user.cardNumber}</span>
          <img
            class="modal-profile__copy-btn"
            id="modal-profile-copy-btn"
            src="./src/img/icons/icon_copy.svg"
            alt="Copy icon"
          />
        </div>
      </div>
    `;
  }

  show(user) {
    this._modal.innerHTML = this._createModalProfileMarkup(user);
    this._open();
  }
}

export default new ModalProfileView('#modal-profile-wrapper', '#modal-profile');
