window.addEventListener("load", () => {
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const tasksList = document.querySelector(".tasks-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    if (!task) {
      alert("Please add a task 😊");
      return;
    }

    // Date
    const date = new Date().toLocaleTimeString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const tasks = document.createElement("div");
    tasks.classList.add("tasks");

    const list = document.createElement("input");
    list.classList.add("text");
    list.setAttribute("readonly", "readonly");
    list.type = "text";
    list.value = task;

    // Task Action buttons

    const dateDisp = document.createElement("p");
    dateDisp.classList.add("date");
    dateDisp.innerHTML = date;

    const actions = document.createElement("div");
    actions.classList.add("actions");

    const dltButton = document.createElement("button");
    dltButton.classList.add("delete");
    dltButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

    actions.appendChild(dateDisp);
    actions.appendChild(editButton);
    actions.appendChild(dltButton);

    tasks.appendChild(list);
    tasks.appendChild(actions);
    tasksList.appendChild(tasks);
  });
});
