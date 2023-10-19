export let state = {
  carouser: {
    currentImages: [],
    position: null,
    posssiblePositionNumber: null,
  },
  tabs: {
    currentTab: null,
  },
  user: null,
};

export const updateCurrentImages = function (images) {
  state.carouser.currentImages = images;
};

export const updatePosition = function (position) {
  state.carouser.position = position;
};

export const updateCurrentTab = function (tab) {
  state.tabs.currentTab = tab;
};

export const setUser = function () {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) state.user = null;
  state.user = user;
};

export const getUser = function () {
  return state.user;
};

export const updateUser = function (newUser) {
  let users = JSON.parse(localStorage.getItem('users'));
  if (!users) return;

  const newUsers = users.map((user) =>
    user.cardNumber === newUser.cardNumber ? newUser : user
  );

  localStorage.setItem('users', JSON.stringify(newUsers));
};

const genRanHex = function (size) {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('')
    .toUpperCase();
};

export const signup = function (formFields) {
  let users = JSON.parse(localStorage.getItem('users'));

  if (!users) users = [];
  if (users.map((user) => user.email).includes(formFields.email.value)) return;

  const cardNumbers = users.map((user) => user.cardNumber);
  let cardNumber = '';
  do {
    cardNumber = genRanHex(9);
  } while (cardNumbers.includes(cardNumber));

  const newUser = {
    firstName: formFields.firstName.value,
    lastName: formFields.lastName.value,
    email: formFields.email.value,
    password: formFields.password.value,
    cardNumber: cardNumber,
    visits: 1,
    bonuses: 0,
    rentedBooks: null,
    subscription: false,
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  setUser();
};

export const login = function (authData) {
  const users = JSON.parse(localStorage.getItem('users'));
  if (!users) return;

  const user = users.find(
    (user) =>
      (user.email === authData.id.value ||
        user.cardNumber === authData.id.value) &&
      user.password === authData.password.value
  );
  if (user) {
    user.visits++;
    updateUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  setUser();
};

export const logOut = function () {
  localStorage.setItem('currentUser', null);
  setUser();
};

export const checkCard = function (cardData) {
  const users = JSON.parse(localStorage.getItem('users'));

  if (!users) return;

  const [firstName, lastName] = cardData.name.value.trim().split(' ');
  const cardNumber = cardData.card.value.trim();

  const user = users.find(
    (user) =>
      user.firstName === firstName &&
      user.lastName === lastName &&
      user.cardNumber === cardNumber
  );

  return user;
};

export const buyBook = function (book) {
  state.user.rentedBooks
    ? state.user.rentedBooks.push(book)
    : (state.user.rentedBooks = [book]);

  updateUser(state.user);
  localStorage.setItem('currentUser', JSON.stringify(state.user));
};

export const buyCard = function () {
  state.user.subscription = true;
  updateUser(state.user);
  localStorage.setItem('currentUser', JSON.stringify(state.user));
};
