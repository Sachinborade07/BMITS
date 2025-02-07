document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-todo");
    const ulTodo = document.getElementById("ul-todo");
    const buttonDelete = document.getElementById("button-todelete");
    const gettingData = document.getElementById("fetch");

    let editMode = false;
    let editElement = null;

    buttonTodo.addEventListener("click", () => {
        const text = inputTodo.value;
        if (editMode) {
            editElement.querySelector(".text-todo").textContent = text;
            editMode = false;
            editElement = null;
            buttonTodo.textContent = "Add";
        } else {
            addTodo(text);
        }
        inputTodo.value = "";
    });


    buttonDelete.addEventListener("click", () => {
        // localStorage.clear(); 
        ulTodo.innerHTML = "";
    });

    gettingData.addEventListener("click", () => {
        axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
            .then(res => {
                res.data.forEach(todo => createTodo(todo.title));
            })
            .catch(err => console.error(err));
    });

    const addTodo = (task) => {
        axios.post('https://jsonplaceholder.typicode.com/todos', {
            title: task,
            completed: false
        }).then(res => {
            createTodo(res.data.title);
        }).catch(err => console.error(err));
    };

    const createTodo = (task) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-start";
        li.innerHTML = `
        <span class="text-todo">${task}</span>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-danger">Edit</button>
            <button type="button" class="btn btn-warning">Delete</button>
        </div>
        `;
        ulTodo.appendChild(li);
    };

    ulTodo.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-warning")) {
            e.target.closest(".list-group-item").remove();
        }
        if (e.target.classList.contains("btn-danger")) {
            const li = e.target.closest(".list-group-item");
            const taskText = li.querySelector(".text-todo").textContent;
            inputTodo.value = taskText;
            buttonTodo.textContent = "Update";
            editElement = li;
            editMode = true;
        }
    });
});
