import '../index.html';
import '../sass/main.scss';

import headerMenuView from './Views/headerMenuView';
import carouselView from './Views/carouselView';
import favoritesView from './Views/favoritesView';
import cardView from './Views/cardView';
import modalFormAuthView from './Views/ModalWindows/modalFormAuthView';
import modalProfileView from './Views/ModalWindows/modalProfileView';
import modalBuyCardView from './Views/ModalWindows/modalBuyCardView';
import * as model from './model.js';

const controlHeaderMenu = function (e) {
  if (e.target.closest('#header-menu-btns, .navigation__item'))
    headerMenuView.toggleBurgerMenu();
  if (e.target.closest('#header-backarea')) headerMenuView.hideEverything();
};

const controlIconProfileClick = function (e) {
  headerMenuView.toggleProfileMenu();
  if (e.target.closest('#my-profile-btn')) {
    const user = model.getUser();
    modalProfileView.show(user);
  }
  if (e.target.closest('#logout-btn')) {
    model.logOut();
    initialUser();
  }
  if (e.target.closest('#login-btn')) modalFormAuthView.login();
  if (e.target.closest('#register-btn')) modalFormAuthView.signup();
};

const controlTabletChange = function (e) {
  model.updatePosition(0);
  carouselView.render(model.state.carouser.position);
};

const controlRightCarretClick = function (e) {
  const oldPosition = model.state.carouser.position;
  model.updatePosition(model.state.carouser.position + 1);
  const newPosition = model.state.carouser.position;
  carouselView.moveTo(oldPosition, newPosition);
};

const controlLeftCarretClick = function (e) {
  const oldPosition = model.state.carouser.position;
  model.updatePosition(model.state.carouser.position - 1);
  const newPosition = model.state.carouser.position;
  carouselView.moveTo(oldPosition, newPosition);
};

const controlPaginationClick = function (e) {
  const btn = e.target.classList.contains('carousel__btn')
    ? e.target
    : e.target.parentElement;
  const oldPosition = model.state.carouser.position;
  const position = +btn.dataset.position;
  model.updatePosition(position);
  const newPosition = model.state.carouser.position;
  carouselView.moveTo(oldPosition, newPosition);
};

const controlTabsClick = function (e) {
  const oldTab = model.state.tabs.currentTab ?? 'winterBooks';
  model.updateCurrentTab(e.target.dataset.tab);
  const newTab = model.state.tabs.currentTab;
  favoritesView.changeTab(oldTab, newTab);
};

const initialUser = function () {
  model.setUser();
  const user = model.getUser();

  cardView.setState(user);
  headerMenuView.setState(user, controlIconProfileClick);
  favoritesView.setState(user);
};

const controlCardSubmit = function (e) {
  e.preventDefault();
  const form = e.target;
  const formFields = form.elements;
  const user = model.checkCard(formFields);
  if (user) cardView.showProfileInfo(user);
  setTimeout(cardView.showSubmitBtn.bind(cardView), 10000);
};

const controlCardClick = function (e) {
  if (e.target.closest('#library-card-signup')) modalFormAuthView.signup();
  if (e.target.closest('#library-card-login')) modalFormAuthView.login();
  if (e.target.closest('#library-card-profile')) {
    const user = model.getUser();
    modalProfileView.show(user);
  }
};

const controlModalFormAuthSubmit = function (e) {
  e.preventDefault();

  const form = e.target;
  const formFields = form.elements;
  if (form.dataset.type === 'signup') model.signup(formFields);
  if (form.dataset.type === 'login') model.login(formFields);

  modalFormAuthView.close();
  initialUser();
};

const controlModalFormAuthClick = function (e) {
  if (
    e.target.closest('#modal-form-auth-close-btn') ||
    e.target.classList.contains('pop-up')
  ) {
    modalFormAuthView.close();
  }
  if (e.target.closest('#modal-form-auth-alternativ-link')) {
    e.preventDefault();
    const type = e.target.getAttribute('href');
    if (type === 'register') modalFormAuthView.signup();
    if (type === 'login') modalFormAuthView.login();
  }
};

const controlModalProfileClick = function (e) {
  if (
    e.target.closest('#modal-profile-close-btn') ||
    e.target.classList.contains('pop-up')
  ) {
    modalProfileView.close();
  }
  if (e.target.closest('#modal-profile-copy-btn')) {
    const user = model.getUser();
    navigator.clipboard.writeText(user.cardNumber).catch((err) => {
      console.log('Failed to copy card number', err);
    });
  }
};

const controlBookBtnsClick = function (e) {
  const user = model.getUser();
  const btn = e.target;
  if (user && user.subscription) {
    model.buyBook(btn.dataset.book);
    initialUser();
  }
  if (user && !user.subscription) modalBuyCardView.show();
  if (!user) modalFormAuthView.login();
};

const controlModalBuyCardSubmit = function (e) {
  e.preventDefault();
  model.buyCard();
  modalBuyCardView.close();
};

const controlModalBuyCardClick = function (e) {
  if (
    e.target.closest('#modal-buy-card-close-btn') ||
    e.target.classList.contains('pop-up')
  ) {
    modalBuyCardView.close();
  }
};

const init = function () {
  initialUser();
  headerMenuView.addHandleRender(controlHeaderMenu);
  modalFormAuthView.addHandleForm(
    controlModalFormAuthSubmit,
    controlModalFormAuthClick
  );
  modalProfileView.addHandleModalProfile(controlModalProfileClick);
  modalBuyCardView.addHendleModalBuyCardClick(
    controlModalBuyCardClick,
    controlModalBuyCardSubmit
  );
  carouselView.addHandleTabletChange(controlTabletChange);
  carouselView.addHandleRightCarretClick(controlRightCarretClick);
  carouselView.addHandleLeftCarretClick(controlLeftCarretClick);
  carouselView.addHeandlePaginationClick(controlPaginationClick);
  favoritesView.addHandleTabsClick(controlTabsClick);
  favoritesView.addHandleBookBtnsClick(controlBookBtnsClick);
  cardView.addHandleSubmitCard(controlCardClick, controlCardSubmit);
};
init();
