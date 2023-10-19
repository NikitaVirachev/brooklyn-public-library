import ModalView from './modalView';

class ModalFormAuthView extends ModalView {
  addHandleForm(handlerSubmit, handlerClick) {
    this._wrapper.addEventListener('submit', handlerSubmit);
    this._wrapper.addEventListener('click', handlerClick);
  }

  _createLoginFormMarkup() {
    return `
      <div class="close-btn" id="modal-form-auth-close-btn"></div>

      <div class="modal-form-auth__header">Login</div>

      <label for="login-id" class="modal-form__label">
        E-mail or readers card
      </label>
      <input
        id="login-id"
        class="modal-form__input"
        type="text"
        name="id"
        required
      />

      <label for="login-password" class="modal-form__label">
        Password
      </label>
      <input
        id="login-password"
        class="modal-form__input"
        type="password"
        name="password"
        minlength="8"
        required
      />

      <button class="btn modal-form__submit-btn" type="submit">Log In</button>

      <div class="modal-form-auth__alternative">
        <span>Don’t have an account?</span>
        <a class="modal-form-auth__alternativ-link" id="modal-form-auth-alternativ-link" href="register">Register</a>
      </div>
    `;
  }

  _createRegisterFormMarkup() {
    return `
      <div class="close-btn" id="modal-form-auth-close-btn"></div>

      <div class="modal-form-auth__header">Register</div>

      <label for="first-name" class="modal-form__label">
        First name
      </label>
      <input
        id="first-name"
        class="modal-form__input"
        type="text"
        name="firstName"
        required
      />

      <label for="last-name" class="modal-form__label">
        Last name
      </label>
      <input
        id="last-name"
        class="modal-form__input"
        type="text"
        name="lastName"
        required
      />

      <label for="email" class="modal-form__label">
        E-mail
      </label>
      <input
        id="email"
        class="modal-form__input"
        type="email"
        name="email"
        required
      />

      <label for="login-password" class="modal-form__label">
        Password
      </label>
      <input
        id="login-password"
        class="modal-form__input"
        type="password"
        minlength="8"
        name="password"
        required
      />

      <button class="btn modal-form__submit-btn" type="submit">Sign Up</button>

      <div class="modal-form-auth__alternative">
        <span>Already have an account?</span>
        <a class="modal-form-auth__alternativ-link" id="modal-form-auth-alternativ-link" href="login">Login</a>
      </div>
    `;
  }

  login() {
    this._modal.innerHTML = this._createLoginFormMarkup();
    this._modal.setAttribute('data-type', 'login');
    this._open();
  }

  signup() {
    this._modal.innerHTML = this._createRegisterFormMarkup();
    this._modal.setAttribute('data-type', 'signup');
    this._open();
  }
}

export default new ModalFormAuthView(
  '#modal-form-auth-wrapper',
  '#modal-form-auth'
);
