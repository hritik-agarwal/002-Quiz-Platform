// UTITLITY FUNCTIONS

/** @returns {HTMLElement} */
export const getElem = (selector, node = document) =>
  node.querySelector(selector);

/** @returns {NodeListOf<HTMLElement>} */
export const getAllElem = (selector, node = document) =>
  node.querySelectorAll(selector);

// HANDLE_LOCAL_STORAGE

export const getLocalStorageKey = (key) => {
  const app = "app:002-quiz-platform:";
  return app + key;
};

/** @returns {Object} */
export const getLocalStorageData = (key) => {
  const todoList = localStorage.getItem(key);
  const data = todoList ? JSON.parse(todoList) : null;
  return data;
};

export const setLocalStorageData = (key, value) => {
  const data = JSON.stringify(value);
  localStorage.setItem(key, data);
};
