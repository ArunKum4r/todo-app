let taskItemsList = []
const isLocal = localStorage.getItem("todolist")

if(isLocal !== null) {
    taskItemsList = JSON.parse(isLocal)
}

const tasksList = document.querySelector('.tasks-list');

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const task = input.value;

  // Date
  const date = new Date().toLocaleTimeString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (!task) {
    alert("Hey Type in something 😊");
  } else {
    const taskObj = {
      taskId: taskItemsList.length + 1,
      taskName: task,
      date,
      completed: false,
    };
    taskItemsList.push(taskObj);
    form.reset();
    localStorage.setItem("todolist", JSON.stringify(taskItemsList));
    renderTasks(taskItemsList);
  }
});

function renderTasks(arr) {
  tasksList.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      continue;
    }
    const tasks = document.createElement("div");
    tasks.classList.add("tasks");

    const list = document.createElement("input");
    list.classList.add("text");
    if (arr[i].completed === true) {
      list.classList.add("done");
    }
    list.type = "text";
    list.setAttribute("readonly", "readonly");
    list.value = arr[i].taskName;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const dispDate = document.createElement("p");
    dispDate.classList.add("date");
    dispDate.innerText = arr[i].date;

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

    const dltButton = document.createElement("button");
    dltButton.classList.add("delete");
    dltButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    actions.appendChild(dispDate);
    actions.appendChild(editButton);
    actions.appendChild(dltButton);
    tasks.appendChild(list);
    tasks.appendChild(actions);
    tasksList.appendChild(tasks);

    // Edit

    editButton.addEventListener("click", () => {
      if (
        editButton.innerHTML === `<i class="fa-solid fa-pen-to-square"></i>`
      ) {
        list.removeAttribute("readonly");
        list.focus();
        editButton.innerHTML = `<i style="color: green" class="fa-solid fa-floppy-disk"></i>`;
      } else {
        arr[i].taskName = list.value;
        localStorage.setItem("todolist", JSON.stringify(arr));
        list.setAttribute("readonly", "readonly");
        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
      }
    });

    // Delete

    dltButton.addEventListener("click", () => {
      tasksList.removeChild(tasks);
      arr.splice(i, 1);
      localStorage.setItem("todolist", JSON.stringify(arr));
    });

    // Strike Through or Completed
    list.addEventListener("click", () => {
      if (arr[i].completed === false) {
        list.classList.add("done");
        arr[i].completed = true;
      } else {
        list.classList.toggle("done");
        arr[i].completed = false;
      }
      localStorage.setItem("todolist", JSON.stringify(arr));
    });
  }
}

// Filters
const all = document.querySelector(".all");
all.addEventListener("click", () => {
  renderTasks(taskItemsList);
});

const completed = document.querySelector(".completed");
completed.addEventListener("click", () => {
  const filtered = taskItemsList.filter((task) => {
    return task.completed === true;
  });

  renderTasks(filtered);
});

const inProgress = document.querySelector(".in-progress");
inProgress.addEventListener("click", () => {
  const filtered = taskItemsList.filter((task) => {
    return task.completed === false;
  });

  renderTasks(filtered);
});
