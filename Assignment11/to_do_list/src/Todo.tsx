import { useState, useEffect } from "react";

interface Todo {
    id: number;
    task: string;
}

export default function TodoApp() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTask, setNewTask] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        const storedCounter = localStorage.getItem("counter");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
        if (storedCounter) {
            setCounter(parseInt(storedCounter));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
        localStorage.setItem("counter", counter.toString());
    }, [todos, counter]);

    const addTodo = () => {
        if (!newTask.trim()) return;
        setTodos([...todos, { id: counter, task: newTask }]);
        setCounter(counter + 1);
        setNewTask("");
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }
    const editTodo = (id: number, task: string) => {
        setEditId(id);
        setNewTask(task);
    };

    const updateTodo = () => {
        if (!newTask.trim() || editId === null) return;
        setTodos(todos.map(todo => (todo.id === editId ? { ...todo, task: newTask } : todo)));
        setEditId(null);
        setNewTask("");
    };

    return (
        <div>
            <h2>Todo App</h2>
            <input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Add Task" />
            {editId === null ? (
                <button onClick={addTodo}>Add</button>
            ) : (
                <button onClick={updateTodo}>Update</button>
            )}
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.task}
                        <button onClick={() => editTodo(todo.id, todo.task)}>Edit</button>
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
