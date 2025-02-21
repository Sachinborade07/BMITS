import { createContext, useContext, useReducer, ReactNode } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

// Define Action Type
type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "TOGGLE_TASK"; payload: number };

// Reducer Function
function taskReducer(tasks: Task[], action: Action): Task[] {
  switch (action.type) {
    case "ADD_TASK":
      return [...tasks, { id: Date.now(), text: action.payload, completed: false }];
    case "DELETE_TASK":
      return tasks.filter((task) => task.id !== action.payload);
    case "TOGGLE_TASK":
      return tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return tasks;
  }
}

// Context Type
type TaskContextType = {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
};

// Create Context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider Component
export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);

  const value: TaskContextType = {
    tasks,
    addTask: (text) => dispatch({ type: "ADD_TASK", payload: text }),
    deleteTask: (id) => dispatch({ type: "DELETE_TASK", payload: id }),
    toggleTask: (id) => dispatch({ type: "TOGGLE_TASK", payload: id }),
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

// Custom Hook
export function useTask() {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTask must be used within a TaskProvider");
  return context;
}

// Sample App Component
export default function App() {
  const { tasks, addTask, deleteTask, toggleTask } = useTask();

  return (
    <div>
      <h1>Task Manager</h1>
      <button onClick={() => addTask("New Task")}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{ textDecoration: task.completed ? "line-through" : "none", cursor: "pointer" }}
              onClick={() => toggleTask(task.id)}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
