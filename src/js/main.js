import { addLocalStorage, getLocalStorage } from "./localstorage";

document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.querySelector(".todo__list");
  const emptyBlock = document.querySelector(".empty");
  const addNoteButton = document.querySelector(".add-btn");
  const addNodeInput = document.querySelector(".popover__input");
  const popover = document.getElementById("my-popover");
  const select = document.querySelector(".main-select");

  const todos = getLocalStorage();

  select.addEventListener("change", (e) => {
    const todos = getLocalStorage();
    const value = e.target.value;
    const arr = filteredArray(todos);

    createElements(arr[value]);
  });

  const filteredArray = (arr) => {
    return {
      complete: arr.filter((el) => el.checked),
      incomplete: arr.filter((el) => !el.checked),
      all: arr,
    };
  };

  const toggleEmptyBlock = () => {
    const items = getLocalStorage();

    items.length <= 0
      ? emptyBlock.classList.add("empty--active")
      : emptyBlock.classList.remove("empty--active");
  };

  toggleEmptyBlock();

  addNoteButton.addEventListener("click", () => {
    const value = addNodeInput.value.trim();
    const id = `${Math.random()}-${Date.now()}`;
    const selectValue = select.value;

    if (value.length > 0) {
      todos.push({ id, value, checked: false });
      createElements(filteredArray(todos)[selectValue]);
      addLocalStorage(todos);

      toggleEmptyBlock();
      popover.hidePopover();
    } else {
      alert("Поле ввода не может быть пустым");
    }

    addNodeInput.value = "";
  });

  const createIcon = (iconName) => {
    return `<svg class="icon">
                  <use href="#${iconName}"></use>
                </svg>`;
  };

  const createElements = (arr) => {
    todoList.innerHTML = "";

    arr.forEach((el) => {
      const isChecked = el.checked ? "checked" : "";

      todoList.insertAdjacentHTML(
        "beforeend",
        `<li data-id="${el.id}" class="todo__item">
            <label class="check todo__check">
              <input type="checkbox" ${isChecked} class="check__input visually-hidden" />
              <span class="check__box">
                ${createIcon("check")}
              </span>
              <span class="check__label">${el.value}</span>
            </label>
            <div class="todo__item-actions">
              <button
                type="button"
                class="todo__item-btn todo__item-btn--change"
              >
                 ${createIcon("change")}
              </button>
              <button
                type="button"
                class="todo__item-btn todo__item-btn--delete"
              >
                 ${createIcon("delete")}
              </button>
            </div>
          </li>`
      );
    });
  };

  todoList.addEventListener("click", (event) => {
    const deleteBtn = event.target.closest(".todo__item-btn--delete");
    const currentItem = event.target.closest(".todo__item");
    const currentInput = event.target.closest(".check__input");
    const arr = getLocalStorage();

    if (!currentItem) return;
    const currentId = currentItem.dataset.id;

    if (deleteBtn) {
      const filteredArray = arr.filter((el) => el.id !== currentId);

      addLocalStorage(filteredArray);
      currentItem?.remove();
      toggleEmptyBlock();
      return;
    }

    if (currentInput) {
      const mapArray = arr.map((el) => {
        return el.id === currentId
          ? { ...el, checked: currentInput.checked }
          : el;
      });

      addLocalStorage(mapArray);
    }
  });

  createElements(todos);
});
