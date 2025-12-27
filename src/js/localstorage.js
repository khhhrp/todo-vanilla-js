export const localStorageKey = "todos";

export const getLocalStorage = () => {
  const localArr = JSON.parse(localStorage.getItem(localStorageKey));

  return localArr ?? [];
};

export const addLocalStorage = (arr) => {
  const todosInfo = JSON.stringify(arr);
  localStorage.setItem(localStorageKey, todosInfo);
};
