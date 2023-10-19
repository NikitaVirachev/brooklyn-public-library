class HeaderMenuView {
  #header = document.querySelector('#header');
  #navigation = document.querySelector('#navigation');
  #header_menu_btns = document.querySelector('#header-menu-btns');
  #header_backarea = document.querySelector('#header-backarea');
  #iconProfile = document.querySelector('#icon-profile');
  #profileMenu = null;

  addHandleRender(handler) {
    this.#header.addEventListener('click', handler);
  }

  addHandleIconProfileClick(handler) {
    this.#iconProfile.addEventListener('click', handler);
  }

  hideEverything() {
    this.#hideBurgerMenu();
    this.#hideProfileMenu();
    this.#header_backarea.classList.remove('header__backarea--show');
  }

  #hideBurgerMenu() {
    this.#header_menu_btns.classList.add('header__burger--open');
    this.#navigation.classList.add('navigation--close');
  }

  toggleBurgerMenu() {
    this.#header_menu_btns.classList.toggle('header__burger--open');
    this.#navigation.classList.toggle('navigation--close');
    this.#header_backarea.classList.toggle('header__backarea--show');

    if (!this.#profileMenu.classList.contains('profile-menu--hidden')) {
      this.#hideProfileMenu();
      this.#header_backarea.classList.add('header__backarea--show');
    }
  }

  #hideProfileMenu() {
    this.#profileMenu.classList.add('profile-menu--hidden');
  }

  toggleProfileMenu() {
    this.#profileMenu.classList.toggle('profile-menu--hidden');
    this.#header_backarea.classList.toggle('header__backarea--show');

    if (!this.#header_menu_btns.classList.contains('header__burger--open')) {
      this.#hideBurgerMenu();
      this.#header_backarea.classList.add('header__backarea--show');
    }
  }

  #createProfileMenuMarkup(btnsData) {
    return `
      <nav class="profile-menu profile-menu--hidden" id="profile-menu">
        ${
          btnsData.cardNumber
            ? `<div class="profile-menu__header-item profile-menu__header-item--small">${btnsData.cardNumber}</div>`
            : '<div class="profile-menu__header-item">Profile</div>'
        }
        <ul class="profile-menu__list">
          <li class="profile-menu__item" id="${btnsData.firstId}">
            ${btnsData.firstBtn}
          </li>
          <li class="profile-menu__item" id="${btnsData.secondId}">
            ${btnsData.secondBtn}
          </li>
        </ul>
      </nav>
    `;
  }

  setState(user, profileMenuHandler) {
    this.#iconProfile.innerHTML = '';
    if (user) {
      const btnsData = {
        firstId: 'my-profile-btn',
        secondId: 'logout-btn',
        firstBtn: 'My profile',
        secondBtn: 'Log Out',
        cardNumber: user.cardNumber,
      };
      this.#iconProfile.insertAdjacentHTML(
        'afterbegin',
        this.#createProfileMenuMarkup(btnsData)
      );

      this.#iconProfile.insertAdjacentHTML(
        'afterbegin',
        `
          <div class="header__initials-icon" 
            title="${user.firstName} ${user.lastName}">
            ${user.firstName.charAt(0).toUpperCase()}
            ${user.lastName.charAt(0).toUpperCase()}
          </div>
        `
      );
    } else {
      const btnsData = {
        firstId: 'login-btn',
        secondId: 'register-btn',
        firstBtn: 'Log In',
        secondBtn: 'Register',
        cardNumber: null,
      };
      this.#iconProfile.insertAdjacentHTML(
        'afterbegin',
        this.#createProfileMenuMarkup(btnsData)
      );

      this.#iconProfile.insertAdjacentHTML(
        'afterbegin',
        '<img src="./src/img/icons/icon_profile.svg" alt="Icon of profile" />'
      );
    }

    this.#profileMenu = document.querySelector('#profile-menu');
    this.addHandleIconProfileClick(profileMenuHandler);
  }
}

export default new HeaderMenuView();
