window.onload = function () {
  const ul = document.getElementById("ul");
  const clearButton = document.querySelector(".clear-todos");
  const todos = JSON.parse(localStorage.getItem("todos")) || []; // خواندن از localStorage

  todos.forEach((todo) => {
    const li = document.createElement("li");
    let className = "";
    if (todo.completed) {
      className = "completed";
    }

    li.innerHTML = `
        <span class="${className}">${todo.text}</span>
        <div class="actions">
          <i class="fa fa-trash delete"></i>
          <i class="fa fa-check"></i>
        </div>
      `;
    ul.appendChild(li);
  });

  if (todos.length > 0) {
    clearButton.style.display = "block";
  }
};

document.getElementById("button").addEventListener("click", function (e) {
  e.preventDefault();
  const ul = document.getElementById("ul");
  const input = document.getElementById("input");
  const clearButton = document.querySelector(".clear-todos");

  if (input.value.trim() === "") {
    alert("ورودی خالی است ");
    return;
  }

  const newTodo = {
    text: input.value,
    completed: false,
  };

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));

  const li = document.createElement("li");
  li.innerHTML = `
      <span>${input.value}</span>
      <div class="actions">
        <i class="fa fa-trash delete"></i>
        <i class="fa fa-check"></i>
      </div>
    `;
  ul.appendChild(li);

  clearButton.style.display = "block";
  input.value = "";
});

document.querySelector(".clear-todos").addEventListener("click", function () {
  const ul = document.getElementById("ul");
  ul.innerHTML = "";
  localStorage.removeItem("todos");
  this.style.display = "none";
});

document.getElementById("ul").addEventListener("click", function () {
  if (event.target.classList.contains("delete")) {
    const li = event.target.closest("li");
    const text = li.querySelector("span").textContent;

    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = todos.filter((todo) => todo.text !== text);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));

    li.remove();

    if (document.getElementById("ul").children.length === 0) {
      document.querySelector(".clear-todos").style.display = "none";
    }
  }
});

document.getElementById("ul").addEventListener("click", function (event) {
  if (event.target.classList.contains("fa-check")) {
    const span = event.target.closest("li").querySelector("span");
    const text = span.textContent;

    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].text === text) {
        todos[i].completed = !todos[i].completed;
        break;
      }
    }

    localStorage.setItem("todos", JSON.stringify(todos));

    span.classList.toggle("completed");
  }
});
