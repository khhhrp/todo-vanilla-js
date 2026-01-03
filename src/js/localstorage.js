export const localStorageKey = "todos";

export const getLocalStorageTodos = () => {
  const localArr = JSON.parse(localStorage.getItem(localStorageKey));

  return localArr ?? [];
};

export const addLocalStorageTodos = (arr) => {
  const todosInfo = JSON.stringify(arr);
  localStorage.setItem(localStorageKey, todosInfo);
};
