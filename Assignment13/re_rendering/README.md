# React + TypeScript + Vite

Imagine you're running a task management system at home. You have a whiteboard where you write down all your tasks, and you use markers and erasers to add, remove, or mark tasks as done.

Now, let's connect this to the code:

1️⃣ TaskProvider – The Whiteboard & Tools
Think of TaskProvider like your whiteboard where all your tasks are listed. It also comes with some tools (functions like addTask, deleteTask, toggleTask) that let you modify the list.

Just like in real life, if someone wants to update the whiteboard, they need access to these tools. This provider makes sure that everything related to tasks is stored in one place, and anyone inside the house (app) can use it.

2️⃣ useTask – The Shortcut to Your Whiteboard
Now, imagine you’re in another room, and you don’t want to walk all the way to the whiteboard every time you want to check your tasks or update them.

This is where useTask comes in—it’s like a remote control for your whiteboard. You just press a button (call a function), and it updates the tasks without you needing to manually interact with TaskProvider.

If you try using this remote control outside the house (TaskProvider), it won’t work, because the whiteboard isn’t there! That’s why we have a safeguard in useTask that throws an error if you use it incorrectly.

3️⃣ App – The Task Manager UI (The Person Using It)
Finally, App is you, standing in front of the whiteboard (or using the remote). It shows the list of tasks, lets you add new ones, and allows you to mark tasks as complete or delete them.

When you click the “Add Task” button, it's like picking up a marker and writing on the board.
When you click a task, it gets crossed out, just like marking it as completed.
When you delete a task, it’s like erasing it from the board.

Final Analogy
TaskProvider = The whiteboard & tools to manage tasks.
useTask = A remote control to interact with the whiteboard.
App = The person using the whiteboard to check, add, and remove tasks.