document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.querySelector(".todo__list");
  const emptyBlock = document.querySelector(".empty");

  const config = {
    childList: true,
    subtree: true,
  };

  const showEmptyBlock = () => {
    const items = todoList.querySelectorAll(".todo__item");

    items.length <= 0
      ? emptyBlock.classList.add("empty--active")
      : emptyBlock.classList.remove("empty--active");
  };

  const observer = new MutationObserver(showEmptyBlock);

  observer.observe(todoList, config);

  showEmptyBlock();
});
