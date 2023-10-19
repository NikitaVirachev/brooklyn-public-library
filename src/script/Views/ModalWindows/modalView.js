export default class ModalView {
  _wrapper;
  _modal;

  constructor(wrapperId, modalId) {
    this._wrapper = document.querySelector(wrapperId);
    this._modal = document.querySelector(modalId);
  }

  _open() {
    this._wrapper.classList.add('pop-up--show');
  }

  close() {
    this._wrapper.classList.remove('pop-up--show');
  }
}
