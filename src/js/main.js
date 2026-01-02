import { addLocalStorage, getLocalStorage } from "./localstorage";

document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.querySelector(".todo__list");
  const emptyBlock = document.querySelector(".empty");
  const addNoteButton = document.querySelector(".add-btn");
  const addNoteInput = document.querySelector(".popover__input");
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

    if (items.length <= 0) {
      emptyBlock.style.display = "block";
      todoList.style.display = "none";
    } else {
      emptyBlock.style.display = "none";
      todoList.style.display = "block";
    }
  };

  toggleEmptyBlock();

  addNoteInput.addEventListener("input", (e) => {
    if (e.target.value.startsWith(" ")) {
      e.target.value = "";
      return;
    }
  });

  addNoteButton.addEventListener("click", () => {
    const value = addNoteInput.value.trim();
    const id = `${Math.random()}-${Date.now()}`;
    const selectValue = select.value;

    if (value.length > 0) {
      const currentTodosArr = getLocalStorage();
      currentTodosArr.push({ id, value, checked: false });
      addLocalStorage(currentTodosArr);
      createElements(filteredArray(currentTodosArr)[selectValue]);

      toggleEmptyBlock();
      popover.hidePopover();
    } else {
      alert("Поле ввода не может быть пустым");
    }

    addNoteInput.value = "";
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
    const changeBtn = event.target.closest(".todo__item-btn--change");
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

    if (changeBtn) {
      const checkLabel = currentItem.querySelector(".check__label");
      const todoCheck = currentItem.querySelector(".todo__check");
      const originalText = checkLabel.textContent;
      const input = document.createElement("input");

      input.type = "text";
      input.value = originalText;
      input.classList.add("check__change-input", "check__label");

      checkLabel.style.display = "none";
      todoCheck.appendChild(input);
      input.focus();

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          input.blur();
        } else if (e.key === "Escape") {
          e.preventDefault();
          input.value = originalText;
          input.blur();
        }
      });

      input.addEventListener("blur", () => {
        const value = input.value;

        if (value.trim().length === 0) {
          const filteredArray = arr.filter((el) => el.id !== currentId);
          addLocalStorage(filteredArray);
          currentItem?.remove();
          toggleEmptyBlock();
          return;
        }

        if (originalText !== value) {
          checkLabel.textContent = value;

          const newArr = arr.map((el) => {
            return el.id === currentId ? { ...el, value: value } : el;
          });

          addLocalStorage(newArr);
        }

        input.remove();
        checkLabel.style.display = "block";
      });
    }
  });

  createElements(todos);

  const searchInput = document.querySelector(".todo__input");

  searchInput.addEventListener("input", (e) => {
    const currentTaskArray = getLocalStorage();

    if (e.target.value.startsWith(" ")) {
      e.target.value = "";
      return;
    }

    const searchValue = searchInput.value.trim();

    const findItemsArr = currentTaskArray.filter((el) => {
      if (el.value.toLowerCase().startsWith(searchValue)) {
        return el;
      }
    });

    createElements(findItemsArr);
  });

  const hesoyam = "hesoyam";
  let word = "";
  const audio = new Audio(
    "https://files.voicy.network/public/Content/Clips/Sound/e749f7ae-5248-4200-bc02-f0df48739be7.mp3"
  );

  document.addEventListener("keydown", (e) => {
    const currentKey = e.key;
    word += `${currentKey}`;

    if (!hesoyam.startsWith(word)) {
      word = "";
      return;
    }

    if (word === hesoyam) {
      createCash();
      word = "";
    }
  });

  let spanHeight = 0;
  let spanWidth = 0;

  const createCash = () => {
    const span = document.createElement("span");
    span.classList.add("cash");
    span.innerText = "+250 000 $";

    if (spanHeight === 0 || spanWidth === 0) {
      span.style.visibility = "hidden";
      document.body.appendChild(span);
      spanHeight = span.offsetHeight;
      spanWidth = span.offsetWidth;
      document.body.removeChild(span);
      span.style.visibility = "visible";
    }

    const maxHeight = window.innerHeight - spanHeight;
    const maxWidth = window.innerWidth - spanWidth;

    span.style.top = Math.random() * maxHeight + "px";
    span.style.left = Math.random() * maxWidth + "px";

    span.addEventListener("animationend", (e) => {
      e.target.remove();
    });

    document.body.appendChild(span);
    play();
  };

  const play = () => {
    audio.volume = 0.2;
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  };
});
