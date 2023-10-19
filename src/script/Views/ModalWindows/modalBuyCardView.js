import ModalView from './modalView';

class ModalBuyCardView extends ModalView {
  addHendleModalBuyCardClick(handlerClick, handlerSubmit) {
    this._wrapper.addEventListener('click', handlerClick);
    this._wrapper.addEventListener('submit', handlerSubmit);
  }

  _generateMarkup() {
    return `
      <div
        class="close-btn close-btn--white"
        id="modal-buy-card-close-btn"
      ></div>
      <p class="modal-buy-card__title">Buy a library card</p>
      <div class="modal-buy-card__content">
        <form class="modal-buy-card__form" id="modal-buy-card-form">
          <div class="modal-buy-card__group">
            <label for="bank-card-number" class="modal-form__label">
              Bank card number
            </label>
            <input
              id="bank-card-number"
              class="modal-form__input"
              type="text"
              name="bankCardNumber"
              placeholder="1234 5678 9012 3456"
              pattern="(\\d{4}\\s?){4}"
              required
            />

            <fieldset class="modal-buy-card__expiration-code">
              <legend class="modal-form__label">Expiration code</legend>
              <input
                id="expiration-code-1"
                class="modal-form__input"
                type="text"
                name="expirationCode1"
                placeholder="00"
                pattern="\\d{2}"
                required
              />
              <input
                id="expiration-code-2"
                class="modal-form__input"
                type="text"
                name="expirationCode2"
                placeholder="00"
                pattern="\\d{2}"
                required
              />
            </fieldset>

            <label for="cvc" class="modal-form__label">CVC</label>
            <input
              id="cvc"
              class="modal-form__input modal-buy-card__cvc"
              type="text"
              name="cvc"
              placeholder="000"
              pattern="\\d{3}"
              required
            />
          </div>

          <div class="modal-buy-card__group">
            <label for="cardholder-name" class="modal-form__label">
              Cardholder name
            </label>
            <input
              id="cardholder-name"
              class="modal-form__input"
              type="text"
              name="cardholderName"
              placeholder="Ivanov Ivan"
              required
            />

            <label for="postal-code" class="modal-form__label">
              Postal code
            </label>
            <input
              id="postal-code"
              class="modal-form__input"
              type="text"
              name="postalCode"
              placeholder="123456789"
              required
            />

            <label for="city-town" class="modal-form__label">
              City / Town
            </label>
            <input
              id="city-town"
              class="modal-form__input"
              type="text"
              name="cityTown"
              placeholder="Moscow"
              required
            />
          </div>

          <div class="modal-buy-card__cost">
            <button class="btn modal-form__submit-btn" type="submit">
              Buy
            </button>
            <p>$ 25.00</p>
          </div>
        </form>
        <div class="modal-buy-card__description">
          If you are live, work, attend school, or pay property taxes in New
          York State, you can get a $25 digital library card right now using
          this online form. Visitors to New York State can also use this form
          to apply for a temporary card.
        </div>
      </div>
    `;
  }

  show() {
    this._modal.innerHTML = this._generateMarkup();
    this._open();
  }
}

export default new ModalBuyCardView(
  '#modal-buy-card-wrapper',
  '#modal-buy-card'
);
