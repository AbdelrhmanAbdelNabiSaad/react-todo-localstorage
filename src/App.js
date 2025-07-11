import React, { useState, useEffect, use } from "react";
import "./App.css";

function App() {
  document.title = "To-Do-List";
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTask = localStorage.getItem("tasks");
    return savedTask ? JSON.parse(savedTask) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editInput, setEditinput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() !== "") {
      const newTask = { text: input, completed: false };
      setTasks([...tasks, newTask]);
      setInput("");
    }
  };

  const deleteTask = (index) => {
    const newTask = tasks.filter((_, i) => i !== index);
    setTasks(newTask);
  };

  const toggleCompleted = (index) => {
    const newTask = [...tasks];
    newTask[index].completed = !newTask[index].completed;
    setTasks(newTask);
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditinput(tasks[index].text);
  };

  const saveEdit = (index) => {
    const newTask = [...tasks];
    newTask[index].text = editInput;
    setTasks(newTask);
    setEditingIndex(null);
  };

  const filteredTask = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <div className={`container ${darkMode ? "" : "dark"}`}>
      <h1>To-Do-List</h1>
      <div className="head">
        <input
          type="text"
          value={input}
          placeholder="Enter Task..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask} className="btn-add">
          Add Task
        </button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌙 dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <ul>
        {filteredTask.length === 0 ? (
          <p>No Tasks Yet.</p>
        ) : (
          filteredTask.map((task, index) => (
            <li key={index} className={task.completed ? 'completed' : ''}>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editInput}
                    onChange={(e) => setEditinput(e.target.value)}
                  />
                  <button onClick={() => saveEdit(index)}>Save</button>
                </>
              ) : (
                <>
                  <span onClick={() => toggleCompleted(index)}>
                    {task.text}
                  </span>
                  <div>
                    <span onClick={() => startEdit(index)} className="btn">
                      Edit
                    </span>
                    <span onClick={() => deleteTask(index)} className="btn">
                      Delete
                    </span>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
      {tasks.length > 0 && (
        <button className="btn-clear" onClick={() => setTasks([])}>
          Clear All Tasks
        </button>
      )}
    </div>
  );
}

export default App;
