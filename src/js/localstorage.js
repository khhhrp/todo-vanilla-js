export const localStorageKeyTodos = "todos";
export const localStorageKeyTheme = "theme";

export const getLocalStorageTodos = () => {
  const localArr = JSON.parse(localStorage.getItem(localStorageKeyTodos));

  return localArr ?? [];
};

export const addLocalStorageTodos = (arr) => {
  const todosInfo = JSON.stringify(arr);
  localStorage.setItem(localStorageKeyTodos, todosInfo);
};

export const getLocalStorageTheme = () => {
  return localStorage.getItem(localStorageKeyTheme);
};

export const addLocalStorageTheme = (str) => {
  localStorage.setItem(localStorageKeyTheme, str);
};
