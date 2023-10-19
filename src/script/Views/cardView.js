class cardView {
  #libraryCard = document.querySelector('#library-card');
  #form = document.querySelector('#check-card');
  #footer = document.querySelector('#card-form-footer');
  #account = document.querySelector('#library-card-account');
  #nameInput = document.querySelector('#name-input');
  #cardInput = document.querySelector('#card-input');

  setState(user) {
    if (user) {
      this.showProfileInfo(user);
      this.showVisitYourProfile();
    } else {
      this.showSubmitBtn();
      this.showGetReaderCard();
    }
  }

  showSubmitBtn() {
    this.#footer.innerHTML = this.#createBtnMarkup();
    this.cleanCardForm();
  }

  showProfileInfo(user) {
    this.#nameInput.value = `${user.firstName} ${user.lastName}`;
    this.#cardInput.value = user.cardNumber;
    this.#footer.innerHTML = this.#createProfileMarkup(user);
  }

  showGetReaderCard() {
    this.#account.innerHTML = this.#createGetReaderCardMarkup();
  }

  showVisitYourProfile() {
    this.#account.innerHTML = this.#createVisitYourProfilearkup();
  }

  cleanCardForm() {
    this.#form.elements.name.value = '';
    this.#form.elements.card.value = '';
  }

  #createBtnMarkup() {
    return `
      <button
        class="card-form__btn"
        id="submit-card-btn"
        type="submit"
      >
        Check the card
      </button>
    `;
  }

  #createProfileMarkup(user) {
    return `
      <div class="cards-profile">
        <div class="cards-profile__info">
          <p>visits</p>
          <img src="./src/img/icons/Union.svg" alt="Man icon" />
          <p>${user.visits}</p>
        </div>
        <div class="cards-profile__info">
          <p>bonuses</p>
          <img src="./src/img/icons/Star 1.svg" alt="Star icon" />
          <p>${user.bonuses}</p>
        </div>
        <div class="cards-profile__info">
          <p>books</p>
          <img src="./src/img/icons/book.svg" alt="Man icon" />
          <p>${user.rentedBooks?.length || 0}</p>
        </div>
      </div>
    `;
  }

  #createGetReaderCardMarkup() {
    return `
      <p class="library-card__title library-card__title--forum">
        Get a reader card
      </p>
      <p class="library-card__description">
        You will be able to see a reader card after logging into account
        or you can register a new account
      </p>
      <div class="library-card__buttons">
        <div class="btn" id="library-card-signup">Sign Up</div>
        <div class="btn" id="library-card-login">Log In</div>
      </div>
    `;
  }

  #createVisitYourProfilearkup() {
    return `
      <p class="library-card__title library-card__title--forum">
        Visit your profile
      </p>
      <p class="library-card__description">
        With a digital library card you get free access to the 
        Library’s wide array of digital resources including e-books, 
        databases, educational resources, and more.
      </p>
      <div class="library-card__buttons">
        <div class="btn" id="library-card-profile">Profile</div>
      </div>
    `;
  }

  addHandleSubmitCard(handlerClick, handlerSubmit) {
    this.#libraryCard.addEventListener('click', handlerClick);
    this.#libraryCard.addEventListener('submit', handlerSubmit);
  }
}

export default new cardView();
