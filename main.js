let taskItemsList = []
const isLocal = localStorage.getItem("todolist")

if(isLocal !== null) {
    taskItemsList = JSON.parse(isLocal)
}

const tasksList = document.querySelector('.tasks-list');

document.addEventListener('submit', (e) => {
    e.preventDefault()
    const form = document.querySelector('#task-form');
    const input = document.querySelector('#task-input');
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

    if(!task) {
        alert('Hey Type in something 😊')
    }
    
    const taskObj = {
        taskId: taskItemsList.length + 1,
        taskName: task,
        date,
        completed: false
    }
    taskItemsList.push(taskObj);
    form.reset()
    localStorage.setItem('todolist', JSON.stringify(taskItemsList));
    renderTasks()
})

function renderTasks() {
    tasksList.innerHTML = ""
    for(let i = 0; i < taskItemsList.length; i++) {
        if(!taskItemsList[i]) {
            continue;
        }
        const tasks = document.createElement('div')
        tasks.classList.add('tasks');
        
        const list = document.createElement('input')
        list.classList.add('text')
        if(taskItemsList[i].completed === true) {
            list.classList.add('done')
        }
        list.type = 'text'
        list.setAttribute('readonly', 'readonly')
        list.value = taskItemsList[i].taskName

        const actions = document.createElement('div')
        actions.classList.add('actions')

        const dispDate = document.createElement('p')
        dispDate.classList.add('date')
        dispDate.innerText = taskItemsList[i].date

        const editButton = document.createElement('button')
        editButton.classList.add('edit')
        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`

        const dltButton = document.createElement('button')
        dltButton.classList.add('delete')
        dltButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`

        actions.appendChild(dispDate)
        actions.appendChild(editButton)
        actions.appendChild(dltButton)
        tasks.appendChild(list)
        tasks.appendChild(actions)
        tasksList.appendChild(tasks)

        // Edit

        editButton.addEventListener('click', () => {
            if(editButton.innerHTML === `<i class="fa-solid fa-pen-to-square"></i>`) {
                list.removeAttribute('readonly')
                list.focus()
                editButton.innerHTML = `<i style="color: green" class="fa-solid fa-floppy-disk"></i>`
            } else {
                taskItemsList[i].taskName = list.value
                localStorage.setItem('todolist', JSON.stringify(taskItemsList))
                list.setAttribute('readonly', 'readonly')
                editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
            }
        })
        
        // Delete

        dltButton.addEventListener('click', () => {
            tasksList.removeChild(tasks)
            taskItemsList.splice(i,1)
            localStorage.setItem('todolist', JSON.stringify(taskItemsList))
        })

        // Strike Through or Completed
        list.addEventListener('click', () => {
            if(taskItemsList[i].completed === false) {
                list.classList.add('done')
                taskItemsList[i].completed = true
            } else {
                list.classList.toggle('done')
                taskItemsList[i].completed = false
            }
            localStorage.setItem('todolist', JSON.stringify(taskItemsList))
        })
    }
    
}
