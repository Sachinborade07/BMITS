import { useEffect, useState } from 'react'
import './App.css'

interface Todo {
  id: number;
  title: string;
}


function App() {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((data) => setTodo(data));
  }, []);

  const handleEdit = (id: number, title: string) => {
    setEditId(id);
    setEditTitle(title);
  };

  const handleSave = (id: number) => {
    setTodo((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: editTitle } : todo
      )
    );
    setEditId(null);
  }

  return (
    <>
      <div>
        <h1>TO DO LIST</h1>
        <ul> {todo.map((todo) => (
          <li key={todo.id} >
            {editId === todo.id ? (
              <div>
                <input
                  type='text'
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}>
                </input>
                <button onClick={() => handleSave(todo.id)}> SAVE </button>
              </div>
            ) : (
              <div>
                {todo.title} <button onClick={() => handleEdit(todo.id, todo.title)}> EDIT</button>
              </div>
            )}
          </li>
        ))} </ul>
      </div>
    </>
  )
}

export default App
