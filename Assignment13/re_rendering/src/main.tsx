import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx"; // Ensure App is imported correctly
import { TaskProvider } from "./App.tsx"; // Import TaskProvider
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TaskProvider>
      <App />
    </TaskProvider>
  </StrictMode>
);
