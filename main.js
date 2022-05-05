const tasksList = [];

const addButton = document.querySelector("button.submit");
const textInput = document.querySelector("form input");
const ul = document.querySelector(".content ul");
const tasksCounter = document.querySelector("p span");

const doneTask = (e) => {
  const key = e.target.parentNode.parentNode.dataset.key;
  if (tasksList[key].done) {
    tasksList[key].done = false;
  } else {
    tasksList[key].done = true;
  }
  let taskContent = tasksList.filter((task) => !task.done).length;
  tasksCounter.textContent = taskContent;
  renderTable();
};

const removeTask = (e) => {
  const key = e.target.parentNode.parentNode.dataset.key;
  tasksList.splice(key, 1);
  let taskContent = tasksList.filter((task) => !task.done).length;
  tasksCounter.textContent = taskContent;
  renderTable();
};

const readText = (e) => {
  e.preventDefault();
  const taskName = textInput.value;
  if (!taskName) {
    return alert("Add something!");
  }
  const task = document.createElement("div");
  task.classList.add("one");
  task.innerHTML =
    `<div class="task-content">${taskName}</div>` +
    '<div class="menu"><button class="delete"> DEL </button><button class="done"> DONE </button></div>';
  let tmp = {
    done: false,
    element: task,
  };
  tasksList.push(tmp);
  renderTable();
  textInput.value = "";
  let taskContent = tasksList.filter((task) => !task.done).length;
  tasksCounter.textContent = taskContent;
  task.querySelector("button.delete").addEventListener("click", removeTask);
  task.querySelector("button.done").addEventListener("click", doneTask);
};

const renderTable = () => {
  document.querySelector(".content").innerHTML = '<h1 id="cont">TASKS:</h1>';
  tasksList.forEach((div, index) => {
    div.element.dataset.key = index;
    if (div.done) {
      div.element.classList.add("done");
    } else {
      div.element.classList.remove("done");
    }
    document.querySelector(".content").appendChild(div.element);
  });
};

document.querySelector(".header form").addEventListener("submit", readText);
