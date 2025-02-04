document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-todo");
    const ulTodo = document.getElementById("ul-todo");
    const buttonDelete = document.getElementById("button-todelete");

    let editMode = false;
    let editElement = null;

    // Event listener for adding/updating a todo item
    buttonTodo.addEventListener("click", () => {
        const text = inputTodo.value;

        if (editMode) {
            editElement.querySelector(".text-todo").textContent = text;
            editMode = false; // Exit edit mode
            editElement = null; // Reset edit element
            buttonTodo.textContent = "Add"; // Change button text back to "Add"
        } else {
            createTodo(text);
        }

        // Clear input field after adding/updating a todo
        inputTodo.value = "";

        // Save all todos to localStorage
        saveAllTodo();
    });

    // Event listener for deleting all todo items
    buttonDelete.addEventListener("click", () => {
        localStorage.clear(); // Clear all data from localStorage
        ulTodo.innerHTML = ""; // Clear the list from the UI
    });

    // Function to create a new todo item
    const createTodo = (task) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-start";

        // Add the todo text and buttons (Edit, Delete)
        li.innerHTML = `
        <span class="text-todo">${task}</span>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-danger">Edit</button>
            <button type="button" class="btn btn-warning">Delete</button>
        </div>
        `;
        // Append the new todo item to the list
        ulTodo.appendChild(li);
    };

    // Event listener for handling Edit and Delete buttons inside the todo list
    ulTodo.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-warning")) {
            e.target.closest(".list-group-item").remove();
            saveAllTodo();
        }

        // If "Edit" button is clicked
        if (e.target.classList.contains("btn-danger")) {
            const li = e.target.closest(".list-group-item");
            const taskText = li.querySelector(".text-todo").textContent;

            inputTodo.value = taskText;
            buttonTodo.textContent = "Update"; // Change button text to "Update"

            editElement = li; // Store the selected item for editing
            editMode = true; // Enable edit mode
        }
    });

    // Function to save all todo items to localStorage
    const saveAllTodo = () => {
        // Get all todo items from the UI and store them in an array
        const allTodos = [...document.querySelectorAll(".text-todo")].map(
            (task) => task.textContent
        );
        localStorage.setItem("allTodos", JSON.stringify(allTodos));
    };

    // Function to load all saved todos from localStorage on page load
    const loadAllTodo = () => {
        // Retrieve todos from localStorage, or use an empty array if none exist
        const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];

        // Create a todo item for each stored todo
        allTodos.forEach((task) => createTodo(task));
    };

    // Load stored todos when the page loads
    loadAllTodo();
});
